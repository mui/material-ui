import type { Theme } from '@mui/material/styles';

interface TailwindPluginApi {
  addVariant: (name: string, selector: string) => void;
  matchUtilities?:
    | ((
        utilities: Record<string, (value: string) => Record<string, string>>,
        options: { values: Record<string, string> },
      ) => void)
    | undefined;
}

export interface CreateTailwindPresetOptions {
  /**
   * Disable Tailwind's base reset so Material UI owns component defaults.
   * @default true
   */
  disablePreflight?: boolean | undefined;
}

const paletteColors = ['primary', 'secondary', 'error', 'warning', 'info', 'success'];

const textColors = ['primary', 'secondary', 'disabled', 'icon'];

const actionColors = [
  ['active', 'active'],
  ['hover', 'hover'],
  ['selected', 'selected'],
  ['disabled', 'disabled'],
  ['disabled-bg', 'disabledBackground'],
  ['focus', 'focus'],
];

const typographyVariants = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'subtitle1',
  'subtitle2',
  'body1',
  'body2',
  'button',
  'caption',
  'overline',
];

const muiStates = [
  ['active', 'Mui-active'],
  ['checked', 'Mui-checked'],
  ['completed', 'Mui-completed'],
  ['disabled', 'Mui-disabled'],
  ['error', 'Mui-error'],
  ['expanded', 'Mui-expanded'],
  ['focused', 'Mui-focused'],
  ['focus-visible', 'Mui-focusVisible'],
  ['readonly', 'Mui-readOnly'],
  ['required', 'Mui-required'],
  ['selected', 'Mui-selected'],
];

function kebabCase(value: string) {
  return value.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}

function paletteColor(name: string) {
  const variable = (suffix: string) => `--mui-palette-${name}-${suffix}`;

  return {
    DEFAULT: `rgb(var(${variable('mainChannel')}) / <alpha-value>)`,
    light: `rgb(var(${variable('lightChannel')}) / <alpha-value>)`,
    dark: `rgb(var(${variable('darkChannel')}) / <alpha-value>)`,
    contrast: `var(${variable('contrastText')})`,
  };
}

function createScreens(theme: Theme) {
  return Object.fromEntries(
    theme.breakpoints.keys
      .filter((key) => (theme.breakpoints.values as Record<string, number>)[key] !== 0)
      .map((key) => [
        key,
        `${(theme.breakpoints.values as Record<string, number>)[key]}${theme.breakpoints.unit || 'px'}`,
      ]),
  );
}

function createTypographyUtilities() {
  return Object.fromEntries(
    typographyVariants.map((variant) => [variant, `var(--mui-font-${variant})`]),
  );
}

function muiPlugin({ addVariant, matchUtilities }: TailwindPluginApi) {
  muiStates.forEach(([variant, className]) => {
    addVariant(`mui-${variant}`, `&.${className}`);
    addVariant(`mui-not-${variant}`, `&:not(.${className})`);
  });

  matchUtilities?.(
    {
      typography: (value) => ({ font: value }),
    },
    {
      values: createTypographyUtilities(),
    },
  );
}

/**
 * Creates a Tailwind v3 preset from the live Material UI theme.
 *
 * Use this from `tailwind.config.*` in Tailwind v3 apps. It returns the JS
 * config shape Tailwind v3 expects, including screens, token aliases, and MUI
 * state variants.
 */
export default function createTailwindPreset(
  theme: Theme,
  options: CreateTailwindPresetOptions = {},
) {
  const { disablePreflight = true } = options;

  return {
    darkMode: ['class', '[data-mui-color-scheme="dark"]'],
    corePlugins: {
      preflight: !disablePreflight,
    },
    theme: {
      screens: createScreens(theme),
      extend: {
        colors: {
          ...Object.fromEntries(paletteColors.map((color) => [color, paletteColor(color)])),
          text: Object.fromEntries(
            textColors.map((color) => [color, `var(--mui-palette-text-${color})`]),
          ),
          background: {
            default: 'var(--mui-palette-background-default)',
            paper: 'var(--mui-palette-background-paper)',
          },
          divider: 'var(--mui-palette-divider)',
          action: Object.fromEntries(
            actionColors.map(([token, cssVar]) => [token, `var(--mui-palette-action-${cssVar})`]),
          ),
          grey: Object.fromEntries(
            [
              '50',
              '100',
              '200',
              '300',
              '400',
              '500',
              '600',
              '700',
              '800',
              '900',
              'A100',
              'A200',
              'A400',
              'A700',
            ].map((shade) => [shade, `var(--mui-palette-grey-${shade})`]),
          ),
        },
        boxShadow: Object.fromEntries(
          theme.shadows.map((_, index) => [index, `var(--mui-shadows-${index})`]),
        ),
        borderRadius: {
          mui: 'calc(var(--mui-shape-borderRadius) * 1px)',
        },
        zIndex: Object.fromEntries(
          Object.entries(theme.zIndex).map(([key, value]) => [kebabCase(key), String(value)]),
        ),
        fontFamily: {
          mui: theme.typography.fontFamily,
        },
      },
    },
    plugins: [muiPlugin],
  };
}
