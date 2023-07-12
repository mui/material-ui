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
        'outline-purple': '0 0 0 4px rgba(192, 132, 252, 0.25)',
        'outline-switch': '0 0 1px 8px rgba(168, 85, 247, 0.35)',
      },
      cursor: {
        inherit: 'inherit',
      },
      border: {
        3: '3px',
      },
      keyframes: {
        'in-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
      },
      animation: {
        appear: 'in-right 200ms',
      },
      minWidth: {
        badge: '22px',
        snackbar: '300px',
      },
      maxWidth: {
        snackbar: '560px',
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
