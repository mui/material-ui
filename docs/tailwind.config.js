/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './data/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // This needs to be kept in sync with docs/src/modules/sandbox/CreateReactApp.tsx
  theme: {
    extend: {
      boxShadow: {
        'outline-purple': '0 0 0 3px #c084fc',
      },
      minWidth: {
        badge: '22px',
      },
      minHeight: {
        badge: '22px',
      },
      lineHeight: {
        5.5: '1.375rem',
      },
    },
  },
  corePlugins: {
    // Remove the Tailwind CSS preflight styles so it can use Material UI's preflight instead (CssBaseline).
    preflight: false,
  },
  plugins: [],
};
