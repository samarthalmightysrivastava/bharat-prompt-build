'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Globe } from 'lucide-react'
import { LANGUAGES } from '../../types/database'

interface LanguageSelectProps {
  selectedLanguage: string
  onLanguageChange: (language: string) => void
}

export default function LanguageSelect({ selectedLanguage, onLanguageChange }: LanguageSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const getLanguageDisplay = (language: string) => {
    switch (language) {
      case 'Auto': return '🤖 Auto-detect'
      case 'English': return '🇺🇸 English'
      case 'Hinglish': return '🇮🇳 Hinglish'
      case 'Hindi': return '🇮🇳 हिंदी'
      case 'Bengali': return '🇮🇳 বাংলা'
      case 'Telugu': return '🇮🇳 తెలుగు'
      case 'Marathi': return '🇮🇳 मराठी'
      case 'Tamil': return '🇮🇳 தமிழ்'
      case 'Urdu': return '🇮🇳 اردو'
      case 'Gujarati': return '🇮🇳 ગુજરાતી'
      case 'Kannada': return '🇮🇳 ಕನ್ನಡ'
      case 'Odia': return '🇮🇳 ଓଡ଼ିଆ'
      case 'Malayalam': return '🇮🇳 മലയാളം'
      case 'Punjabi': return '🇮🇳 ਪੰਜਾਬੀ'
      case 'Assamese': return '🇮🇳 অসমীয়া'
      default: return language
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-foreground mb-2">
        Output Language
      </label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full input flex items-center justify-between"
      >
        <div className="flex items-center space-x-2">
          <Globe className="h-4 w-4 text-muted-foreground" />
          <span>{getLanguageDisplay(selectedLanguage)}</span>
        </div>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-2xl shadow-soft z-10 max-h-60 overflow-y-auto">
          {LANGUAGES.map((language) => (
            <button
              key={language}
              type="button"
              onClick={() => {
                onLanguageChange(language)
                setIsOpen(false)
              }}
              className={`w-full text-left px-4 py-3 hover:bg-muted transition-colors first:rounded-t-2xl last:rounded-b-2xl ${
                selectedLanguage === language ? 'bg-primary/10 text-primary' : 'text-foreground'
              }`}
            >
              {getLanguageDisplay(language)}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}