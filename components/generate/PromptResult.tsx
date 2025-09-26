'use client'

import { useState } from 'react'
import { Copy, Save, Download, Eye, Check } from 'lucide-react'
import { useToast } from '../ui/Toast'

interface PromptResultProps {
  prompt: string
  isProUser?: boolean
  onSave?: () => void
  onExport?: () => void
}

export default function PromptResult({ 
  prompt, 
  isProUser = false, 
  onSave, 
  onExport 
}: PromptResultProps) {
  const [copied, setCopied] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const { showToast } = useToast()

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      showToast('Copied to clipboard!', 'success')
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      showToast('Failed to copy to clipboard', 'error')
    }
  }

  const handleSave = () => {
    if (onSave) {
      onSave()
      showToast('Prompt saved to history!', 'success')
    }
  }

  const handleExport = () => {
    if (onExport) {
      onExport()
      showToast('Exported as PNG!', 'success')
    }
  }

  if (!prompt) return null

  return (
    <div className="space-y-4 fade-in">
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif font-semibold text-lg text-foreground">
            Your Generated Prompt
          </h3>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="btn-ghost text-sm"
          >
            <Eye className="h-4 w-4 mr-2" />
            {showPreview ? 'Hide' : 'Preview'}
          </button>
        </div>

        {/* Prompt Display */}
        <div className="relative">
          <div className="bg-muted/50 rounded-2xl p-4 border border-border font-mono text-sm leading-relaxed max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap text-foreground">{prompt}</pre>
          </div>
          
          {/* Copy Button Overlay */}
          <button
            onClick={copyToClipboard}
            className="absolute top-3 right-3 btn-ghost p-2"
            title="Copy to clipboard"
          >
            {copied ? (
              <Check className="h-4 w-4 text-success" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            onClick={copyToClipboard}
            className="btn-primary flex-1"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy Prompt
          </button>
          
          {isProUser && (
            <>
              <button
                onClick={handleSave}
                className="btn-ghost sm:flex-shrink-0"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </button>
              <button
                onClick={handleExport}
                className="btn-ghost sm:flex-shrink-0"
              >
                <Download className="h-4 w-4 mr-2" />
                Export PNG
              </button>
            </>
          )}
        </div>

        {/* Usage Note */}
        <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-xl">
          <p className="text-sm text-primary font-medium">
            💡 Paste this prompt into Gemini, Claude, Groq, or your favorite AI model
          </p>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-2xl p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-serif font-semibold text-lg">Prompt Preview</h4>
              <button
                onClick={() => setShowPreview(false)}
                className="btn-ghost p-2"
              >
                ✕
              </button>
            </div>
            <div className="bg-muted/50 rounded-xl p-4 font-mono text-sm leading-relaxed">
              <pre className="whitespace-pre-wrap">{prompt}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}