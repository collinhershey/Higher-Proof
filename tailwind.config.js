/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#1A1614',
          800: '#221E1B',
          700: '#2C2724',
          600: '#3A332E',
          500: '#4D4540',
        },
        cream: {
          50: '#F5EAD8',
          100: '#E8DCC8',
          200: '#C9BCA5',
          400: '#A89C8A',
          600: '#7A7062',
        },
        amber: {
          DEFAULT: '#D4A857',
          dark: '#A8852E',
          glow: '#E8C173',
        },
        bitters: {
          DEFAULT: '#A23B2F',
          dark: '#7B2D26',
          glow: '#C04B3D',
        },
        sage: '#6B8769',
        cobalt: '#5A7B95',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Karla', '-apple-system', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        wider: '0.08em',
        widest: '0.16em',
      },
      boxShadow: {
        'inset-soft': 'inset 0 1px 0 rgba(245, 234, 216, 0.04)',
      },
    },
  },
  plugins: [],
};
