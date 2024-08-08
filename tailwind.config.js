/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './src/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          1: '#1D1616',
          2: '#352D2D',
          3: '#E0D6D6',
          4: '#F3EEEE',
          5: '#FBF8F8',
          6: '#FEFCFC',
          G800: '#0F330F',
          G700: '#436840',
          G600: '#617E46',
          G400: '#6BAB25',
          G500: '#C9E0BE',
          G10: '#F2F4F3',
        },
        secondary: {
          1: '#AC0F18',
          2: '#BD2828',
          3: '#F2ACA3',
          4: '#FFDDD8',
          5: '#FEECEA',
          G900: '#B95322',
          G600: '#BA7A32',
        },
        neutrals: {
          1: '#FFFFFF',
          2: '#F2F2F2',
          3: '#DFDFDF',
          4: '#B6B6B6',
          5: '#787878',
          6: '#414042',
          7: '#0C1C2C',
        },
        danger: {
          1: '#F54040',
          2: '#F6D8D6',
        },
        warning: {
          1: '#E07324',
          2: '#F8DECB',
        },
        success: {
          1: '#1B9F60',
          2: '#C5E9D7',
        },
        color: {
          1: '#281D1D',
          2: '#6D6060',
          3: '#B9B2B2',
          4: '#F2EDED',
        },
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light'],
  },
};
