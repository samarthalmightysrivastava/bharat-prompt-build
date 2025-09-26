'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { createClient } from './supabase-client'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string) => Promise<void>
  signOut: () => Promise<void>
  quotaInfo: {
    used: number
    total: number
    plan: string
  }
  refreshQuota: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [quotaInfo, setQuotaInfo] = useState({
    used: 0,
    total: 15,
    plan: 'free'
  })

  const supabase = createClient()

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
      if (session?.user) {
        refreshQuota()
      } else {
        // Load anonymous quota from localStorage
        const freeUsed = parseInt(localStorage.getItem('free_used') || '0')
        setQuotaInfo({ used: freeUsed, total: 15, plan: 'free' })
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      
      if (event === 'SIGNED_IN' && session?.user) {
        // Grant trial bonus if first login
        await grantTrialBonus(session.user.id)
        await refreshQuota()
      } else if (event === 'SIGNED_OUT') {
        // Reset to anonymous quota
        const freeUsed = parseInt(localStorage.getItem('free_used') || '0')
        setQuotaInfo({ used: freeUsed, total: 15, plan: 'free' })
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) throw error
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const refreshQuota = async () => {
    if (!user) return

    try {
      const { data: planData } = await supabase
        .from('user_plans')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (planData) {
        setQuotaInfo({
          used: planData.used_this_month,
          total: planData.monthly_quota,
          plan: planData.plan
        })
      }
    } catch (error) {
      console.error('Error refreshing quota:', error)
    }
  }

  const grantTrialBonus = async (userId: string) => {
    try {
      // Check if trial bonus already granted
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('trial_bonus_granted')
        .eq('id', userId)
        .single()

      if (!profile?.trial_bonus_granted) {
        // Grant trial bonus
        await supabase
          .from('user_profiles')
          .update({ trial_bonus_granted: true })
          .eq('id', userId)

        // Transfer anonymous usage to user account
        const freeUsed = parseInt(localStorage.getItem('free_used') || '0')
        if (freeUsed > 0) {
          await supabase
            .from('user_plans')
            .update({ used_this_month: freeUsed })
            .eq('user_id', userId)
        }

        // Clear anonymous usage
        localStorage.removeItem('free_used')
      }
    } catch (error) {
      console.error('Error granting trial bonus:', error)
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signIn,
      signOut,
      quotaInfo,
      refreshQuota
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}