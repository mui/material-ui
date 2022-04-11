import { JoyThemeInput } from '@mui/joy/styles';

declare module '@mui/joy/styles' {
  interface TypographySystemOverrides {
    metadata: true;
    body: true;
    subjectTitle: true;
    header: true;
    paneHeader: true;
    pageTitle: true;
    greetingTitle: true;
    heroTitle: true;
  }

  interface Palette {
    grey: {
      10: string;
      20: string;
      30: string;
      40: string;
      50: string;
      60: string;
      90: string;
      110: string;
      130: string;
      150: string;
      160: string;
      190: string;
    };
  }
}

const grey = {
  10: '#FAF9F8',
  20: '#F3F2F1',
  30: '#EDEBE9',
  40: '#E1DFDD',
  50: '#D2D0CE',
  60: '#C8C6C4',
  90: '#A19F9D',
  110: '#8A8886',
  130: '#605E5C',
  150: '#3B3A39',
  160: '#323130',
  190: '#201F1E',
};

const primary = {
  main: '#0078D4',
  lighterAlt: '#EFF6FC',
  lighther: '#DEECF9',
  light: '#C7E0F4',
  tertiary: '#2B88D8',
  darkAlt: '#106EBE',
  dark: '#005A9E',
  darker: '#004578',
};

