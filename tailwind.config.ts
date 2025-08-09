import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        nexus: {
          dark: '#0a0e27',
        },
        legal: {
          blue: '#1e3a8a',
        },
        creative: {
          purple: '#6b21a8',
        },
        synthesis: {
          gold: '#ca8a04',
        },
        clay: '#B8A89A',
        slate: '#2F3A45',
        beige: '#EFE9E5',
        seafoam: '#CFE9E6',
        softblue: '#A7C5EB',
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"EB Garamond"', 'serif'],
      },
      transitionTimingFunction: {
        breath: 'cubic-bezier(0.4, 0.0, 0.6, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config;
