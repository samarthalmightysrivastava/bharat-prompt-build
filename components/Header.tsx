"use client";

import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import LoginModal from "./LoginModal";

function Avatar({ email }: { email: string }) {
  const letter = email?.[0]?.toUpperCase() || "U";
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2D4BF0] text-white">
      {letter}
    </div>
  );
}

export default function Header() {
  const { user, loading, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
          <a href="/" className="text-lg font-bold">
            <span className="text-[#2D4BF0]">Bharat</span>{" "}
            <span className="text-[#FF7A00]">Prompt</span>
          </a>

          <nav className="flex items-center gap-4">
            <a href="/pricing" className="text-sm text-gray-700 hover:text-gray-900">
              Pricing
            </a>
            {!loading && !user && (
              <button
                onClick={() => setOpen(true)}
                className="rounded-xl bg-[#2D4BF0] px-4 py-2 text-sm text-white hover:opacity-90"
              >
                Login / Sign up
              </button>
            )}
            {!loading && user && (
              <div className="relative">
                <button
                  onClick={() => setMenu((m) => !m)}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-2 py-1"
                >
                  <Avatar email={user.email || ""} />
                  <div className="hidden text-left sm:block">
                    <div className="text-sm font-medium text-gray-900 truncate max-w-[160px]">
                      {user.email}
                    </div>
                    <div className="text-[11px] text-gray-500">
                      Plan: <span className="rounded bg-orange-100 px-1 text-[#FF7A00]">free</span>
                    </div>
                  </div>
                </button>
                {menu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
                    <a href="/generate" className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-50">
                      Generate
                    </a>
                    <button
                      onClick={async () => { await signOut(); setMenu(false); }}
                      className="block w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </nav>
        </div>
      </header>

      <LoginModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}