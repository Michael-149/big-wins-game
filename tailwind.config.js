/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0779bf',
          dark: '#005a8c',
          light: '#3399cc',
        },
        text: {
          dark: '#1a1a1a',
          secondary: '#4a5568',
        },
        bg: {
          secondary: '#f8fafc',
        },
        border: '#e2e8f0',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
      },
    },
  },
  plugins: [],
}
