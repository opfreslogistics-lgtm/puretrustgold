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
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F6E27F',
          dark: '#AA8C2C',
          soft: '#FFF7E6',
        },
        deep: {
          black: '#000000',
          charcoal: '#121212',
          gray: '#1A1A1A',
        },
        accent: {
          red: '#E63946',
          green: '#06D6A0',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37, #F6E27F, #D4AF37)',
        'black-gradient': 'linear-gradient(180deg, #000000, #1A1A1A, #121212)',
        'card-gradient': 'linear-gradient(145deg, #1A1A1A, #121212)',
      },
      animation: {
        'shimmer': 'shimmer 2.5s infinite linear',
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 60s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      }
    },
  },
  plugins: [],
}

