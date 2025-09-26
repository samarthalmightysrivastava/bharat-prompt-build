'use client'

import { useState } from 'react'
import { 
  Building2, DollarSign, Megaphone, TrendingUp, Users, Settings, 
  Headphones, Scale, Home, Heart, GraduationCap, BookOpen, 
  FileText, Code, Palette, ShoppingCart, Package, Factory, 
  Truck, SearchIcon, MessageSquare, Star, User, Camera, Video,
  Briefcase
} from 'lucide-react'

import { CATEGORIES } from '../../types/database'

interface CategoryGridProps {
  selectedCategories: string[]
  onCategoriesChange: (categories: string[]) => void
}

// Icon mapping for categories
const categoryIcons: Record<string, any> = {
  'Business': Building2,
  'Finance': DollarSign,
  'Marketing': Megaphone,
  'Sales': TrendingUp,
  'HR': Users,
  'Operations': Settings,
  'Customer Support': Headphones,
  'Legal': Scale,
  'Real-Estate': Home,
  'Healthcare': Heart,
  'Education/Student': GraduationCap,
  'Teacher': BookOpen,
  'Govt-Exam Prep': FileText,
  'Developer (Coding)': Code,
  'Designer/Branding': Palette,
  'E-commerce': ShoppingCart,
  'Procurement': Package,
  'Manufacturing': Factory,
  'Logistics': Truck,
  'Research': SearchIcon,
  'Advice/Coaching': MessageSquare,
  'Astrology': Star,
  'Personal': User,
  'Social Media/Creator': Camera,
  'Image': Camera,
  'Video': Video
}

export default function CategoryGrid({ selectedCategories, onCategoriesChange }: CategoryGridProps) {
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoriesChange(selectedCategories.filter(c => c !== category))
    } else {
      onCategoriesChange([...selectedCategories, category])
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-foreground mb-3">
        Select Categories ({selectedCategories.length} selected)
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {CATEGORIES.map((category) => {
          const Icon = categoryIcons[category] || Briefcase
          const isSelected = selectedCategories.includes(category)
          
          return (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`category-chip ripple ${isSelected ? 'selected' : ''}`}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span className="text-xs font-medium truncate">{category}</span>
            </button>
          )
        })}
      </div>
      
      {selectedCategories.length === 0 && (
        <p className="text-sm text-muted-foreground mt-2">
          Please select at least one category to get started
        </p>
      )}
    </div>
  )
}