/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    }
  },
  plugins: [],
  safelist: [
    // Cores dinâmicas para skills
    'bg-blue-100', 'bg-blue-500', 'bg-blue-600',
    'text-blue-600', 'text-blue-800',
    'bg-green-100', 'bg-green-500', 'bg-green-600',
    'text-green-600', 'text-green-800',
    'bg-orange-100', 'bg-orange-500', 'bg-orange-600',
    'text-orange-600', 'text-orange-800',
    'bg-red-100', 'bg-red-500', 'bg-red-600',
    'text-red-600', 'text-red-800',
    'bg-purple-100', 'bg-purple-500', 'bg-purple-600',
    'text-purple-600', 'text-purple-800',
    'bg-yellow-100', 'bg-yellow-500', 'bg-yellow-600',
    'text-yellow-600', 'text-yellow-800',
    'hover:bg-blue-600', 'hover:bg-green-600', 'hover:bg-orange-600',
    'hover:bg-red-600', 'hover:bg-purple-600', 'hover:bg-yellow-600'
  ]
}