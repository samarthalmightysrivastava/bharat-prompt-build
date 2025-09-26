import Header from '../../components/ui/Header'
import { Check, Star, Zap, Shield, Globe, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function PricingPage() {
  const plans = [
    {
      name: 'Basic',
      price: 49,
      quota: 150,
      description: 'Perfect for individuals and small projects',
      features: [
        '150 prompts per month',
        '12+ Indian languages',
        'All category templates',
        'Copy & paste prompts',
        'Email support'
      ],
      buttonText: 'Continue with UPI',
      buttonStyle: 'btn-ghost',
      popular: false
    },
    {
      name: 'Pro',
      price: 79,
      quota: 400,
      description: 'Most popular for teams and businesses',
      features: [
        '400 prompts per month',
        '12+ Indian languages',
        'All category templates', 
        'Prompt history & save',
        'Export to PNG',
        'Priority support',
        'Advanced templates'
      ],
      buttonText: 'Continue with UPI',
      buttonStyle: 'btn-primary',
      popular: true
    },
    {
      name: 'Power',
      price: 99,
      quota: 1200,
      description: 'For agencies and power users',
      features: [
        '1200 prompts per month',
        '12+ Indian languages',
        'All category templates',
        'Prompt history & save',
        'Export to PNG',
        'Priority support',
        'Advanced templates',
        'Bulk generation',
        'Custom categories'
      ],
      buttonText: 'Continue with UPI',
      buttonStyle: 'btn-ghost',
      popular: false
    }
  ]

  const faqs = [
    {
      question: 'Will this work with Gemini/Claude/ChatGPT?',
      answer: 'Yes! Our prompts are designed to work with any AI model. Simply copy the generated prompt and paste it into Gemini, Claude, ChatGPT, Groq, or any other AI tool you prefer.'
    },
    {
      question: 'What languages are supported?',
      answer: 'We support 12+ Indian languages including Hindi, Bengali, Telugu, Marathi, Tamil, Urdu, Gujarati, Kannada, Odia, Malayalam, Punjabi, Assamese, plus natural Hinglish mixing.'
    },
    {
      question: 'How does UPI payment work?',
      answer: 'We use Razorpay for secure UPI payments. You can pay directly from any UPI app like GPay, PhonePe, Paytm, or your bank app. No foreign transaction charges!'
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Yes, you can cancel your subscription anytime. Your plan will remain active until the end of your billing period, and you won\'t be charged for the next month.'
    },
    {
      question: 'What happens to my quota each month?',
      answer: 'Your quota resets every month on your billing date. Unused prompts don\'t roll over to the next month, but Pro and Power users can save their favorite prompts for future use.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes! Everyone gets 15 free generations without signing up, plus 15 more after creating an account (30 total). This lets you test our quality before upgrading.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Choose the plan that fits your needs. All plans include our full range of Indian language support.
            </p>
            
            {/* UPI Badge */}
            <div className="inline-flex items-center space-x-2 bg-success/10 border border-success/20 rounded-full px-4 py-2">
              <Shield className="h-4 w-4 text-success" />
              <span className="text-success font-medium text-sm">UPI Payments • No Foreign Charges</span>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <div 
                key={plan.name}
                className={`card p-8 relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                      Most Used
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="font-serif font-semibold text-2xl text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {plan.description}
                  </p>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-foreground">₹{plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    {plan.quota} prompts/month
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`${plan.buttonStyle} w-full`}>
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>

          {/* Features Comparison */}
          <div className="card p-8 mb-16">
            <h2 className="font-serif font-semibold text-2xl text-foreground text-center mb-8">
              Why Choose Bharat Prompt?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-foreground mb-2">12+ Indian Languages</h3>
                <p className="text-sm text-muted-foreground">
                  Native support for Hindi, Bengali, Telugu, Tamil, and more, plus natural Hinglish
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-medium text-foreground mb-2">Universal Compatibility</h3>
                <p className="text-sm text-muted-foreground">
                  Copy prompts to any AI: Gemini, Claude, ChatGPT, image/video generators
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-success" />
                </div>
                <h3 className="font-medium text-foreground mb-2">India-First Pricing</h3>
                <p className="text-sm text-muted-foreground">
                  UPI payments, Indian pricing, no foreign charges or conversion fees
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="font-serif font-semibold text-3xl text-foreground text-center mb-8">
              Frequently Asked Questions
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {faqs.map((faq, index) => (
                <div key={index} className="card p-6">
                  <h3 className="font-medium text-foreground mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="card p-8">
              <h2 className="font-serif font-semibold text-2xl text-foreground mb-4">
                Ready to Create Amazing Prompts?
              </h2>
              <p className="text-muted-foreground mb-6">
                Join thousands of creators, marketers, and businesses using Bharat Prompt
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/generate" className="btn-primary">
                  Try Free (30 prompts)
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link href="/" className="btn-ghost">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}