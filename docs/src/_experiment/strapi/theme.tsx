import { CSSObject } from '@mui/system';
import { createGetCssVar, JoyThemeInput } from '@mui/joy/styles';

declare module '@mui/joy/styles' {
  interface PaletteRange {
    150: string;
    0: string;
  }

  interface Palette {
    outlinedFocusBorder: string;
  }

  interface TypographySystem {
    header1: React.CSSProperties;
    header2: React.CSSProperties;
    header3: React.CSSProperties;
    subtitle: React.CSSProperties;
    body: React.CSSProperties;
    bodyHighlight: React.CSSProperties;
    buttonText: React.CSSProperties;
    smallText: React.CSSProperties;
    smallButtonText: React.CSSProperties;
    tableLabel: React.CSSProperties;
  }

  interface VariantLight {
    secondary: CSSObject;
    alternate: CSSObject;
  }

  interface VariantContained {
    secondary: CSSObject;
    alternate: CSSObject;
  }
}

declare module '@mui/joy/Sheet' {
  interface SheetPropsColorOverrides {
    secondary: true;
    alternate: true;
  }
}

const getCssVar = createGetCssVar();

const strapiTheme: JoyThemeInput = {
  colorSchemes: {
    light: {
      palette: {
        primary: {
          700: '#271FE0',
          600: '#4945FF',
          500: '#7B79FF',
          200: '#D9D8FF',
          100: '#F0F0FF',
          lightColor: getCssVar('palette-primary-600'),
          lightActiveBg: getCssVar('palette-primary-200'),
          containedHoverBg: getCssVar('palette-primary-500'),
          containedActiveBg: getCssVar('palette-primary-700'),
          outlinedColor: getCssVar('palette-primary-600'),
          outlinedBorder: getCssVar('palette-primary-200'),
          outlinedBg: getCssVar('palette-primary-100'),
          outlinedHoverBorder: getCssVar('palette-primary-200'),
          outlinedHoverBg: getCssVar('palette-neutral-0'),
          outlinedActiveColor: getCssVar('palette-primary-700'),
          outlinedActiveBg: getCssVar('palette-neutral-0'),
        },
        success: {
          700: '#2F6846',
          600: '#328048',
          500: '#5CB176',
          200: '#C6F0C2',
          100: '#EAFBE7',
          containedHoverBg: getCssVar('palette-success-500'),
          containedActiveBg: getCssVar('palette-success-700'),
          outlinedColor: getCssVar('palette-success-600'),
          outlinedBorder: getCssVar('palette-success-200'),
          outlinedBg: getCssVar('palette-success-100'),
          outlinedHoverBorder: getCssVar('palette-success-200'),
          outlinedHoverBg: getCssVar('palette-neutral-0'),
          outlinedActiveColor: getCssVar('palette-success-700'),
          outlinedActiveBg: getCssVar('palette-neutral-0'),
        },
        danger: {
          700: '#B72B1A',
          600: '#D02B20',
          500: '#EE5E52',
          200: '#F5C0B8',
          100: '#FCECEA',
          containedHoverBg: getCssVar('palette-danger-500'),
          containedActiveBg: getCssVar('palette-danger-700'),
          outlinedColor: getCssVar('palette-danger-600'),
          outlinedBorder: getCssVar('palette-danger-200'),
          outlinedBg: getCssVar('palette-danger-100'),
          outlinedHoverBorder: getCssVar('palette-danger-200'),
          outlinedHoverBg: getCssVar('palette-neutral-0'),
          outlinedActiveBg: getCssVar('palette-neutral-0'),
          outlinedActiveColor: getCssVar('palette-danger-700'),
        },
        warning: {
          700: '#BE5D01',
          600: '#D9822F',
          500: '#F29D41',
          200: '#FAE7B9',
          100: '#FDF4DC',
        },
        // 💡 custom palette, it is not required to add all tokens
        secondary: {
          700: '#006096',
          600: '#0C75AF',
          500: '#66B7F1',
          200: '#B8E1FF',
          100: '#EAF5FF',
          lightBg: 'var(--joy-palette-secondary-100)',
          lightColor: 'var(--joy-palette-secondary-700)',
          containedBg: 'var(--joy-palette-secondary-500)',
          containedColor: '#fff',
        },
        // 💡 custom palette, it is not required to add all tokens
        alternate: {
          700: '#8312D1',
          600: '#9736E8',
          500: '#AC73E6',
          200: '#E0C1F4',
          100: '#F6ECFC',
          lightBg: 'var(--joy-palette-alternate-100)',
          lightColor: 'var(--joy-palette-alternate-700)',
          containedBg: 'var(--joy-palette-alternate-500)',
          containedColor: '#fff',
        },
        neutral: {
          900: '#212134',
          800: '#32324D',
          700: '#4A4A6A',
          600: '#666687',
          500: '#8E8EA9',
          400: '#A5A5BA',
          300: '#C0C0CF',
          200: '#DCDCE4',
          150: '#EAEAEF',
          100: '#F6F6F9',
          0: '#FFFFFF',
          outlinedColor: getCssVar('palette-neutral-800'),
          outlinedBorder: getCssVar('palette-neutral-200'),
          outlinedHoverBorder: undefined,
          outlinedHoverBg: getCssVar('palette-neutral-100'),
          outlinedActiveBg: getCssVar('palette-neutral-150'),
          outlinedDisabledColor: getCssVar('palette-neutral-600'),
          outlinedDisabledBorder: getCssVar('palette-neutral-200'),
          outlinedDisabledBg: getCssVar('palette-neutral-150'),
        },
        background: {
          level1: getCssVar('palette-neutral-100'),
          level2: getCssVar('palette-neutral-150'),
        },
        text: {
          primary: getCssVar('palette-neutral-800'),
        },
        divider: getCssVar('palette-neutral-100'),
        outlinedFocusBorder: getCssVar('palette-neutral-0'),
      },
    },
    dark: {
      palette: {
        neutral: {
          outlinedDisabledColor: getCssVar('palette-neutral-500'),
          outlinedDisabledBorder: getCssVar('palette-neutral-700'),
          outlinedDisabledBg: getCssVar('palette-neutral-800'),
        },
      },
    },
  },
  focus: {
    // 💡 global focus customization
    default: {
      '&.Mui-focusVisible': {
        outline: '2px solid',
        outlineOffset: '2px',
        outlineColor: getCssVar('palette-primary-700'),
      },
    },
  },
  variants: {
    // 💡 Allow custom properties to variant
    // use case: Button
    outlinedActive: {
      primary: {
        '&:active': {
          borderColor: 'currentColor',
        },
      },
      success: {
        '&:active': {
          borderColor: 'currentColor',
        },
      },
      danger: {
        '&:active': {
          borderColor: 'currentColor',
        },
      },
    },
    // 💡 Able to use variant with custom color
    // use case: IconFrame
    light: {
      secondary: {
        color: 'var(--joy-palette-secondary-lightColor)',
        backgroundColor: 'var(--joy-palette-secondary-lightBg)',
      },
      alternate: {
        color: 'var(--joy-palette-alternate-lightColor)',
        backgroundColor: 'var(--joy-palette-alternate-lightBg)',
      },
    },
    contained: {
      secondary: {
        color: 'var(--joy-palette-secondary-containedColor)',
        backgroundColor: 'var(--joy-palette-secondary-containedBg)',
      },
      alternate: {
        color: 'var(--joy-palette-alternate-containedColor)',
        backgroundColor: 'var(--joy-palette-alternate-containedBg)',
      },
    },
  },
  fontSize: {
    xs: '0.7rem',
    sm: '0.75rem',
    md: '0.875rem',
    lg: '1rem',
  },
  // 💡 custom typography
  typography: {
    header1: {
      fontFamily: getCssVar('fontFamily-body'),
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: '2.5rem',
      color: getCssVar('palette-text-primary'),
    },
    header2: {
      fontFamily: getCssVar('fontFamily-body'),
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: '1.375rem',
      color: getCssVar('palette-text-primary'),
    },
    header3: {
      fontFamily: getCssVar('fontFamily-body'),
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: '1.25rem',
      color: getCssVar('palette-text-primary'),
    },
    subtitle: {
      fontFamily: getCssVar('fontFamily-body'),
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: '1.5rem',
      color: getCssVar('palette-text-secondary'),
    },
    body: {
      fontFamily: getCssVar('fontFamily-body'),
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: '1rem',
      color: getCssVar('palette-text-primary'),
    },
    bodyHighlight: {
      fontFamily: getCssVar('fontFamily-body'),
      fontWeight: 500,
      fontSize: '0.875rem',
      lineHeight: '1rem',
      color: getCssVar('palette-text-primary'),
    },
    buttonText: {
      fontFamily: getCssVar('fontFamily-body'),
      fontWeight: 600,
      fontSize: '0.875rem',
      lineHeight: '1rem',
    },
    smallText: {
      fontFamily: getCssVar('fontFamily-body'),
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: '1rem',
      color: getCssVar('palette-text-secondary'),
    },
    smallButtonText: {
      fontFamily: getCssVar('fontFamily-body'),
      fontWeight: 600,
      fontSize: '0.75rem',
      lineHeight: '1rem',
    },
    tableLabel: {
      fontFamily: getCssVar('fontFamily-body'),
      fontWeight: 600,
      fontSize: '0.7rem',
      lineHeight: '1rem',
      color: getCssVar('palette-text-primary'),
      textTransform: 'uppercase',
    },
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          borderColor: getCssVar('palette-neutral-300'),
          '&.Mui-checked': {
            '&:hover': {
              backgroundColor: getCssVar('palette-primary-containedBg'),
            },
          },
          '&.Mui-disabled': {
            borderColor: getCssVar('palette-neutral-300'),
            backgroundColor: getCssVar('palette-neutral-200'),
          },
          '[data-mui-color-scheme="dark"]': {
            borderColor: getCssVar('palette-neutral-500'),
            '&.Mui-disabled': {
              borderColor: getCssVar('palette-neutral-500'),
              backgroundColor: getCssVar('palette-neutral-700'),
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(!ownerState.square && {
            '--Button-gutter': '1rem',
          }),
          borderRadius: '4px',
          ...theme.typography.buttonText,
          ...(ownerState.size === 'sm' && {
            minHeight: 32,
            ...theme.typography.smallButtonText,
          }),
          ...(ownerState.size === 'md' && {
            '--Icon-fontSize': '1.25rem',
            minHeight: 36,
          }),
          ...(ownerState.size === 'lg' && {
            minHeight: 40,
          }),
          '&.Mui-focusVisible': {
            ...(ownerState.variant === 'outlined' && {
              // @ts-ignore This type error only occur in our repository due to multiple module augmentation
              borderColor: theme.vars.palette.outlinedFocusBorder,
            }),
          },
          ...(ownerState.disabled && {
            ...theme.variants.outlined.neutral,
            ...theme.variants.outlinedDisabled.neutral,
          }),
          ...(ownerState.variant === 'outlined' &&
            ownerState.color === 'neutral' && {
              backgroundColor: getCssVar('palette-background-body'),
            }),
        }),
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          borderRadius: theme.vars.radius.xs,
          ...(ownerState.variant === 'outlined' &&
            ownerState.color === 'neutral' && {
              backgroundColor: getCssVar('palette-background-body'),
            }),
        }),
      },
    },
    MuiTypography: {
      defaultProps: {
        levelMapping: {
          header1: 'h1',
          header2: 'h2',
          header3: 'h3',
          subtitle: 'p',
          body: 'p',
          bodyHighlight: 'p',
          buttonText: 'p',
          smallText: 'p',
          smallButtonText: 'p',
          tableLabel: 'p',
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.size === 'md' && {
            '--Input-gutter': '1rem',
          }),
          '--Input-focusedHighlight':
            theme.vars.palette[
              ownerState.color === 'neutral' ? 'primary' : ownerState.color || 'primary'
            ]?.[600],
          borderRadius: getCssVar('radius-xs'),
          color: theme.vars.palette.text.primary,
          backgroundColor: theme.vars.palette.background.body,
          ...(ownerState.color === 'danger' && {
            borderColor: theme.vars.palette.danger[600],
            ...(ownerState.variant === 'outlined' && {
              '&:hover': {
                borderColor: theme.vars.palette.danger[600],
                backgroundColor: theme.vars.palette.danger.textHoverBg,
              },
            }),
          }),
          '&.Mui-disabled': {
            '--Input-placeholderOpacity': 1,
          },
        }),
        endAdornment: ({ ownerState }) => ({
          ...(ownerState.size === 'md' && {
            marginRight: '-0.75rem',
          }),
        }),
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          gap: '0.25rem',
          fontSize: getCssVar('fontSize-xs'),
          fontWeight: 600,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          borderRadius: getCssVar('radius-xs'),
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          [`&.Mui-error`]: {
            '--FormHelperText-color': theme.vars.palette.danger[600],
          },
          '&.Mui-disabled': {
            '--FormLabel-color': theme.vars.palette.text.primary,
            '--FormHelperText-color': theme.vars.palette.text.secondary,
          },
        }),
      },
    },
    MuiSwitch: {
      defaultProps: {
        color: 'danger',
      },
      styleOverrides: {
        root: ({ theme }) => ({
          '--Switch-track-width': '40px',
          '--Switch-track-thumb': '16px',
          '--Switch-track-background': theme.vars.palette.danger[500],
          [`&.Mui-checked`]: {
            '--Switch-track-background': theme.vars.palette.success[500],
            '&:hover': {
              '--Switch-track-background': theme.vars.palette.success[500],
            },
          },
        }),
      },
    },
  },
};

export default strapiTheme;
