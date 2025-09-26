"use client";

import React, { createContext, useMemo, useState } from "react";
import { Session, User } from "@supabase/supabase-js";

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

// MOCK AUTH PROVIDER - FOR TESTING WITHOUT SUPABASE
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading] = useState(false);
  const [quotaInfo] = useState({
    used: 5,
    total: 15,
    plan: 'free'
  });

  const sendMagicLink = async (email: string) => {
    console.log('Mock: Would send magic link to', email);
    return { ok: true, message: "Mock: Magic link would be sent to " + email };
  };

  const signInWithOtp = async (email: string) => {
    console.log('Mock: Would send OTP to', email);
    return { ok: true, message: "Mock: OTP would be sent to " + email };
  };

  const signOut = async () => {
    console.log('Mock: Would sign out user');
  };

  const refreshQuota = async () => {
    console.log('Mock: Would refresh quota');
  };

  const value = useMemo(() => ({ 
    user: null,
    session: null,
    loading,
    signOut,
    sendMagicLink,
    signInWithOtp,
    quotaInfo,
    refreshQuota
  }), [loading, quotaInfo]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}