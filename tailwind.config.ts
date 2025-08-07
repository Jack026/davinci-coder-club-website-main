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
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          400: '#a78bfa',
          500: '#6366f1',
          600: '#5b21b6',
          700: '#4c1d95',
          900: '#312e81',
        },
        secondary: {
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
        },
        accent: {
          500: '#06b6d4',
          600: '#0891b2',
        },
        success: {
          500: '#10b981',
          600: '#059669',
        },
        bg: {
          primary: '#0f0f23',
          secondary: '#161625',
          tertiary: '#1e1e36',
          quaternary: '#2a2a4a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'Monaco', 'monospace'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'typing': 'typing 3s steps(30) 1s both',
        'blink': 'blink 1s infinite 4s',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(99, 102, 241, 0.6)' },
        },
        typing: {
          'from': { width: '0' },
          'to': { width: '11ch' },
        },
        blink: {
          '50%': { borderColor: 'transparent' },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: .5 },
        },
      },
    },
  },
  plugins: [],
}
export default config
