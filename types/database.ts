export type PlanName = 'free' | 'basic' | 'pro' | 'power'

export interface UserProfile {
  id: string
  email: string
  created_at: string
  trial_bonus_granted: boolean
}

export interface UserPlan {
  user_id: string
  plan: PlanName
  renews_on: string | null
  monthly_quota: number
  used_this_month: number
  updated_at: string
}

export interface Prompt {
  id: number
  user_id: string | null
  language: string
  categories: string[]
  user_text: string
  final_prompt: string
  tokens_used: number
  created_at: string
}

export interface Event {
  id: number
  user_id: string | null
  event: string
  payload: Record<string, any>
  ts: string
}

export interface BuildPromptRequest {
  language: string
  categories: string[]
  user_text: string
}

export interface BuildPromptResponse {
  final_prompt: string
  quota_left: number
  plan: PlanName
}

export const CATEGORIES = [
  'Business', 'Finance', 'Marketing', 'Sales', 'HR', 'Operations', 
  'Customer Support', 'Legal', 'Real-Estate', 'Healthcare', 'Education/Student', 
  'Teacher', 'Govt-Exam Prep', 'Developer (Coding)', 'Designer/Branding', 
  'E-commerce', 'Procurement', 'Manufacturing', 'Logistics', 'Research', 
  'Advice/Coaching', 'Astrology', 'Personal', 'Social Media/Creator', 
  'Image', 'Video'
] as const

export const LANGUAGES = [
  'Auto', 'English', 'Hinglish', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 
  'Tamil', 'Urdu', 'Gujarati', 'Kannada', 'Odia', 'Malayalam', 'Punjabi', 'Assamese'
] as const

export const PLANS = {
  free: { name: 'Free Trial', quota: 30, price: 0 },
  basic: { name: 'Basic', quota: 150, price: 49 },
  pro: { name: 'Pro', quota: 400, price: 79 },
  power: { name: 'Power', quota: 1200, price: 99 }
} as const