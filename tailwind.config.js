/** @type {import('tailwindcss').Config} */

theme = {
  'surface': {
    '100': '#FFFFFF',
    '200': '#FBFBFB',
    '300': '#f1f1f1',
    '400': '#EDEDED'
  },
  'primary': {
    '800': '#5A3F29',
    '900': '#372719'
  },
  'grey': '#A0A0A0',
  'cta': '#2B94A6',
  'warning': '#D32F2F',
  'dark': '#1E1E1E',
}

module.exports = {
  content: [
    "./src/**/*.{html,ts}", // add this line
  ],
  theme: {
    screens: {
      '3xs': '384px',
      '2xs': '448px',
      'xs': '512px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      backgroundColor: theme,
      textColor: theme,
      shadowColor: theme,
      borderColor: theme,
      gradientColorStops: theme,
      borderWidth: {
        "1": "1px"
      },
      height: {
        'picture-modal-content-height': 'calc(100vh)',
        'picture-modal-picture-height': 'calc(100vh - 2rem)',
        'picture-modal-comment-section-height': 'calc(100vh - 23rem)',
      },
      boxShadow: {
        'top': '0px -2px 4px rgba(0, 0, 0, 0.075)',
        'center': '0px 0px 15px rgba(0, 0, 0, 0.125)',
      },
    }
  },
  plugins: [],
}