const fluentTheme: JoyThemeInput = {
  colorSchemes: {
    light: {
      palette: {
        primary: {
          500: primary.main,
          textColor: primary.main,
          textDisabledColor: 'var(--joy-palette-grey-90)',
          containedBg: primary.main,
          containedHoverBg: primary.darkAlt,
          containedActiveBg: primary.dark,
          containedDisabledBg: 'var(--joy-palette-grey-20)',
          containedDisabledColor: 'var(--joy-palette-grey-90)',
          lightColor: primary.main,
          lightBg: undefined,
          lightHoverBg: 'var(--joy-palette-grey-20)',
          lightActiveBg: 'var(--joy-palette-grey-30)',
        },
        danger: {
          500: '#A4262C',
          outlinedBorder: 'var(--joy-palette-danger-500)',
          outlinedHoverBorder: undefined,
        },
        neutral: {
          textColor: 'var(--joy-palette-grey-190)',
          textHoverColor: primary.main,
          textHoverBg: undefined,
          textActiveBg: undefined,
          textDisabledColor: 'var(--joy-palette-grey-90)',
          textActiveColor: 'var(--joy-palette-grey-190)',
          lightColor: 'var(--joy-palette-grey-190)',
          lightBg: undefined,
          lightHoverColor: undefined,
          lightDisabledColor: 'var(--joy-palette-grey-90)',
          lightHoverBg: 'var(--joy-palette-grey-20)',
          lightActiveBg: 'var(--joy-palette-grey-30)',
          outlinedBg: '#fff',
          outlinedColor: 'var(--joy-palette-grey-190)',
          outlinedDisabledBg: 'var(--joy-palette-grey-20)',
          outlinedDisabledColor: 'var(--joy-palette-grey-90)',
          outlinedBorder: 'var(--joy-palette-grey-110)',
          outlinedHoverBg: 'var(--joy-palette-grey-20)',
          outlinedHoverBorder: undefined,
          outlinedActiveBg: 'var(--joy-palette-grey-30)',
        },
        grey,
        focusVisible: 'var(--joy-palette-grey-160)',
        text: {
          primary: 'var(--joy-palette-grey-190)',
          secondary: 'var(--joy-palette-grey-130)',
          tertiary: 'var(--joy-palette-grey-90)',
        },
      },
    },
  },
  focus: {
    default: {
      '&.Mui-focusVisible, &:focus-visible': {
        outlineOffset: -1,
        outline: '1px solid',
        '&[class*="-variantContained"]': {
          outlineColor: '#fff',
        },
      },
    },
  },
  fontFamily: {
    body: `'Segoe UI Variable', sans-serif`,
  },
  fontSize: {
    xs: '0.625rem',
    sm: '0.75rem',
    md: '0.875rem',
  },
  fontWeight: {
    lg: 600,
  },
  typography: {
    metadata: {
      fontSize: 12,
      lineHeight: '16px',
    },
    body: {
      fontSize: 14,
      lineHeight: '20px',
    },
    subjectTitle: {
      fontSize: 16,
      lineHeight: '22px',
    },
    header: {
      fontSize: 18,
      lineHeight: '24px',
    },
    paneHeader: {
      fontSize: 20,
      lineHeight: '28px',
    },
    pageTitle: {
      fontSize: 28,
      lineHeight: '36px',
    },
    greetingTitle: {
      fontSize: 32,
      lineHeight: '40px',
    },
    heroTitle: {
      fontSize: 42,
      lineHeight: '52px',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          '--Button-iconOffsetStep': 0,
          '&.Mui-disabled': {
            border: 'none',
          },

          ...((ownerState.variant === 'contained' || ownerState.variant === 'outlined') && {
            '&.Mui-focusVisible, &:focus-visible': {
              outlineOffset: '-3px',
            },
          }),
          ...(ownerState.size === 'md' && {
            '--Icon-fontSize': '20px',
            ...theme.typography.body,
            fontWeight: theme.vars.fontWeight.lg,
            minHeight: '32px',
            borderRadius: '2px',
            paddingLeft: 20,
            paddingRight: 20,
          }),
          ...(ownerState.variant === 'outlined' && {
            ...(ownerState.color === 'neutral' && {
              '& [class$="Decorator"]': {
                color: theme.vars.palette.grey[130],
              },
            }),
          }),
          ...((ownerState.variant === 'light' || ownerState.variant === 'text') && {
            borderRadius: 0,
            fontWeight: 400,
          }),
          ...(ownerState.variant === 'light' && {
            ...(ownerState.size === 'md' && {
              ...((ownerState.startIcon || ownerState.endIcon) && {
                paddingLeft: '8px',
                paddingRight: '8px',
              }),
            }),
          }),
          ...(ownerState.variant === 'text' && {
            ...(ownerState.size === 'md' && {
              paddingLeft: '6px',
              paddingRight: '6px',
            }),
            '&:hover:not(:active)': {
              '& .MuiButton-startIcon': {
                color: 'inherit',
              },
            },
          }),
        }),
        startIcon: ({ ownerState }) => ({
          ...(ownerState.variant === 'light' && {
            ...(ownerState.color === 'neutral' && {
              color: primary.main,
            }),
          }),
          ...(ownerState.variant === 'text' && {
            ...(ownerState.color === 'neutral' && {
              color: primary.dark,
            }),
          }),
        }),
        endIcon: ({ ownerState, theme }) => ({
          ...(ownerState.variant === 'light' && {
            ...(ownerState.color === 'neutral' && {
              '--Icon-color': theme.vars.palette.grey[130],
            }),
          }),
          ...(ownerState.variant === 'text' && {
            ...(ownerState.color === 'neutral' && {
              '--Icon-color': theme.vars.palette.grey[130],
            }),
          }),
        }),
      },
    },
    MuiIconButton: {
      defaultProps: {
        variant: 'light',
        color: 'primary',
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          borderRadius: 0,
          '&.Mui-disabled': {
            color: theme.vars.palette.grey[60],
          },
          ...(ownerState.size === 'md' && {
            '--Icon-fontSize': '20px',
            '--IconButton-size': '32px',
          }),
          ...(ownerState.size === 'lg' && {
            '--IconButton-size': '44px',
            '--Icon-fontSize': '20px',
          }),
          ...(ownerState.variant !== 'contained' &&
            ownerState.color === 'neutral' && {
              color: theme.vars.palette.grey[130],
            }),
        }),
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          '&.Mui-focusVisible, &:focus-visible': {
            outlineOffset: '2px',
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          borderRadius: 2,
          paddingTop: 0,
          paddingBottom: 0,
          '--Input-placeholderOpacity': 1,
          '--Input-focusedThickness': '1px',
          ...(ownerState.size === 'md' && {
            '--Icon-fontSize': '20px',
            '--Input-gap': '8px',
            minHeight: 32,
          }),
          ...(ownerState.variant === 'outlined' && {
            color: theme.vars.palette.text.primary,
            backgroundColor: theme.vars.palette.background.body,
          }),
          '&.Mui-focused': {
            backgroundColor: theme.vars.palette.background.body,
          },
          '&:hover': {
            backgroundColor: theme.vars.palette.background.body,
            ...(ownerState.color === 'neutral' && {
              borderColor: theme.vars.palette.grey[160],
            }),
          },
          '&.Mui-disabled': {
            border: 'none',
            backgroundColor: theme.vars.palette.grey[30],
          },
        }),
        startDecorator: ({ theme, ownerState }) => ({
          ...(!ownerState.disabled && {
            color: theme.vars.palette.primary.textColor,
          }),
        }),
        endDecorator: ({ ownerState }) => ({
          ...(ownerState.size === 'md' && {
            marginRight: '-12px',
          }),
        }),
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: () => ({
          '& .Mui-focused': {
            '--Input-focusedThickness': '2px',
          },
        }),
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
    MuiSwitch: {
      defaultProps: {
        variant: 'outlined',
        color: 'neutral',
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          borderRadius: 0,
          ...(ownerState.variant === 'outlined' &&
            ownerState.color === 'neutral' && {
              '--Switch-thumb-background': theme.vars.palette.grey[130],
              '&.Mui-disabled': {
                '--Switch-track-background': '#fff',
                '--Switch-thumb-background': theme.vars.palette.grey[60],
                '--Switch-track-borderColor': theme.vars.palette.grey[60],
              },
            }),
          '&.Mui-focusVisible, &:focus-visible': {
            outlineOffset: '0px',
          },
          ...(ownerState.size === 'md' && {
            '--Switch-track-width': '40px',
            '--Switch-track-height': '20px',
            '--Switch-thumb-size': '12px',
          }),
          '&.Mui-checked': {
            '--variant-outlinedBorderWidth': '0px',
            '--Switch-track-background': theme.vars.palette.primary.containedBg,
            '--Switch-thumb-background': '#fff',
            '&:hover': {
              '--Switch-track-background': theme.vars.palette.primary.containedHoverBg,
              '--Switch-thumb-background': '#fff',
            },
            '&.Mui-disabled': {
              '--Switch-track-background': theme.vars.palette.grey[60],
              '--Switch-thumb-background': theme.vars.palette.grey[20],
            },
          },
        }),
      },
    },
  },
};

export default fluentTheme;
