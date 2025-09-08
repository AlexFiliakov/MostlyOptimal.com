/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'pure-white': '#FFFFFF',
        'soft-silver': '#AEC6C1',
        'sage-green': '#B4D1B8',
        'cool-mist': '#BDD1CC',
        'warm-gray': '#D7DCD7',
        'deep-forest': '#2A4D3A',
        'electric-teal': '#00B4A6',
        'lightning-blue': '#4A90E2',
        'warm-gold': '#F7C948',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['IBM Plex Sans', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'count-up': 'countUp 2s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        countUp: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}