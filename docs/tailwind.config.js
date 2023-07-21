/** @type {import('tailwindcss/plugin')} */
// eslint-disable-next-line import/no-import-module-exports
import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-mui-color-scheme="dark"]'],
  content: [
    './data/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'outline-purple': '0 0 0 4px rgba(192, 132, 252, 0.25)',
        'outline-purple-xs': '0 0 0 1px rgba(192, 132, 252, 0.25)',
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
        listbox: '200px',
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
  plugins: [
    plugin(({ addVariant }) => {
      [
        'active',
        'checked',
        'completed',
        'disabled',
        'readOnly',
        'error',
        'expanded',
        'focused',
        'required',
        'selected',
      ].forEach((state) => {
        addVariant(`ui-${state}`, [`&[class~="Mui-${state}"]`]);

        addVariant(`ui-not-${state}`, [`&:not([class~="Mui-${state}"])`]);
      });

      // for focus-visible, use the same selector as headlessui
      // https://github.com/tailwindlabs/headlessui/blob/main/packages/%40headlessui-tailwindcss/src/index.ts#LL35C11-L35C11
      addVariant(`ui-focus-visible`, [`&[class~="Mui-focusVisible"]`, `&:focus-visible`]);
      addVariant(`ui-not-focus-visible`, [`&:not([class~="Mui-focusVisible"])`]);
    }),
  ],
};
