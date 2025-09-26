"use client";

import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function LoginModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { sendMagicLink, signInWithOtp } = useAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (!open) return null;

  const emailValid = /\S+@\S+\.\S+/.test(email);

  const handleMagic = async () => {
    if (!emailValid) return setMessage("Please enter a valid email.");
    setBusy(true);
    const res = await sendMagicLink(email);
    setBusy(false);
    setMessage(res.message);
  };

  const handleOtp = async () => {
    if (!emailValid) return setMessage("Please enter a valid email.");
    setBusy(true);
    const res = await signInWithOtp(email);
    setBusy(false);
    setMessage(res.message);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Login / Sign up</h2>
          <p className="text-sm text-gray-600">Use your email to receive a magic link or OTP.</p>
        </div>

        <label className="mb-2 block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setMessage(null); }}
          placeholder="you@example.com"
          className="mb-4 w-full rounded-xl border border-gray-300 p-3 focus:border-[#2D4BF0] focus:outline-none"
        />

        {message && <div className="mb-3 text-sm text-gray-700">{message}</div>}

        <div className="flex gap-3">
          <button
            onClick={handleMagic}
            disabled={busy}
            className="flex-1 rounded-xl bg-[#2D4BF0] p-3 text-white hover:opacity-90 disabled:opacity-50"
          >
            {busy ? "Sending..." : "Send Magic Link"}
          </button>
          <button
            onClick={handleOtp}
            disabled={busy}
            className="flex-1 rounded-xl border border-[#FF7A00] p-3 text-[#FF7A00] hover:bg-orange-50 disabled:opacity-50"
          >
            {busy ? "Sending..." : "Send OTP"}
          </button>
        </div>

        <button onClick={onClose} className="mt-4 w-full text-sm text-gray-600 hover:text-gray-900">
          Close
        </button>
      </div>
    </div>
  );
}