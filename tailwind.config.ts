import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8F8F8',
        foreground: '#1B1B1B',
        primary: '#2D4BF0',
        secondary: '#FF7A00',
        success: '#17B26A',
        'primary-foreground': '#FFFFFF',
        'secondary-foreground': '#FFFFFF',
        muted: '#F3F4F6',
        'muted-foreground': '#6B7280',
        border: '#E5E7EB',
        card: '#FFFFFF',
        'card-foreground': '#1B1B1B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Source Serif Pro', 'serif'],
      },
      borderRadius: {
        '2xl': '1rem',
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}
export default config