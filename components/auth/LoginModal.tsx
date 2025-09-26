'use client'

import { useState } from 'react'
import { X, Mail, Loader2, CheckCircle } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../ui/Toast'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const { sendMagicLink } = useAuth()
  const { showToast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      showToast('Please enter your email address', 'error')
      return
    }

    setLoading(true)
    try {
      const result = await sendMagicLink(email)
      if (result.ok) {
        setEmailSent(true)
        showToast('Magic link sent! Check your email.', 'success')
      } else {
        showToast(result.message || 'Failed to send magic link. Please try again.', 'error')
      }
    } catch (error) {
      console.error('Login error:', error)
      showToast('Failed to send magic link. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setEmail('')
    setEmailSent(false)
    setLoading(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        {!emailSent ? (
          <>
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h2 className="font-serif font-semibold text-xl text-foreground mb-2">
                Get 15 More Free Generations
              </h2>
              <p className="text-muted-foreground text-sm">
                Login with your email to unlock 15 additional free prompt generations (30 total)
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="input w-full"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Sending Magic Link...
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4 mr-2" />
                    Send Magic Link
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-xs text-muted-foreground">
                We'll send you a secure login link. No password needed!
              </p>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="w-12 h-12 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-6 w-6 text-success" />
            </div>
            <h2 className="font-serif font-semibold text-xl text-foreground mb-2">
              Check Your Email
            </h2>
            <p className="text-muted-foreground text-sm mb-4">
              We've sent a magic link to <strong>{email}</strong>
            </p>
            <p className="text-xs text-muted-foreground mb-6">
              Click the link in the email to complete your login and unlock 15 more free generations.
            </p>
            <button
              onClick={handleClose}
              className="btn-ghost w-full"
            >
              Got it!
            </button>
          </div>
        )}
      </div>
    </div>
  )
}