const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    // this is for the journeyCard isActive state
    'shadow-2xl',
    // this is for the journeyCard null city state
    'opacity-30',
    // these are for the line chart
    'stroke-brand-secondary',
    'stroke-brand-tertiary',
    // These are for all empty states
    'animate-primary-phase',
    'animate-dark-fade',
    'animate-light-phase',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#00e599',
          'primary-light': '#00e5bf',
          secondary: '#f0f075',
          tertiary: '#ff4c79',
          highlight: '#aa99ff',
          'light-gray': '#afb1b6',
          'dark-gray': '#131415',
          background: '#0c0d0d',
          code: '#131415',
          globe: '#0c0d0d',
          atmosphere: '#135b45',
          border: '#242628',
        },
      },
      fontFamily: {
        ibmPlexSans: ['var(--font-ibm-plex-sans)'],
      },
      maxWidth: {
        '8xl': '110rem',
      },
      keyframes: {
        bloop: {
          '0%, 100%': { transform: 'scale(1.2, 1.2)' },
          '50%': { transform: 'scale(0.8,0.8)' },
        },
        'dark-fade': {
          '0%, 100%': { background: '#474747' },
          '50%': { background: '#2f2f2f' },
        },
      },
      animation: {
        bloop: 'bloop 1s ease-in-out infinite',
        'dark-fade': 'dark-fade 3s linear infinite',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '*:not(code)': {
              fontFamily: theme('fontFamily.ibmPlexSans'),
            },
            'h1, h2, h3, h4, h5, h6': {
              color: theme('colors.white'),
              margin: 0,
              fontWeight: 500,
            },
            p: {
              color: theme('colors.white'),
              margin: 0,
              fontWeight: 300,
            },
            strong: {
              lineHeight: '0.8rem',
              color: theme('colors.white'),
            },
            small: {
              lineHeight: '0.8rem',
              color: theme('colors.brand.light-gray'),
            },
            a: {
              color: theme('colors.brand.primary'),
            },

            'th, td': {
              color: theme('colors.black'),
            },
            pre: {
              fontSize: '1em!importa',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            table: {
              thead: {
                th: {
                  color: 'white',
                  fontWeight: 500,
                  textAlign: 'left',
                },
              },
              tbody: {
                td: {
                  color: 'white',
                  fontWeight: 400,
                  textAlign: 'left',
                },
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.gradient-mask-t': {
          'mask-image':
            'radial-gradient(50% 90% at 50% 100%, #000, transparent)',
        },
        '.gradient-mask-b': {
          'mask-image': 'radial-gradient(50% 90% at 50% 0%, #000, transparent)',
        },
      });
    }),
  ],
};
