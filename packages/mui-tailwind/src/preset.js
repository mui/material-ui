const muiPlugin = require('./plugin');

/**
 * Helper: builds a palette color group that supports Tailwind's opacity modifiers
 * (e.g. `bg-primary/50`) using MUI's pre-computed channel variables.
 *
 * MUI exposes `--mui-palette-{color}-mainChannel` as space-separated R G B so
 * Tailwind can compose `rgb(R G B / <alpha-value>)` at the utility level.
 */
function paletteColor(name) {
  const v = (suffix) => `--mui-palette-${name}-${suffix}`;
  return {
    DEFAULT: `rgb(var(${v('mainChannel')}) / <alpha-value>)`,
    light: `rgb(var(${v('lightChannel')}) / <alpha-value>)`,
    dark: `rgb(var(${v('darkChannel')}) / <alpha-value>)`,
    contrast: `var(${v('contrastText')})`,
  };
}

/**
 * Tailwind v3 preset for Material UI.
 *
 * Usage in `tailwind.config.js`:
 *   module.exports = { presets: [require('@mui/tailwind')] };
 *
 * What you get:
 * - MUI palette colors as Tailwind colors (with opacity modifier support)
 * - MUI breakpoints aligned to `sm/md/lg/xl`
 * - MUI elevation shadows (`shadow-1` … `shadow-24`)
 * - MUI border-radius token (`rounded-mui`)
 * - MUI z-index scale
 * - `mui-{state}:` and `mui-not-{state}:` variants
 */
module.exports = {
  darkMode: ['class', '[data-mui-color-scheme="dark"]'],

  theme: {
    // Override Tailwind's default screens to match MUI breakpoints.
    // `xs` is intentionally omitted — it maps to 0px (the default / no breakpoint).
    screens: {
      sm: '600px',
      md: '900px',
      lg: '1200px',
      xl: '1536px',
      '2xl': '1920px',
    },

    extend: {
      colors: {
        // Semantic palette — opacity modifiers supported via channel vars
        primary: paletteColor('primary'),
        secondary: paletteColor('secondary'),
        error: paletteColor('error'),
        warning: paletteColor('warning'),
        info: paletteColor('info'),
        success: paletteColor('success'),

        // Text colors
        // MUI text colors are pre-mixed rgba values; use var() directly.
        // Opacity modifiers are not supported for these.
        text: {
          primary: 'var(--mui-palette-text-primary)',
          secondary: 'var(--mui-palette-text-secondary)',
          disabled: 'var(--mui-palette-text-disabled)',
          icon: 'var(--mui-palette-text-icon)',
        },

        // Surface / background colors
        background: {
          default: 'var(--mui-palette-background-default)',
          paper: 'var(--mui-palette-background-paper)',
        },

        // Divider
        divider: 'var(--mui-palette-divider)',

        // Action state colors
        action: {
          active: 'var(--mui-palette-action-active)',
          hover: 'var(--mui-palette-action-hover)',
          selected: 'var(--mui-palette-action-selected)',
          disabled: 'var(--mui-palette-action-disabled)',
          'disabled-bg': 'var(--mui-palette-action-disabledBackground)',
          focus: 'var(--mui-palette-action-focus)',
        },

        // Material grey scale — used for neutral surfaces and borders
        grey: {
          50: 'var(--mui-palette-grey-50)',
          100: 'var(--mui-palette-grey-100)',
          200: 'var(--mui-palette-grey-200)',
          300: 'var(--mui-palette-grey-300)',
          400: 'var(--mui-palette-grey-400)',
          500: 'var(--mui-palette-grey-500)',
          600: 'var(--mui-palette-grey-600)',
          700: 'var(--mui-palette-grey-700)',
          800: 'var(--mui-palette-grey-800)',
          900: 'var(--mui-palette-grey-900)',
          A100: 'var(--mui-palette-grey-A100)',
          A200: 'var(--mui-palette-grey-A200)',
          A400: 'var(--mui-palette-grey-A400)',
          A700: 'var(--mui-palette-grey-A700)',
        },
      },

      // MUI elevation shadows (0–24 matching Material Design levels)
      boxShadow: Object.fromEntries(
        Array.from({ length: 25 }, (_, i) => [i, `var(--mui-shadows-${i})`]),
      ),

      // MUI shape token
      borderRadius: {
        mui: 'calc(var(--mui-shape-borderRadius) * 1px)',
      },

      // MUI z-index scale
      zIndex: {
        mobileStepper: '1000',
        fab: '1050',
        'speed-dial': '1050',
        'app-bar': '1100',
        drawer: '1200',
        modal: '1300',
        snackbar: '1400',
        tooltip: '1500',
      },

      // MUI font family
      fontFamily: {
        mui: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },

  plugins: [muiPlugin],
};
