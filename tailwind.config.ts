import type {Config} from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'uhg-deep': '#070B1F',
        'uhg-mid': '#0E1742',
        'uhg-glow': '#1A2868',
        'uhg-blue': '#002677',
        'uhg-bright': '#00B0E2',
        'uhg-cyan': '#7EE8FA',
        'uhg-gold': '#F2B544',
      },
      boxShadow: {
        glow: '0 0 40px rgba(126, 232, 250, 0.35)',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;
