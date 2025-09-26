import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bharat Prompt - Premium Multilingual Prompt Generator',
  description: 'Built for 12+ Indian languages. Use prompts anywhere: Gemini, Claude, Groq, image & video models. Type your need. Tap your niche. Get a majestic prompt.',
  keywords: ['prompt generator', 'AI prompts', 'multilingual', 'Hindi', 'Indian languages', 'Hinglish', 'LLM prompts'],
  authors: [{ name: 'Bharat Prompt' }],
  creator: 'Bharat Prompt',
  publisher: 'Bharat Prompt',
  robots: 'index, follow',
  openGraph: {
    title: 'Bharat Prompt - Premium Multilingual Prompt Generator',
    description: 'Built for 12+ Indian languages. Use prompts anywhere: Gemini, Claude, Groq, image & video models.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bharat Prompt - Premium Multilingual Prompt Generator',
    description: 'Built for 12+ Indian languages. Use prompts anywhere: Gemini, Claude, Groq, image & video models.',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#2D4BF0',
}

import AuthProvider from "@/components/AuthProvider";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#2D4BF0" />
      </head>
      <body className="min-h-screen bg-white text-gray-900">
        <AuthProvider>
          <Header />
          <main className="mx-auto max-w-6xl p-4">{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}