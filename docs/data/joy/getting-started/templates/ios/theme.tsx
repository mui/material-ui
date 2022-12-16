import { CSSObject } from '@mui/system';
import { extendTheme } from '@mui/joy/styles';
import type {} from '@mui/joy/IconButton';
import type {} from '@mui/joy/Input';
import type {} from '@mui/joy/Tabs';
import type {} from '@mui/joy/TabList';
import { tabClasses } from '@mui/joy/Tab';
import type {} from '@mui/joy/Switch';
import { sliderClasses } from '@mui/joy/Slider';
import type {} from '@mui/joy/LinearProgress';

interface IosMaterial {
  materials: {
    thick: CSSObject;
    regular: CSSObject;
    thin: CSSObject;
    ultrathin: CSSObject;
    navbar: CSSObject;
    toolbar: CSSObject;
  };
}

declare module '@mui/joy/Tabs' {
  interface TabsPropsVariantOverrides {
    ios: true;
    iosBar: true;
  }
}

declare module '@mui/joy/TabList' {
  interface TabListPropsVariantOverrides {
    ios: true;
    iosBar: true;
  }
}

declare module '@mui/joy/Tab' {
  interface TabPropsVariantOverrides {
    ios: true;
    iosBar: true;
  }
}

declare module '@mui/joy/Button' {
  interface ButtonPropsVariantOverrides {
    label: true;
  }
}

declare module '@mui/joy/IconButton' {
  interface IconButtonPropsVariantOverrides {
    ios: true;
  }
}

declare module '@mui/joy/Input' {
  interface InputPropsVariantOverrides {
    ios: true;
  }
}

declare module '@mui/joy/Switch' {
  interface SwitchPropsVariantOverrides {
    ios: true;
  }
}

declare module '@mui/joy/Slider' {
  interface SliderPropsVariantOverrides {
    ios: true;
  }
}

declare module '@mui/joy/LinearProgress' {
  interface LinearProgressPropsVariantOverrides {
    ios: true;
  }
}

declare module '@mui/joy/styles' {
  interface TypographySystemOverrides {
    /* To remove the default typography system from the types, uncomment the section below. */
    // display1: false;
    // display2: false;
    // h1: false;
    // h2: false;
    // h3: false;
    // h4: false;
    // h5: false;
    // h6: false;
    // body1: false;
    // body2: false;
    // body3: false;
    // body4: false;
    // body5: false;

    largeTitle: true;
    title1: true;
    title2: true;
    title3: true;
    headline: true;
    body: true;
    callout: true;
    subheadline: true;
    footnote: true;
    caption1: true;
    caption2: true;
  }

  interface Palette {
    system: {
      red: string;
      orange: string;
      yellow: string;
      green: string;
      mint: string;
      teal: string;
      cyan: string;
      blue: string;
      indigo: string;
      purple: string;
      pink: string;
      brown: string;
      black: string;
      grey: string;
      grey2: string;
      grey3: string;
      grey4: string;
      grey5: string;
      grey6: string;
      white: string;
      userAccent: string;
    };
    fill: {
      primary: string;
      secondary: string;
      tertiary: string;
      quarternary: string;
    };
    label: {
      primary: string;
      secondary: string;
      tertiary: string;
      quarternary: string;
    };
    groupedBackground: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    separator: {
      opaque: string;
      nonOpaque: string;
    };
  }

  interface PaletteBackground {
    primary: string;
    secondary: string;
    tertiary: string;
  }

  interface Theme extends IosMaterial {}

  interface CssVarsThemeOptions extends IosMaterial {}
}

