import Link from 'next/link'
import { ArrowRight, Globe, Zap, Shield, Star, Check } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      
      {/* Language Notice Bar */}
      <div className="bg-primary/10 border-b border-primary/20 py-2">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-primary font-medium">
            Supports Hindi, Bengali, Telugu, Marathi, Tamil, Urdu, Gujarati, Kannada, Odia, Malayalam, Punjabi, Assamese + Hinglish
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Hero Headlines */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 slide-up">
              Bharat Prompt
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 slide-up" style={{ animationDelay: '0.1s' }}>
              Premium Multilingual Prompt Generator
            </p>
            
            {/* Tagline */}
            <div className="mb-12 slide-up" style={{ animationDelay: '0.2s' }}>
              <p className="text-lg text-foreground font-medium mb-4">
                "Type your need. Tap your niche. Get a majestic prompt."
              </p>
              <p className="text-base text-muted-foreground">
                Built for 12+ Indian languages. Use prompts anywhere: Gemini, Claude, Groq, image & video models.
              </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-12 slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center space-x-2 bg-card border border-border rounded-full px-4 py-2">
                <Globe className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Hinglish ready</span>
              </div>
              <div className="flex items-center space-x-2 bg-card border border-border rounded-full px-4 py-2">
                <Zap className="h-4 w-4 text-secondary" />
                <span className="text-sm font-medium">Paste into any LLM</span>
              </div>
              <div className="flex items-center space-x-2 bg-card border border-border rounded-full px-4 py-2">
                <Shield className="h-4 w-4 text-success" />
                <span className="text-sm font-medium">UPI-friendly</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 slide-up" style={{ animationDelay: '0.4s' }}>
              <Link href="/generate" className="btn-primary text-lg px-8 py-4">
                Generate Prompt
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/pricing" className="btn-ghost text-lg px-8 py-4">
                See Pricing
              </Link>
            </div>

            {/* Quick Demo */}
            <div className="card p-8 mb-16 text-left max-w-2xl mx-auto slide-up" style={{ animationDelay: '0.5s' }}>
              <h3 className="font-serif font-semibold text-lg mb-4">How it works:</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">1</div>
                  <div>
                    <p className="text-sm"><strong>Select language & categories:</strong> Choose Hindi, English, Hinglish, or 12+ Indian languages</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">2</div>
                  <div>
                    <p className="text-sm"><strong>Describe your need:</strong> "Write a LinkedIn post announcing our product demo"</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <div>
                    <p className="text-sm"><strong>Get professional prompt:</strong> Copy and paste into Gemini, Claude, Groq, or any AI tool</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">
                Why Choose Bharat Prompt?
              </h2>
              <p className="text-lg text-muted-foreground">
                Professional-grade prompts tailored for Indian businesses and creators
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="card p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif font-semibold text-lg mb-3">Multilingual Support</h3>
                <p className="text-sm text-muted-foreground">
                  Native support for Hindi, Bengali, Telugu, Tamil, and 8+ Indian languages plus natural Hinglish
                </p>
              </div>

              {/* Feature 2 */}
              <div className="card p-6 text-center">
                <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-serif font-semibold text-lg mb-3">Universal Compatibility</h3>
                <p className="text-sm text-muted-foreground">
                  Works with any AI: Gemini, Claude, ChatGPT, Groq, image generators, video tools, and more
                </p>
              </div>

              {/* Feature 3 */}
              <div className="card p-6 text-center">
                <div className="w-12 h-12 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-success" />
                </div>
                <h3 className="font-serif font-semibold text-lg mb-3">India-First Pricing</h3>
                <p className="text-sm text-muted-foreground">
                  Starting at just ₹49/month with UPI payments. No hidden fees, no foreign transaction charges
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="card p-8">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-secondary fill-current" />
                ))}
              </div>
              <blockquote className="text-lg italic text-muted-foreground mb-4">
                "Finally, a prompt generator that understands Indian context! The Hinglish support is perfect for our social media team."
              </blockquote>
              <cite className="text-sm font-medium text-foreground">
                — Marketing Team, Tech Startup in Bangalore
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <Link href="/" className="flex items-center space-x-2 mb-4">
                  <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">भ</span>
                  </div>
                  <span className="font-serif font-bold text-xl text-foreground">
                    Bharat Prompt
                  </span>
                </Link>
                <p className="text-sm text-muted-foreground mb-4">
                  Premium multilingual prompt generator for Indian businesses and creators. 
                  Generate professional prompts in 12+ Indian languages.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground mb-3">Product</h3>
                <ul className="space-y-2">
                  <li><Link href="/generate" className="text-sm text-muted-foreground hover:text-foreground">Generate Prompt</Link></li>
                  <li><Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground mb-3">Legal</h3>
                <ul className="space-y-2">
                  <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-border mt-8 pt-8 text-center">
              <p className="text-sm text-muted-foreground">
                © 2024 Bharat Prompt. Made with ❤️ in India.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}