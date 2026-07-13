import type { Theme } from './createTheme';

export interface GenerateTailwindThemeCssOptions {
  /**
   * Include Tailwind utilities backed by generated theme tokens.
   * @default true
   */
  includeUtilities?: boolean | undefined;
  /**
   * Include MUI state variants for Tailwind v4.
   * @default true
   */
  includeVariants?: boolean | undefined;
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

function breakpointValue(theme: Pick<Theme, 'breakpoints'>, key: string) {
  return `${(theme.breakpoints.values as Record<string, number>)[key]}${theme.breakpoints.unit || 'px'}`;
}

function generateBreakpointTheme(theme: Pick<Theme, 'breakpoints'>) {
  const lines = theme.breakpoints.keys
    .filter((key) => (theme.breakpoints.values as Record<string, number>)[key] !== 0)
    .map((key) => `  --breakpoint-${key}: ${breakpointValue(theme, key)};`);

  if (lines.length === 0) {
    return '';
  }

  return ['@theme {', ...lines, '}'].join('\n');
}

function generateInlineTheme(theme: Theme) {
  const lines: string[] = ['@theme inline {'];

  lines.push('  /* Semantic palette */');
  paletteColors.forEach((color) => {
    lines.push(`  --color-${color}: var(--mui-palette-${color}-main);`);
    lines.push(`  --color-${color}-light: var(--mui-palette-${color}-light);`);
    lines.push(`  --color-${color}-dark: var(--mui-palette-${color}-dark);`);
    lines.push(`  --color-${color}-contrast: var(--mui-palette-${color}-contrastText);`);
    lines.push('');
  });

  lines.push('  /* Text */');
  textColors.forEach((color) => {
    lines.push(`  --color-text-${color}: var(--mui-palette-text-${color});`);
  });
  lines.push('');

  lines.push('  /* Surfaces */');
  lines.push('  --color-background-default: var(--mui-palette-background-default);');
  lines.push('  --color-background-paper: var(--mui-palette-background-paper);');
  lines.push('  --color-divider: var(--mui-palette-divider);');
  lines.push('');

  lines.push('  /* Action states */');
  actionColors.forEach(([token, cssVar]) => {
    lines.push(`  --color-action-${token}: var(--mui-palette-action-${cssVar});`);
  });
  lines.push('');

  lines.push('  /* Grey scale */');
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
  ].forEach((shade) => {
    lines.push(`  --color-grey-${shade}: var(--mui-palette-grey-${shade});`);
  });
  lines.push('');

  lines.push('  /* Typography */');
  typographyVariants.forEach((variant) => {
    lines.push(`  --font-${variant}: var(--mui-font-${variant});`);
  });
  lines.push('');

  lines.push('  /* Letter spacing */');
  const typography = theme.typography as unknown as Record<
    string,
    { letterSpacing?: string | number | undefined }
  >;
  typographyVariants.forEach((variant) => {
    const letterSpacing = typography[variant]?.letterSpacing;
    if (letterSpacing != null) {
      lines.push(`  --tracking-${variant}: ${letterSpacing};`);
    }
  });
  lines.push('');

  lines.push('  /* Elevation shadows */');
  theme.shadows.forEach((_, index) => {
    lines.push(`  --shadow-${index}: var(--mui-shadows-${index});`);
  });
  lines.push('');

  lines.push('  /* Shape */');
  lines.push('  --radius-mui: calc(var(--mui-shape-borderRadius) * 1px);');
  lines.push('');

  lines.push('  /* Z-index scale */');
  Object.entries(theme.zIndex).forEach(([key, value]) => {
    lines.push(`  --z-${kebabCase(key)}: ${value};`);
  });
  lines.push('');

  lines.push('  /* Opacity */');
  ['hover', 'selected', 'disabled', 'focus', 'activated'].forEach((opacity) => {
    lines.push(`  --opacity-${opacity}: var(--mui-palette-action-${opacity}Opacity);`);
  });

  lines.push('}');

  return lines.join('\n');
}

function generateUtilities() {
  return [
    '@utility typography-* {',
    '  font: --value(--font-*);',
    '}',
    '',
    '@utility elevation-* {',
    '  box-shadow: --value(--shadow-*);',
    '}',
  ].join('\n');
}

function generateVariants() {
  return muiStates
    .flatMap(([variant, className]) => [
      `@custom-variant mui-${variant} (&.${className});`,
      `@custom-variant mui-not-${variant} (&:not(.${className}));`,
      '',
    ])
    .join('\n')
    .trim();
}

/**
 * Generates the Tailwind v4 theme bridge from the live Material UI theme.
 *
 * Use this in Tailwind v4 apps that consume theme tokens from CSS via `@theme`.
 * It emits breakpoints, token aliases, utilities, and MUI state variants.
 */
export default function generateTailwindThemeCss(
  theme: Theme,
  options: GenerateTailwindThemeCssOptions = {},
) {
  const { includeUtilities = true, includeVariants = true } = options;

  return [
    generateBreakpointTheme(theme),
    generateInlineTheme(theme),
    includeUtilities ? generateUtilities() : '',
    includeVariants ? generateVariants() : '',
  ]
    .filter(Boolean)
    .join('\n\n');
}
