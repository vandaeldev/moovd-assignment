import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'smoke-yellow': '#eff5eb',
        'real-teal': {200: '#8de3ed', 300: '#66d7e5', 400: '#51cede', 500: '#4ac5d9', 600: '#45b4c6', 700: '#3e9fab', 800: '#398a94', 900: '#306769'},
        'err-red': {200: '#dea3a1', 300: '#cf827f', 400: '#d76b61', 500: '#da614d', 600: '#cb594a', 700: '#b95144'},
        'teal-blue': {200: '#9dcbef', 300: '#7cb6e7', 400: '#66a7e3', 500: '#5698de', 600: '#4e8bd0', 700: '#4679be'},
        'teal-tan': {200: '#e6e7dd', 300: '#d5d6cc', 400: '#b1b2a8', 500: '#909188', 600: '#696961', 700: '#55564e'}
      },
      backgroundImage: {
        'auth-teal': 'url(/assets/bg_auth_teal.png)',
        'activity-teal': 'url(/assets/bg_activity_teal.png)'
      }
    }
  }
} satisfies Config;
