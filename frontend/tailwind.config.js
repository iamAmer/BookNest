/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf8f0',
          100: '#f9edda',
          200: '#f2d7b3',
          300: '#e9bc85',
          400: '#d4a574',
          500: '#c48b52',
          600: '#b07040',
          700: '#8b6f47',
          800: '#6b5744',
          900: '#4a3d2f',
          950: '#2a2118',
        },
        cream: '#f5e6d3',
        warm: '#f8f6f3',
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        heading: ['Arimo', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(74, 61, 47, 0.08)',
        'card-hover': '0 8px 24px rgba(74, 61, 47, 0.12)',
        dropdown: '0 4px 16px rgba(74, 61, 47, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
