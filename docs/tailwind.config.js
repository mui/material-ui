/** @type {import('tailwindcss/plugin')} */
// eslint-disable-next-line import/no-import-module-exports
import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './data/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
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
        'focusVisible',
        'required',
        'selected',
      ].forEach((state) => {
        addVariant(`ui-${state}`, [
          `&[class~="Mui-${state}"]`,
          `:where([class~="Mui-${state}"]) &`,
        ]);

        addVariant(`ui-not-${state}`, [`&:not([class~="Mui-${state}"])`]);
      });
    }),
  ],
};
