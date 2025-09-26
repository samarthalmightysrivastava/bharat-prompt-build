'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../../lib/supabase-client'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      const supabase = createClient()
      
      try {
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Auth callback error:', error)
          router.push('/auth/auth-code-error')
          return
        }

        if (data?.session) {
          // Successfully authenticated
          router.push('/generate')
        } else {
          // Handle auth code exchange
          const urlParams = new URLSearchParams(window.location.search)
          const code = urlParams.get('code')
          
          if (code) {
            const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
            if (exchangeError) {
              console.error('Code exchange error:', exchangeError)
              router.push('/auth/auth-code-error')
            } else {
              router.push('/generate')
            }
          } else {
            router.push('/')
          }
        }
      } catch (error) {
        console.error('Auth callback error:', error)
        router.push('/auth/auth-code-error')
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Processing Authentication...
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please wait while we sign you in.
          </p>
          <div className="mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  )
}