/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  corePlugins: {
    preflight: false
  },
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      colors: {
        light:{
          background:'#ffffff',
          primary: '#2A8594',
          secondary: '#24516A',
          tertiary: '#90BDC5',
        },
        dark:{
          background: '#202020',
          primary: '#24616A',
          secondary: '#24516A',
          tertiary: '#90BDC5',
        },
      },
    }
  },
  plugins: []
};
