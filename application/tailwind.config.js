/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Inter'],
      mono: ['Space Mono'],
    },
    // fontSize: {
    //   xs: '0.75rem',
    //   sm: '0.875rem',
    //   base: '1rem',
    //   lg: '1.125rem',
    //   xl: '1.25rem',
    //   '2xl': '1.5rem',
    //   '3xl': '1.875rem',
    //   '4xl': '2.25rem',
    //   '5xl': '3rem',
    //   '6xl': '4rem',
    // },
    extend: {
      colors: {
        primary: '#0C95DF',
        secondary: '#7B8698',
        tertiary: '#01293B',
        black: '#222222',
      },
    },
  },
  plugins: [],
};
