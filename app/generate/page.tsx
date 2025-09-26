'use client'

import { useState, useEffect } from 'react'
import Header from '../../components/ui/Header'
import { useToast } from '../../components/ui/Toast'
import { useAuth } from '@/hooks/useAuth'
import LanguageSelect from '../../components/generate/LanguageSelect'
import CategoryGrid from '../../components/generate/CategoryGrid'
import PromptResult from '../../components/generate/PromptResult'
import LoginModal from '../../components/auth/LoginModal'
import { Wand2, RotateCcw, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function GeneratePage() {
  const [language, setLanguage] = useState('Auto')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [userText, setUserText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [showPaywall, setShowPaywall] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const { showToast, ToastContainer } = useToast()
  const { user, quotaInfo, refreshQuota } = useAuth()

  const clearForm = () => {
    setLanguage('Auto')
    setSelectedCategories([])
    setUserText('')
    setGeneratedPrompt('')
  }

  const generatePrompt = async () => {
    // Validation
    if (selectedCategories.length === 0) {
      showToast('Please select at least one category', 'error')
      return
    }

    if (userText.trim().length < 5) {
      showToast('Please describe your need (at least 5 characters)', 'error')
      return
    }

    // Check quota for anonymous users
    if (!user) {
      const freeUsed = parseInt(localStorage.getItem('free_used') || '0')
      if (freeUsed >= 15) {
        setShowLoginModal(true)
        return
      }
    } else {
      // Check quota for logged-in users
      if (quotaInfo.used >= quotaInfo.total) {
        setShowPaywall(true)
        return
      }
    }

    setIsLoading(true)

    try {
      const headers: any = {
        'Content-Type': 'application/json',
      }

      // Add authorization header for logged-in users (simplified for now)
      if (user) {
        headers['X-User-ID'] = user.id
      }

      const response = await fetch('/api/build-prompt', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          language,
          categories: selectedCategories,
          user_text: userText.trim()
        })
      })

      console.log('API Response status:', response.status);
      console.log('API Response headers:', response.headers);

      if (!response.ok) {
        let error;
        try {
          error = await response.json();
        } catch (parseError) {
          console.error('Failed to parse error response as JSON:', parseError);
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        throw new Error(error.error || 'Failed to generate prompt')
      }

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error('Failed to parse success response as JSON:', parseError);
        throw new Error('Invalid response from server');
      }

      console.log('API Response data:', data);
      setGeneratedPrompt(data.final_prompt)
      
      // Update quota for anonymous users
      if (!user) {
        if (typeof window !== 'undefined') {
          const freeUsed = parseInt(localStorage.getItem('free_used') || '0')
          const newUsed = freeUsed + 1
          localStorage.setItem('free_used', newUsed.toString())
        }
      } else {
        // Refresh quota for logged-in users
        await refreshQuota()
      }

      showToast('Prompt generated successfully!', 'success')

    } catch (error) {
      console.error('Generate error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate prompt'
      showToast(errorMessage, 'error')
    } finally {
      setIsLoading(false)
    }
  }

  // Get current quota information
  const currentUsed = user ? quotaInfo.used : (typeof window !== 'undefined' ? parseInt(localStorage.getItem('free_used') || '0') : 0)
  const currentTotal = user ? quotaInfo.total : 15
  const remainingQuota = currentTotal - currentUsed

  return (
    <div className="min-h-screen bg-background">
      <Header showQuotaMeter={true} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">
              Generate Your Perfect Prompt
            </h1>
            <p className="text-lg text-muted-foreground">
              Select your language, choose categories, describe your need — get a professional prompt
            </p>
          </div>

          {/* Generation Form */}
          <div className="card p-6 mb-8">
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Language Selection */}
              <div className="lg:col-span-1">
                <LanguageSelect
                  selectedLanguage={language}
                  onLanguageChange={setLanguage}
                />
              </div>

              {/* User Input */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Describe what you need
                </label>
                <textarea
                  value={userText}
                  onChange={(e) => setUserText(e.target.value)}
                  placeholder="Describe what you need in one line... (e.g., 'Write a LinkedIn post announcing our product demo')"
                  className="input min-h-[100px] resize-y"
                  maxLength={500}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {userText.length}/500 characters
                </p>
              </div>
            </div>

            {/* Category Grid */}
            <div className="mt-8">
              <CategoryGrid
                selectedCategories={selectedCategories}
                onCategoriesChange={setSelectedCategories}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={generatePrompt}
                disabled={isLoading || selectedCategories.length === 0 || userText.trim().length < 5}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Generate Prompt
                  </>
                )}
              </button>
              
              <button
                onClick={clearForm}
                className="btn-ghost sm:flex-shrink-0"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear
              </button>
            </div>

            {/* Quota Warning */}
            {remainingQuota <= 5 && remainingQuota > 0 && (
              <div className="mt-4 p-3 bg-secondary/10 border border-secondary/20 rounded-xl">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-secondary">
                      Only {remainingQuota} generations left
                    </p>
                    <p className="text-xs text-secondary/80 mt-1">
                      {!user ? 'Login to get +15 more, or upgrade for unlimited access' : 'Upgrade your plan for more generations'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Generated Result */}
          {generatedPrompt && (
            <PromptResult
              prompt={generatedPrompt}
              isProUser={Boolean(user && (quotaInfo.plan === 'pro' || quotaInfo.plan === 'power'))}
            />
          )}

          {/* Login Modal */}
          <LoginModal 
            isOpen={showLoginModal} 
            onClose={() => setShowLoginModal(false)} 
          />

          {/* Paywall Modal */}
          {showPaywall && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl p-6 max-w-md w-full">
                <h3 className="font-serif font-semibold text-xl mb-4">
                  Upgrade to Continue
                </h3>
                <p className="text-muted-foreground mb-6">
                  You've reached your quota limit. Choose a plan to continue creating amazing prompts!
                </p>
                <div className="flex flex-col gap-3">
                  <Link href="/pricing" className="btn-primary text-center">
                    View Pricing Plans
                  </Link>
                  <button 
                    onClick={() => setShowPaywall(false)}
                    className="btn-ghost"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  )
}