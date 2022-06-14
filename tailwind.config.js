module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      '1/12': '8.333333%',
      screens: {
        mm: '400px',
      },
      boxShadow: {
        focusShadow:
          '-3px 3px 0px #DBE8FB, -3px -3px 0px #DBE8FB, 3px -3px 0px #DBE8FB, 3px 3px 0px #DBE8FB, 3px 3px 0px #DBE8FB',
      },
    },
  },
  plugins: [],
};
