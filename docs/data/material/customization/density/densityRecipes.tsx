import * as React from 'react';
import type { DensityScaleOverrides, ThemeOptions } from '@mui/material/styles';
import SvgIcon from '@mui/material/SvgIcon';

// Control glyphs on a 16-unit viewBox, so the drawing fills the icon box with no
// dead margin around it. Size is left to the theme's `icon-target`. `currentColor`
// follows the component's own state color; the inner marks ride the primary
// contrast text so the pair stays correct in both color schemes without styles.
const CONTRAST = 'var(--mui-palette-primary-contrastText, #fff)';

function BoxBlankIcon(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon viewBox="0 0 16 16" {...props}>
      <rect
        x="0.75"
        y="0.75"
        width="14.5"
        height="14.5"
        rx="3.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </SvgIcon>
  );
}

function BoxCheckedIcon(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon viewBox="0 0 16 16" {...props}>
      <rect x="0" y="0" width="16" height="16" rx="4" fill="currentColor" />
      <path
        d="m4.5 8.5 2.5 2.5 4.5-5"
        fill="none"
        stroke={CONTRAST}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}

function BoxIndeterminateIcon(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon viewBox="0 0 16 16" {...props}>
      <rect x="0" y="0" width="16" height="16" rx="4" fill="currentColor" />
      <path
        d="M4.5 8 H11.5"
        stroke={CONTRAST}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </SvgIcon>
  );
}

function CircleBlankIcon(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon viewBox="0 0 16 16" {...props}>
      <circle
        cx="8"
        cy="8"
        r="7.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </SvgIcon>
  );
}

function CircleCheckedIcon(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon viewBox="0 0 16 16" {...props}>
      <circle
        cx="8"
        cy="8"
        r="7.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="8" cy="8" r="3.75" fill="currentColor" />
    </SvgIcon>
  );
}

function ChevronDownIcon(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props}>
      <path
        d="M8 10 L12 14.5 L16 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}

function ThinCloseIcon(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props}>
      <path
        d="M8.5 8.5 L15.5 15.5 M15.5 8.5 L8.5 15.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </SvgIcon>
  );
}

export interface DensityRecipe {
  id: string;
  label: string;
  /** Second argument to `enhanceDensity` — the density layer. */
  scale: DensityScaleOverrides;
  /** `createTheme` inputs — ordinary design, applied before the enhancer. */
  shape: NonNullable<ThemeOptions['shape']>;
  typography: NonNullable<ThemeOptions['typography']>;
}

/**
 * `defaultProps` are a theme layer of their own: swapping the control glyphs
 * costs no styleOverrides and survives the enhancer untouched. Shared across
 * recipes because an icon set is a brand decision, not a density one.
 */
export const iconComponents: NonNullable<ThemeOptions['components']> = {
  MuiCheckbox: {
    defaultProps: {
      icon: <BoxBlankIcon />,
      checkedIcon: <BoxCheckedIcon />,
      indeterminateIcon: <BoxIndeterminateIcon />,
    },
  },
  MuiRadio: {
    defaultProps: {
      icon: <CircleBlankIcon />,
      checkedIcon: <CircleCheckedIcon />,
    },
  },
  MuiSelect: {
    defaultProps: { IconComponent: ChevronDownIcon },
  },
  MuiAutocomplete: {
    defaultProps: {
      popupIcon: <ChevronDownIcon />,
      clearIcon: <ThinCloseIcon fontSize="small" />,
    },
  },
  MuiChip: {
    defaultProps: { deleteIcon: <ThinCloseIcon /> },
  },
};

export const recipes: DensityRecipe[] = [
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
