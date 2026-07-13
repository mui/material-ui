import type { Theme } from './createTheme';

export interface CreateTailwindPresetOptions {
  /**
   * Disable Tailwind preflight so Material UI owns the base reset.
   * @default true
   */
  disablePreflight?: boolean | undefined;
}

const paletteColors = ['primary', 'secondary', 'error', 'warning', 'info', 'success'];

const textColors = ['primary', 'secondary', 'disabled', 'icon'];

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

function kebabCase(value: string) {
  return value.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}

function paletteColor(color: string, shade: string) {
  return `var(--mui-palette-${color}-${shade})`;
}

function channelColor(color: string, shade: string) {
  return ({ opacityValue }: { opacityValue?: string | undefined }) => {
    if (opacityValue === undefined) {
      return paletteColor(color, shade);
    }

    return `rgb(var(--mui-palette-${color}-${shade}Channel) / ${opacityValue})`;
  };
}

function createColors() {
  const colors: Record<string, any> = {};

  paletteColors.forEach((color) => {
    colors[color] = {
      DEFAULT: channelColor(color, 'main'),
      light: channelColor(color, 'light'),
      dark: channelColor(color, 'dark'),
      contrast: paletteColor(color, 'contrastText'),
    };
  });

  colors.text = Object.fromEntries(
    textColors.map((color) => [color, `var(--mui-palette-text-${color})`]),
  );

  colors.background = {
    default: 'var(--mui-palette-background-default)',
    paper: 'var(--mui-palette-background-paper)',
  };

  colors.divider = 'var(--mui-palette-divider)';

  return colors;
}

function createScreens(theme: Pick<Theme, 'breakpoints'>) {
  return Object.fromEntries(
    theme.breakpoints.keys
      .filter((key) => (theme.breakpoints.values as Record<string, number>)[key] !== 0)
      .map((key) => [
        key,
        `${(theme.breakpoints.values as Record<string, number>)[key]}${
          theme.breakpoints.unit || 'px'
        }`,
      ]),
  );
}

function createBoxShadows(theme: Theme) {
  return Object.fromEntries(theme.shadows.map((_, index) => [index, `var(--mui-shadows-${index})`]));
}

function createZIndex(theme: Theme) {
  return Object.fromEntries(
    Object.entries(theme.zIndex).map(([key, value]) => [kebabCase(key), String(value)]),
  );
}

/**
 * Creates the Tailwind v3 preset from the live Material UI theme.
 *
 * Use this from `tailwind.config.*` in Tailwind v3 apps. It returns the JS
 * config shape Tailwind v3 expects, including screens, token-backed colors,
 * shadows, radius, typography utilities, and MUI state variants.
 */
export default function createTailwindPreset(
  theme: Theme,
  options: CreateTailwindPresetOptions = {},
) {
  const { disablePreflight = true } = options;

  return {
    corePlugins: {
      preflight: !disablePreflight,
    },
    theme: {
      screens: createScreens(theme),
      extend: {
        colors: createColors(),
        borderRadius: {
          mui: 'calc(var(--mui-shape-borderRadius) * 1px)',
        },
        boxShadow: createBoxShadows(theme),
        zIndex: createZIndex(theme),
      },
    },
    plugins: [
      ({ addVariant, matchUtilities }: any) => {
        muiStates.forEach(([variant, className]) => {
          addVariant(`mui-${variant}`, `&.${className}`);
          addVariant(`mui-not-${variant}`, `&:not(.${className})`);
        });

        matchUtilities(
          {
            typography: (value: string) => ({ font: value }),
          },
          {
            values: Object.fromEntries(
              typographyVariants.map((variant) => [variant, `var(--mui-font-${variant})`]),
            ),
          },
        );
      },
    ],
  };
}