export default extendTheme({
  cssVarPrefix: 'ios',
  colorSchemes: {
    light: {
      palette: {
        primary: {
          plainColor: 'var(--ios-palette-system-blue)',
          plainHoverBg: undefined,
          plainActiveBg: 'var(--ios-palette-fill-tertiary)',
          plainDisabledColor: 'rgba(60 60 67 / 0.3)',
          softColor: 'var(--ios-palette-system-blue)',
          softHoverColor: undefined,
          softBg: 'rgba(0 122 255 / 0.15)',
          softHoverBg: undefined,
          softActiveBg: 'rgba(0 122 255 / 0.2)',
          softDisabledBg: 'rgba(120 120 128 / 0.16)',
          softDisabledColor: 'rgba(60 60 67 / 0.3)',
          solidBg: 'var(--ios-palette-system-blue)',
          solidHoverBg: undefined,
          solidActiveBg: 'rgba(0 122 255 / 0.8)',
          solidDisabledBg: 'rgba(120 120 128 / 0.16)',
          solidDisabledColor: 'rgba(60 60 67 / 0.3)',
          mainChannel: '0 122 255',
        },
        neutral: {
          plainColor: 'var(--ios-palette-label-primary)',
          plainHoverColor: undefined,
          plainHoverBg: undefined,
          plainActiveBg: 'var(--ios-palette-fill-tertiary)',
          plainDisabledColor: 'rgba(60 60 67 / 0.3)',
          softColor: 'var(--ios-palette-system-blue)',
          softHoverColor: undefined,
          softBg: 'rgba(120 120 128 / 0.16)',
          softDisabledBg: 'rgba(120 120 128 / 0.16)',
          softDisabledColor: 'rgba(60 60 67 / 0.3)',
          softHoverBg: undefined,
          softActiveBg: 'rgba(120 120 128 / 0.32)',
        },
        danger: {
          plainColor: 'var(--ios-palette-system-red)',
          solidBg: 'var(--ios-palette-system-red)',
        },
        system: {
          red: '#FF3B30',
          orange: '#FF9500',
          yellow: '#FFCC00',
          green: '#34C759',
          mint: '#00C7BE',
          teal: '#30B0C7',
          cyan: '#32ADE6',
          blue: '#007AFF',
          indigo: '#5856D6',
          purple: '#AF52DE',
          pink: '#FF2D55',
          brown: '#A2845E',
          black: '#000000',
          grey: '#8E8E93',
          grey2: '#AEAEB2',
          grey3: '#C7C7CC',
          grey4: '#D1D1D6',
          grey5: '#E5E5EA',
          grey6: '#F2F2F7',
          white: '#FFFFFF',
          userAccent: '#0A7AFF',
        },
        background: {
          // Joy specific
          body: 'var(--ios-palette-system-grey4)',
          // ios specific
          primary: '#FFFFFF',
          secondary: '#F2F2F7',
          tertiary: '#FFFFFF',
        },
        groupedBackground: {
          primary: '#F2F2F7',
          secondary: '#FFFFFF',
          tertiary: '#F2F2F7',
        },
        label: {
          primary: '#000000',
          secondary: 'rgba(60 60 67 / .60)',
          tertiary: 'rgba(60 60 67 / .30)',
          quarternary: 'rgba(60 60 67 / .18)',
        },
        fill: {
          primary: 'rgba(120 120 128 / .20)',
          secondary: 'rgba(120 120 128 / .16)',
          tertiary: 'rgba(120 120 128 / .12)',
          quarternary: 'rgba(120 120 128 / .8)',
        },
        separator: {
          opaque: '#C6C6C8',
          nonOpaque: 'rgba(60 60 67 / .36)',
        },
        focusVisible: 'var(--ios-palette-system-userAccent)',
      },
    },
    dark: {
      palette: {
        primary: {
          plainColor: 'var(--ios-palette-system-blue)',
          plainHoverBg: undefined,
          plainActiveBg: 'var(--ios-palette-fill-tertiary)',
          plainDisabledColor: 'rgba(235 235 245 / 0.3)',
          softColor: 'var(--ios-palette-system-blue)',
          softHoverColor: undefined,
          softBg: 'rgba(16 109 220 / 0.3)',
          softHoverBg: undefined,
          softActiveBg: 'rgba(16 109 220 / 0.6)',
          softDisabledBg: 'rgba(120 120 128 / 0.32)',
          softDisabledColor: 'rgba(235 235 245 / 0.3)',
          solidBg: 'var(--ios-palette-system-blue)',
          solidHoverBg: undefined,
          solidActiveBg: 'rgba(0 122 255 / 0.8)',
          solidDisabledBg: 'rgba(120 120 128 / 0.32)',
          solidDisabledColor: 'rgba(235 235 245 / 0.3)',
          mainChannel: '10 132 255',
        },
        neutral: {
          plainColor: 'var(--ios-palette-label-primary)',
          plainHoverColor: undefined,
          plainHoverBg: undefined,
          plainActiveBg: 'var(--ios-palette-fill-tertiary)',
          plainDisabledColor: 'rgba(235 235 245 / 0.3)',
          softColor: 'var(--ios-palette-system-blue)',
          softHoverColor: undefined,
          softBg: 'rgba(120 120 128 / 0.32)',
          softDisabledBg: 'rgba(120 120 128 / 0.32)',
          softDisabledColor: 'rgba(235 235 245 / 0.3)',
          softHoverBg: undefined,
          softActiveBg: 'rgba(120 120 128 / 0.6)',
        },
        danger: {
          plainColor: 'var(--ios-palette-system-red)',
          solidBg: 'var(--ios-palette-system-red)',
        },
        system: {
          red: '#FF453A',
          orange: '#FF9F0A',
          yellow: '#FFD60A',
          green: '#30D158',
          mint: '#63E6E2',
          teal: '#40CBE0',
          cyan: '#64D2FF',
          blue: '#0A84FF',
          indigo: '#5E5CE6',
          purple: '#BF5AF2',
          pink: '#FF375F',
          brown: '#AC8E68',
          black: '#000000',
          grey: '#8E8E93',
          grey2: '#636366',
          grey3: '#48484A',
          grey4: '#3A3A3C',
          grey5: '#2C2C2E',
          grey6: '#1C1C1E',
          white: '#FFFFFF',
          userAccent: '#0084FF',
        },
        background: {
          primary: '#000000',
          secondary: '#1C1C1E',
          tertiary: '#2C2C2E',
        },
        groupedBackground: {
          primary: '#000000',
          secondary: '#1C1C1E',
          tertiary: '#2C2C2E',
        },
        label: {
          primary: '#ffffff',
          secondary: 'rgba(235 235 245 / .60)',
          tertiary: 'rgba(235 235 245 / .30)',
          quarternary: 'rgba(235 235 245 / .18)',
        },
        fill: {
          primary: 'rgba(120 120 128 / .36)',
          secondary: 'rgba(120 120 128 / .32)',
          tertiary: 'rgba(120 120 128 / .24)',
          quarternary: 'rgba(120 120 128 / .18)',
        },
        separator: {
          opaque: '#38383A',
          nonOpaque: 'rgba(84 84 88 / .65)',
        },
      },
    },
  },
  fontFamily: {
    body: '"SF Pro", var(--ios-fontFamily-fallback)',
  },
  fontSize: {
    xl3: '34px',
    xl2: '28px',
    xl: '22px',
    lg: '20px',
    md: '17px',
    sm: '16px',
    xs: '15px',
    xs2: '14px',
    xs3: '12px',
  },
  materials: {
    thick: {
      background: `linear-gradient(rgba(255 255 255 / 0.78), rgba(255 255 255 / 0.78))
        ,linear-gradient(rgba(255 255 255 / 0.34), rgba(255 255 255 / 0.34))`,
      backdropFilter: 'blur(50px)',
      [`[data-joy-color-scheme="dark"] &`]: {
        background: 'rgba(0 0 0 / 0.6)',
      },
    },
    regular: {
      background: `linear-gradient(rgba(255 255 255 / 0.39), rgba(255 255 255 / 0.39))
      ,linear-gradient(rgba(255 255 255 / 0.27), rgba(255 255 255 / 0.27))`,
      backdropFilter: 'blur(50px) saturate(121%)',
      [`[data-joy-color-scheme="dark"] &`]: {
        background: 'rgba(0 0 0 / 0.41)',
        backdropFilter: 'blur(50px)',
      },
    },
    thin: {
      background: `linear-gradient(rgba(255 255 255 / 0.51), rgba(255 255 255 / 0.51))
      ,linear-gradient(rgba(255 255 255 / 0.05), rgba(255 255 255 / 0.05))`,
      backdropFilter: 'blur(50px) saturate(145%)',
      [`[data-joy-color-scheme="dark"] &`]: {
        background: 'rgba(0 0 0 / 0.26)',
        backdropFilter: 'blur(50px)',
      },
    },
    ultrathin: {
      background: `linear-gradient(rgba(255 255 255 / 0.12), rgba(255 255 255 / 0.12))
      ,linear-gradient(rgba(255 255 255 / 0.11), rgba(255 255 255 / 0.11))`,
      backdropFilter: 'blur(30px)',
      [`[data-joy-color-scheme="dark"] &`]: {
        background: 'rgba(0 0 0 / 0.1)',
        backdropFilter: 'blur(50px)',
      },
    },
    navbar: {
      backgroundColor: 'rgba(249 249 249 / 0.94)',
      boxShadow: '0 0.33px 0 0 rgba(0 0 0 / 0.3)',
      backdropFilter: 'blur(20px)',
      [`[data-joy-color-scheme="dark"] &`]: {
        backgroundColor: 'rgba(29 29 29 / 0.94)',
        boxShadow: '0 0.33px 0 0 rgba(255 255 255 / 0.15)',
        backdropFilter: 'blur(20px) saturate(130%)',
      },
    },
    toolbar: {
      backgroundColor: 'rgba(249 249 249 / 0.94)',
      boxShadow: '0 -0.5px 0 0 rgba(0 0 0 / 0.3)',
      backdropFilter: 'blur(20px)',
      [`[data-joy-color-scheme="dark"] &`]: {
        backgroundColor: 'rgba(22 22 22 / 0.8)',
        boxShadow: '0 -0.5px 0 0 rgba(255 255 255 / 0.16)',
        backdropFilter: 'blur(20px) saturate(130%)',
      },
    },
  },
  unstable_sxConfig: {
    material: {
      style: (props) => props.theme.materials?.[props.material],
    },
  },
  typography: {
    // @ts-ignore
    display1: undefined,
    display2: undefined,
    h1: undefined,
    h2: undefined,
    h3: undefined,
    h4: undefined,
    h5: undefined,
    h6: undefined,
    body1: undefined,
    body2: undefined,
    body3: undefined,
    body4: undefined,
    body5: undefined,
    largeTitle: {
      fontSize: '34px',
      lineHeight: '41px',
    },
    title1: {
      fontSize: '28px',
      lineHeight: '34px',
    },
    title2: {
      fontSize: '22px',
      lineHeight: '28px',
    },
    title3: {
      fontSize: '20px',
      lineHeight: '24px',
    },
    headline: {
      fontSize: '17px',
      lineHeight: '22px',
      fontWeight: '600',
    },
    body: {
      fontSize: '17px',
      lineHeight: '22px',
    },
    callout: {
      fontSize: '16px',
      lineHeight: '22px',
    },
    subheadline: {
      fontSize: '15px',
      lineHeight: '18px',
    },
    footnote: {
      fontSize: '14px',
      lineHeight: '18px',
    },
    caption1: {
      fontSize: '12px',
      lineHeight: '16px',
    },
    caption2: {
      fontSize: '11px',
      lineHeight: '13px',
    },
  },
  components: {
    JoyTypography: {
      defaultProps: {
        level: 'body',
      },
    },
    JoyLink: {
      defaultProps: {
        level: 'body',
      },
    },
    JoyFormLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...theme.typography.body,
          fontWeight: 'normal',
        }),
      },
    },
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => [
          {
            '--Icon-color': 'currentColor',
            ...(ownerState.size === 'sm' && {
              ...theme.typography.subheadline,
              fontWeight: '400',
              paddingInline: '10px',
              minHeight: '28px',
              borderRadius: '14px',
              '--Button-gap': '0px',
            }),
            ...(ownerState.size === 'md' && {
              fontWeight: '400',
              minHeight: '34px',
              paddingInline: '12px',
              borderRadius: '17px',
              '--Button-gap': '2px',
            }),
            ...(ownerState.size === 'lg' && {
              fontWeight: '400',
              minHeight: 50,
              paddingInline: '20px',
              borderRadius: '12px',
              '--Button-gap': '2px',
            }),
          },
          ownerState.variant === 'label' && {
            cursor: 'pointer',
            minHeight: 44,
            paddingInline: '17px',
            color: theme.vars.palette.system.blue,
            '&:active': {
              backgroundColor: theme.vars.palette.fill.tertiary,
            },
          },
        ],
        startDecorator: ({ ownerState }) => ({
          ...(ownerState.size === 'sm' && {
            '--Icon-margin': '0 0 0 -4.2px',
          }),
          ...(ownerState.size === 'md' && {
            '--Icon-margin': '0 0 0 -5.17px',
          }),
          ...(ownerState.size === 'lg' && {
            '--Icon-margin': '0 0 0 -8px',
          }),
        }),
      },
    },
    JoyIconButton: {
      defaultProps: {
        variant: 'ios',
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => [
          {
            '--Icon-color': 'currentColor',
            borderRadius: '50%',
            cursor: 'pointer',
            ...(ownerState.size === 'sm' && {
              '--IconButton-size': '28px',
            }),
          },
          ownerState.variant === 'ios' && {
            ...(ownerState.size === 'md' && {
              '--IconButton-size': '44px',
              '--Icon-fontSize': '28px',
            }),
            ...(ownerState.color === 'neutral' && {
              color: theme.vars.palette.label.secondary,
            }),
            ...(ownerState.color === 'primary' && {
              color: theme.vars.palette.system.blue,
            }),
            '&:active': {
              backgroundColor: theme.vars.palette.fill.tertiary,
            },
          },
        ],
      },
    },
    JoySwitch: {
      defaultProps: {
        variant: 'ios',
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === 'ios' && {
            '--Switch-thumb-size': '27px',
            '--Switch-track-height': '31px',
            '--Switch-track-width': '51px',
            '&:active': {
              '--Switch-thumb-width': '32px',
            },
          }),
        }),
        track: ({ ownerState, theme }) => ({
          ...(ownerState.variant === 'ios' && {
            ...(!ownerState.checked && {
              backgroundColor: theme.vars.palette.fill.secondary,
            }),
            ...(ownerState.checked && {
              backgroundColor: theme.vars.palette.system.green,
            }),
          }),
        }),
        thumb: ({ ownerState }) => ({
          ...(ownerState.variant === 'ios' && {
            backgroundColor: '#fff',
            boxShadow: `0 0 0 0.5px rgba(0 0 0 / .04), 0 3px 8px 0px rgba(0 0 0 / .15), 0 3px 1px 0 rgba(0 0 0 / .06)`,
            transition: 'width 0.2s, left 0.2s',
          }),
        }),
      },
    },
    JoySlider: {
      defaultProps: {
        variant: 'ios',
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === 'ios' && {
            '--Slider-track-size': '4px',
            '--Slider-thumb-size': '28px',
          }),
        }),
        rail: ({ ownerState, theme }) => ({
          ...(ownerState.variant === 'ios' && {
            backgroundColor: theme.vars.palette.fill.primary,
          }),
        }),
        track: ({ ownerState, theme }) => ({
          ...(ownerState.variant === 'ios' && {
            backgroundColor: theme.vars.palette.system.blue,
          }),
        }),
        thumb: ({ ownerState }) => ({
          ...(ownerState.variant === 'ios' && {
            backgroundColor: '#fff',
            boxShadow:
              '0 0.5px 4px 0 rgba(0 0 0 / .12), 0 6px 13px 0 rgba(0 0 0 / .12)',
            [`&.${sliderClasses.focusVisible}`]: {
              outline: 'none',
            },
          }),
        }),
      },
    },
    JoyList: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          '--List-divider-gap': '0px',
          ...(ownerState.size === 'md' && {
            '--List-item-paddingY': '5px',
            '--List-item-paddingX': '16px',
            '--List-item-minHeight': '44px',
          }),
        }),
      },
    },
    JoyListDivider: {
      defaultProps: {
        inset: 'startDecorator',
      },
      styleOverrides: {
        root: ({ theme }) => ({
          '--Divider-thickness': '0.5px',
          backgroundColor: theme.vars.palette.separator.nonOpaque,
        }),
      },
    },
    JoyLinearProgress: {
      defaultProps: {
        variant: 'ios',
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.variant === 'ios' && {
            '--LinearProgress-thickness': '4px',
            backgroundColor: theme.vars.palette.fill.primary,
            color: theme.vars.palette.system.blue,
          }),
        }),
      },
    },
    JoyFormControl: {
      styleOverrides: {
        root: {
          '--FormLabel-alignSelf': 'center',
        },
      },
    },
    JoyInput: {
      defaultProps: {
        variant: 'ios',
      },
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          ...(ownerState.variant === 'ios' && {
            '--Input-focusedThickness': '0px',
            '--Input-placeholderOpacity': '1',
            '--Input-placeholderColor': theme.vars.palette.label.tertiary,
            color: theme.vars.palette.label.primary,
          }),
          ...(ownerState.type === 'search' && {
            '--Input-placeholderColor': theme.vars.palette.label.secondary,
            backgroundColor: theme.vars.palette.fill.tertiary,
            borderRadius: '11px',
          }),
        }),
        input: ({ theme, ownerState }) => ({
          ...(ownerState.variant === 'ios' && {
            caretColor: theme.vars.palette.system.blue,
          }),
        }),
      },
    },
    JoyTabs: {
      defaultProps: {
        variant: 'ios',
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === 'ios' && {
            background: 'none',
          }),
          ...(ownerState.variant === 'iosBar' && {
            background: 'none',
            '--Tabs-gap': '0px',
          }),
        }),
      },
    },
    JoyTabList: {
      defaultProps: {
        variant: 'ios',
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.variant === 'ios' && {
            '--List-radius': '8.91px',
            '--List-padding': '2px',
            '--List-item-minHeight': '24px',
            backgroundColor: theme.vars.palette.fill.tertiary,
          }),
          ...(ownerState.variant === 'iosBar' && {
            background: 'none',
            justifyContent: 'space-around',
            '--List-decorator-color': '#999999',
          }),
        }),
      },
    },
    JoyTab: {
      defaultProps: {
        variant: 'ios',
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.variant === 'ios' && {
            fontSize: '13px',
            lineHeight: '18px',
            paddingTop: '3px',
            paddingBottom: '3px',
            ...(ownerState.selected && {
              fontWeight: 600,
              boxShadow:
                '0 0 0 0.5px rgba(0 0 0 / .04), 0 0.5px 4px 0 rgba(0 0 0 / .12), 0 6px 13px 0 rgba(0 0 0 / .12)',
              backgroundColor: '#fff',
              '&:hover': {
                backgroundColor: '#fff',
              },
              [theme.getColorSchemeSelector('dark')]: {
                backgroundColor: theme.vars.palette.system.grey2,
                '&:hover': {
                  backgroundColor: theme.vars.palette.system.grey2,
                },
              },
            }),
          }),
          ...(ownerState.variant === 'iosBar' && {
            background: 'none',
            '&:hover': {
              background: 'none',
            },
            fontSize: '10px',
            lineHeight: '12px',
            boxShadow: 'none',
            color: theme.vars.palette.label.secondary,
            fontWeight: theme.vars.fontWeight.md,
            [`&.${tabClasses.selected}`]: {
              color: theme.vars.palette.system.blue,
            },
            '& svg': {
              fontSize: theme.vars.fontSize.xl3,
            },
          }),
        }),
      },
    },
  },
});
