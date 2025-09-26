"use client";

import React, { createContext, useEffect, useMemo, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";

type AuthCtx = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  sendMagicLink: (email: string) => Promise<{ ok: boolean; message: string }>;
  signInWithOtp: (email: string) => Promise<{ ok: boolean; message: string }>;
  quotaInfo: {
    used: number;
    total: number;
    plan: string;
  };
  refreshQuota: () => Promise<void>;
};

export const AuthContext = createContext<AuthCtx>({
  user: null,
  session: null,
  loading: true,
  signOut: async () => {},
  sendMagicLink: async () => ({ ok: false, message: "Not ready" }),
  signInWithOtp: async () => ({ ok: false, message: "Not ready" }),
  quotaInfo: { used: 0, total: 15, plan: 'free' },
  refreshQuota: async () => {},
});

// Create Supabase client outside component to avoid recreation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tpecqsdueachehjlagbw.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwZWNxc2R1ZWFjaGVoamxhZ2J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2Nzk1OTIsImV4cCI6MjA3NDI1NTU5Mn0.Z9s8TqqPH-WPFn-cxcpKPn0N5nlGrQShpxvXwVTGtN4';

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
}

const supabase = createClient(
  supabaseUrl,
  supabaseKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [quotaInfo, setQuotaInfo] = useState({
    used: 0,
    total: 15,
    plan: 'free'
  });

  const refreshQuota = async () => {
    if (!user) {
      // Load anonymous quota from localStorage
      const freeUsed = parseInt(localStorage.getItem('free_used') || '0');
      setQuotaInfo({ used: freeUsed, total: 15, plan: 'free' });
      return;
    }

    try {
      const { data: planData } = await supabase
        .from('user_plans')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (planData) {
        setQuotaInfo({
          used: planData.used_this_month,
          total: planData.monthly_quota,
          plan: planData.plan
        });
      } else {
        // New user - create default plan
        setQuotaInfo({ used: 0, total: 30, plan: 'free' });
      }
    } catch (error) {
      console.error('Error refreshing quota:', error);
      setQuotaInfo({ used: 0, total: 30, plan: 'free' });
    }
  };

  // Rehydrate session on mount
  useEffect(() => {
    let isMounted = true;

    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!isMounted) return;
      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
      setLoading(false);
      
      // Initialize quota
      if (data.session?.user) {
        // Will be called after user is set in another effect
      } else {
        // Load anonymous quota from localStorage
        const freeUsed = parseInt(localStorage.getItem('free_used') || '0');
        setQuotaInfo({ used: freeUsed, total: 15, plan: 'free' });
      }
    })();

    const { data: sub } = supabase.auth.onAuthStateChange(async (event, sess) => {
      setSession(sess);
      setUser(sess?.user ?? null);
      
      if (event === 'SIGNED_OUT') {
        // Reset to anonymous quota
        const freeUsed = parseInt(localStorage.getItem('free_used') || '0');
        setQuotaInfo({ used: freeUsed, total: 15, plan: 'free' });
      }
    });

    return () => {
      isMounted = false;
      sub.subscription.unsubscribe();
    };
  }, [supabase]);

  // Refresh quota when user changes
  useEffect(() => {
    if (user) {
      refreshQuota();
    }
  }, [user]);

  const sendMagicLink = async (email: string) => {
    try {
      console.log('Attempting to send magic link to:', email);
      console.log('Supabase URL:', supabaseUrl);
      
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: typeof window !== "undefined" ? window.location.origin : undefined },
      });
      
      if (error) {
        console.error('Supabase auth error:', error);
        return { ok: false, message: error.message };
      }
      
      console.log('Magic link sent successfully');
      return { ok: true, message: "We've sent a magic link to your inbox." };
    } catch (e: any) {
      console.error('Send magic link error:', e);
      return { ok: false, message: e?.message || "Failed to send magic link." };
    }
  };

  const signInWithOtp = async (email: string) => {
    try {
      console.log('Attempting to send OTP to:', email);
      
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
          shouldCreateUser: true,
        },
      });
      
      if (error) {
        console.error('Supabase OTP error:', error);
        return { ok: false, message: error.message };
      }
      
      console.log('OTP sent successfully');
      return { ok: true, message: "OTP link sent. Check your email." };
    } catch (e: any) {
      console.error('Send OTP error:', e);
      return { ok: false, message: e?.message || "Failed to send OTP." };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = useMemo(() => ({ 
    user, 
    session, 
    loading, 
    signOut, 
    sendMagicLink, 
    signInWithOtp,
    quotaInfo,
    refreshQuota
  }), [user, session, loading, quotaInfo]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}