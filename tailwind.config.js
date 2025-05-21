/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: '#1A1F2B',
        charcoal: '#222B38',
        accent: {
          DEFAULT: '#E76F51',
          light: '#F4A261',
          dark: '#D95735'
        },
        offwhite: '#F5F5F5',
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      transitionProperty: {
        'size': 'height, width',
        'spacing': 'margin, padding',
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        }
      },
      animation: {
        slideDown: 'slideDown 0.3s ease-out',
        fadeIn: 'fadeIn 0.4s ease-out',
      }
    },
  },
  plugins: [],
};