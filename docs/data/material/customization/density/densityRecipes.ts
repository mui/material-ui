import type { DensityScaleOverrides, ThemeOptions } from '@mui/material/styles';

export interface DensityRecipe {
  id: string;
  label: string;
  /** Second argument to `enhanceDensity` — the density layer. */
  scale: DensityScaleOverrides;
  /** `createTheme` inputs — ordinary design, applied before the enhancer. */
  shape: NonNullable<ThemeOptions['shape']>;
  typography: NonNullable<ThemeOptions['typography']>;
}

const densityRecipes: DensityRecipe[] = [
  {
    id: 'low',
    label: 'Low',
    scale: {
      'xx-small': 8,
      'x-small': 12,
      small: 16,
      medium: 24,
      large: 32,
      'x-large': 48,
      'xx-large': 64,
      'touch-target': 44,
      'icon-target': 24,
    },
    shape: { borderRadius: 8 },
    typography: {
      h1: { fontSize: '1.875rem', lineHeight: '38px' },
      h2: { fontSize: '1.625rem', lineHeight: '32px' },
      h3: { fontSize: '1.25rem', lineHeight: '28px' },
      h4: { fontSize: '1.125rem', lineHeight: '26px' },
      h5: { fontSize: '1rem', lineHeight: '24px' },
      h6: { fontSize: '0.9375rem', lineHeight: '22px' },
      subtitle1: { fontSize: '1rem', lineHeight: '24px' },
      subtitle2: { fontSize: '0.9375rem', lineHeight: '22px' },
      body1: { fontSize: '1rem', lineHeight: '22px' },
      body2: { fontSize: '0.9375rem', lineHeight: '20px' },
      caption: { fontSize: '0.875rem', lineHeight: '20px' },
      button: {
        fontSize: '1rem',
        lineHeight: '22px',
        textTransform: 'initial',
        letterSpacing: 0,
      },
    },
  },
  {
    id: 'medium',
    label: 'Medium',
    // The shipped ladder — the enhancer's own defaults, spelled out so the
    // three recipes read side by side.
    scale: {
      'xx-small': 4,
      'x-small': 8,
      small: 12,
      medium: 16,
      large: 24,
      'x-large': 32,
      'xx-large': 48,
      'touch-target': 32,
    },
    shape: { borderRadius: 6 },
    typography: {
      h1: { fontSize: '1.75rem', lineHeight: '36px' },
      h2: { fontSize: '1.5rem', lineHeight: '30px' },
      h3: { fontSize: '1rem', lineHeight: '26px' },
      h4: { fontSize: '0.9375rem', lineHeight: '24px' },
      h5: { fontSize: '0.875rem', lineHeight: '22px' },
      h6: { fontSize: '0.8125rem', lineHeight: '20px' },
      subtitle1: { fontSize: '0.875rem', lineHeight: '22px' },
      subtitle2: { fontSize: '0.8125rem', lineHeight: '20px' },
      body1: { fontSize: '0.875rem', lineHeight: '20px' },
      body2: { fontSize: '0.8125rem', lineHeight: '18px' },
      caption: { fontSize: '0.75rem', lineHeight: '16px' },
      button: {
        fontSize: '0.875rem',
        lineHeight: '20px',
        textTransform: 'initial',
        letterSpacing: 0,
      },
    },
  },
  {
    id: 'high',
    label: 'High',
    scale: {
      'xx-small': 2,
      'x-small': 4,
      small: 8,
      medium: 12,
      large: 16,
      'x-large': 24,
      'xx-large': 32,
      'touch-target': 24,
    },
    shape: { borderRadius: 4 },
    typography: {
      h1: { fontSize: '1.5rem', lineHeight: '30px' },
      h2: { fontSize: '1.25rem', lineHeight: '26px' },
      h3: { fontSize: '0.875rem', lineHeight: '22px' },
      h4: { fontSize: '0.8125rem', lineHeight: '20px' },
      h5: { fontSize: '0.75rem', lineHeight: '18px' },
      h6: { fontSize: '0.6875rem', lineHeight: '16px' },
      subtitle1: { fontSize: '0.75rem', lineHeight: '18px' },
      subtitle2: { fontSize: '0.6875rem', lineHeight: '16px' },
      body1: { fontSize: '0.75rem', lineHeight: '16px' },
      body2: { fontSize: '0.6875rem', lineHeight: '14px' },
      caption: { fontSize: '0.6875rem', lineHeight: '14px' },
      button: {
        fontSize: '0.75rem',
        lineHeight: '16px',
        textTransform: 'initial',
        letterSpacing: 0,
      },
    },
  },
];

export default densityRecipes;
