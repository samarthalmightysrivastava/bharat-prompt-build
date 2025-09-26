'use client'

import { useState } from 'react'
import Link from 'next/link'
import { User, LogIn, LogOut, Menu, X } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import LoginModal from '../auth/LoginModal'

interface HeaderProps {
  showQuotaMeter?: boolean
}

export default function Header({ showQuotaMeter = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const { user, quotaInfo, signOut, loading } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const quotaPercentage = quotaInfo.total > 0 ? (quotaInfo.used / quotaInfo.total) * 100 : 0
  const quotaLeft = quotaInfo.total - quotaInfo.used

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">भ</span>
              </div>
              <span className="font-serif font-bold text-xl text-foreground">
                Bharat Prompt
              </span>
            </Link>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link 
                href="/generate" 
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Generate
              </Link>
              <Link 
                href="/pricing" 
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Pricing
              </Link>
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Quota Meter */}
              {showQuotaMeter && (
                <div className="hidden sm:flex items-center space-x-2">
                  <div className="flex flex-col items-end text-xs">
                    <span className="text-gray-500">
                      {user ? `${quotaInfo.plan}: ${quotaLeft}/${quotaInfo.total} left` : `Free: ${quotaLeft}/15 left`}
                    </span>
                    <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${quotaPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Auth Button */}
              {loading ? (
                <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse" />
              ) : user ? (
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-foreground">
                    {user.email?.split('@')[0]}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="p-1 text-gray-400 hover:text-gray-600"
                    title="Sign out"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setShowLoginModal(true)}
                  className="btn-ghost flex items-center space-x-2"
                >
                  <LogIn className="h-4 w-4" />
                  <span className="hidden sm:inline">Login</span>
                </button>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-foreground hover:text-primary"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-4">
                <Link 
                  href="/generate" 
                  className="text-foreground hover:text-primary transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Generate Prompt
                </Link>
                <Link 
                  href="/pricing" 
                  className="text-foreground hover:text-primary transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </Link>
                {showQuotaMeter && (
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-gray-500">
                      {user ? `${quotaInfo.plan}: ${quotaLeft}/${quotaInfo.total}` : `Free: ${quotaLeft}/15`}
                    </span>
                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${quotaPercentage}%` }}
                      />
                    </div>
                  </div>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </>
  )
}