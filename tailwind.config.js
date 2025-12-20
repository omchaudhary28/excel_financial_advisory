/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#005A9C', // A strong, corporate blue
          light: '#0078D4',   // A slightly lighter, vibrant blue for hover
          dark: '#004578',    // A deeper navy blue
        },
        secondary: {
          DEFAULT: '#F26A2E', // A clear, confident orange
          light: '#FF8C00',   // A brighter orange for hover/accent
          dark: '#D85B28',    // A darker, burnt orange
        },
        accent: {
          DEFAULT: '#E0E0E0', // Light Gray for borders/accents
          dark: '#333333',    // Darker Gray for dark mode accents
        },
        background: {
          light: '#F8F9FA',   // Clean Off-White
          dark: '#000000',    // Black
        },
        text: {
          DEFAULT: '#212529', // Near Black for readability
          inverted: '#F8F9FA',   // Off-white for dark mode text
          muted: '#6C757D',   // Muted gray for secondary text
        },
        danger: {
          DEFAULT: '#DC3545', // Standard red for destructive actions
          light: '#E74C3C',   // Lighter red for hover states
          dark: '#C0392B',    // Darker red for active states
        },
        success: {
          DEFAULT: '#28a745', // Standard green for success actions
          light: '#218838',   // Lighter green for hover states
          dark: '#1e7e34',    // Darker green for active states
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        strong: '0 4px 12px rgba(0,0,0,0.15)',
        deeper: '0 6px 20px rgba(0,0,0,0.25)',
      },
      backgroundImage: {
        'gradient-primary-secondary': 'linear-gradient(to right, #005A9C, #F26A2E)',
        'gradient-secondary-primary': 'linear-gradient(to right, #F26A2E, #005A9C)',
        'gradient-primary-light-secondary-light': 'linear-gradient(to right, #0078D4, #FF8C00)',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      }
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.btn-primary': {
          '@apply bg-primary text-text-inverted px-6 py-3 rounded-lg font-semibold shadow-strong hover:bg-primary-light transition': {},
        },
        '.btn-secondary': {
          '@apply bg-secondary text-text-inverted px-6 py-3 rounded-lg font-semibold shadow-strong hover:bg-secondary-light transition': {},
        },
        '.btn-danger': {
          '@apply bg-danger text-text-inverted px-6 py-3 rounded-lg font-semibold shadow-strong hover:bg-danger-light transition': {},
        },
        '.card': {
          '@apply bg-background-light dark:bg-gray-900 p-6 rounded-xl shadow-strong text-text dark:text-text-inverted': {},
        },
        '.hero': {
          '@apply bg-gradient-primary-secondary text-text-inverted p-12 rounded-xl shadow-deeper flex items-center justify-center': {},
        },
        '.container-fluid': {
          '@apply px-4 sm:px-6 lg:px-8': {},
        }
      });
    },
  ],
}