'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, X } from 'lucide-react'

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
  duration?: number
  onClose?: () => void
}

export default function Toast({ 
  message, 
  type = 'success', 
  duration = 3000, 
  onClose 
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!isVisible) return null

  const bgColor = {
    success: 'bg-success',
    error: 'bg-red-500',
    info: 'bg-primary'
  }[type]

  const Icon = type === 'success' ? CheckCircle : X

  return (
    <div 
      className={`fixed top-4 right-4 z-50 ${bgColor} text-white px-6 py-3 rounded-2xl shadow-lg transform transition-all duration-300 fade-in max-w-sm`}
    >
      <div className="flex items-center space-x-2">
        <Icon className="h-5 w-5 flex-shrink-0" />
        <span className="font-medium text-sm">{message}</span>
        <button
          onClick={() => {
            setIsVisible(false)
            onClose?.()
          }}
          className="ml-2 text-white/80 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

// Toast Manager Hook
export function useToast() {
  const [toasts, setToasts] = useState<Array<{
    id: string
    message: string
    type: 'success' | 'error' | 'info'
    duration?: number
  }>>([])

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success', duration = 3000) => {
    const id = Date.now().toString()
    setToasts(prev => [...prev, { id, message, type, duration }])
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const ToastContainer = () => (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  )

  return { showToast, ToastContainer }
}