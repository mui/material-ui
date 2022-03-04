import * as React from 'react';
import { GlobalStyles, CSSObject } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import { CssVarsProvider, ColorPaletteProp, PaletteVariant } from '@mui/joy/styles';
import Info from '@mui/icons-material/Info';
import Code from '@mui/icons-material/Code';
import PlayArrow from '@mui/icons-material/PlayArrow';
import HistoryEdu from '@mui/icons-material/HistoryEdu';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';

declare module '@mui/joy/styles' {
  interface PaletteNeutral {
    150: string;
    0: string;
  }

  interface Palette {
    secondary: {
      700: string;
      600: string;
      500: string;
      200: string;
      100: string;
    } & PaletteVariant;
    alternate: {
      700: string;
      600: string;
      500: string;
      200: string;
      100: string;
    } & PaletteVariant;
    outlinedFocusBorder: string;
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

// how to add more color and use with variants
const Tile = ({
  children,
  variant = 'light',
  color = 'primary',
  sx = [],
  ...props
}: {
  variant?: 'light' | 'contained';
  color?: ColorPaletteProp | 'secondary' | 'alternate';
} & Omit<BoxProps, 'color'>) => {
  return (
    <Box
      sx={[
        { display: 'inline-flex', p: 0.75, borderRadius: '4px' },
        (theme) => theme.variants[variant][color],
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      {children}
    </Box>
  );
};

export default function JoyVariant() {
  return (
    <Box
      sx={{
        maxWidth: { md: 1152, xl: 1536 },
        mx: 'auto',
      }}
    >
      <GlobalStyles styles={{ body: { margin: 0 } }} />
      <CssVarsProvider
        theme={{
          components: {
            MuiSvgIcon: {
              defaultProps: {
                fontSize: 'xl',
              },
              styleOverrides: {
                root: ({ ownerState, theme }) => ({
                  ...(ownerState.fontSize &&
                    ownerState.fontSize !== 'inherit' && {
                      fontSize: theme.vars.fontSize[ownerState.fontSize],
                    }),
                  ...(ownerState.color &&
                    ownerState.color !== 'inherit' && {
                      color: theme.vars.palette[ownerState.color].textColor,
                    }),
                }),
              },
            },
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography component="h1" level="h3" gutterBottom>
            Variant demonstration
          </Typography>
          <Typography component="h2" level="h4">
            Default
          </Typography>
          <Typography level="body2" sx={{ mb: 1 }}>
            Joy provides default style for each variant.
          </Typography>
          <Box
            sx={[
              {
                display: 'flex',
                gap: 2,
                justifyContent: 'center',
                p: 2,
                borderRadius: 1,
              },
              (theme) => theme.variants.outlined.neutral,
            ]}
          >
            <Button variant="text">Text</Button>
            <Button variant="outlined">Outlined</Button>
            <Button variant="light">Light</Button>
            <Button variant="contained">Contained</Button>
            <Button disabled>Disabled</Button>
          </Box>
          <br />
          <Typography level="body2" sx={{ mb: 1 }}>
            Default context overrides feature
          </Typography>
          <Box
            sx={[
              {
                display: 'flex',
                gap: 2,
                justifyContent: 'center',
                p: 2,
                borderRadius: 1,
              },
              (theme) => theme.variants.contained.primary,
              (theme) => theme.variants.containedOverrides.primary,
            ]}
          >
            <Button color="context" variant="text">
              Text
            </Button>
            <Button color="context" variant="outlined">
              Outlined
            </Button>
            <Button disabled color="context" variant="outlined">
              Disabled
            </Button>
            <Button color="context" variant="light">
              Light
            </Button>
            <Button disabled color="context" variant="light">
              Disabled
            </Button>
            <Button color="context" variant="contained">
              Contained
            </Button>
            <Button disabled color="context" variant="contained">
              Disabled
            </Button>
          </Box>
        </Box>
      </CssVarsProvider>
      <CssVarsProvider
        prefix="strapi"
        theme={{
          colorSchemes: {
            light: {
              palette: {
                primary: {
                  700: '#271FE0',
                  600: '#4945FF',
                  500: '#7B79FF',
                  200: '#D9D8FF',
                  100: '#F0F0FF',
                  lightColor: 'var(--strapi-palette-primary-600)',
                  lightActiveBg: 'var(--strapi-palette-primary-200)',
                  containedHoverBg: 'var(--strapi-palette-primary-500)',
                  containedActiveBg: 'var(--strapi-palette-primary-700)',
                  outlinedColor: 'var(--strapi-palette-primary-600)',
                  outlinedBorder: 'var(--strapi-palette-primary-200)',
                  outlinedBg: 'var(--strapi-palette-primary-100)',
                  outlinedHoverBorder: 'var(--strapi-palette-primary-200)',
                  outlinedHoverBg: 'var(--strapi-palette-neutral-0)',
                  outlinedActiveColor: 'var(--strapi-palette-primary-700)',
                  outlinedActiveBorder: 'var(--strapi-palette-primary-700)',
                  outlinedActiveBg: 'var(--strapi-palette-neutral-0)',
                },
                success: {
                  700: '#2F6846',
                  600: '#328048',
                  500: '#5CB176',
                  200: '#C6F0C2',
                  100: '#EAFBE7',
                  containedHoverBg: 'var(--strapi-palette-success-500)',
                  containedActiveBg: 'var(--strapi-palette-success-700)',
                  outlinedColor: 'var(--strapi-palette-success-600)',
                  outlinedBorder: 'var(--strapi-palette-success-200)',
                  outlinedBg: 'var(--strapi-palette-success-100)',
                  outlinedHoverBorder: 'var(--strapi-palette-success-200)',
                  outlinedHoverBg: 'var(--strapi-palette-neutral-0)',
                  outlinedActiveColor: 'var(--strapi-palette-success-700)',
                  outlinedActiveBorder: 'var(--strapi-palette-success-700)',
                  outlinedActiveBg: 'var(--strapi-palette-neutral-0)',
                },
                danger: {
                  700: '#B72B1A',
                  600: '#D02B20',
                  500: '#EE5E52',
                  200: '#F5C0B8',
                  100: '#FCECEA',
                  containedHoverBg: 'var(--strapi-palette-danger-500)',
                  containedActiveBg: 'var(--strapi-palette-danger-700)',
                  outlinedColor: 'var(--strapi-palette-danger-600)',
                  outlinedBorder: 'var(--strapi-palette-danger-200)',
                  outlinedBg: 'var(--strapi-palette-danger-100)',
                  outlinedHoverBorder: 'var(--strapi-palette-danger-200)',
                  outlinedHoverBg: 'var(--strapi-palette-neutral-0)',
                  outlinedActiveColor: 'var(--strapi-palette-danger-700)',
                  outlinedActiveBorder: 'var(--strapi-palette-danger-700)',
                  outlinedActiveBg: 'var(--strapi-palette-neutral-0)',
                },
                warning: {
                  700: '#BE5D01',
                  600: '#D9822F',
                  500: '#F29D41',
                  200: '#FAE7B9',
                  100: '#FDF4DC',
                },
                secondary: {
                  700: '#006096',
                  600: '#0C75AF',
                  500: '#66B7F1',
                  200: '#B8E1FF',
                  100: '#EAF5FF',
                  lightBg: 'var(--strapi-palette-secondary-100)',
                  lightColor: 'var(--strapi-palette-secondary-700)',
                  containedBg: 'var(--strapi-palette-secondary-500)',
                  containedColor: '#fff',
                },
                alternate: {
                  700: '#8312D1',
                  600: '#9736E8',
                  500: '#AC73E6',
                  200: '#E0C1F4',
                  100: '#F6ECFC',
                  lightBg: 'var(--strapi-palette-alternate-100)',
                  lightColor: 'var(--strapi-palette-alternate-700)',
                  containedBg: 'var(--strapi-palette-alternate-500)',
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
                  outlinedColor: 'var(--strapi-palette-neutral-800)',
                  outlinedBorder: 'var(--strapi-palette-neutral-200)',
                  outlinedHoverBg: 'var(--strapi-palette-neutral-100)',
                  outlinedActiveBg: 'var(--strapi-palette-neutral-150)',
                  outlinedDisabledColor: 'var(--strapi-palette-neutral-600)',
                  outlinedDisabledBorder: 'var(--strapi-palette-neutral-200)',
                  outlinedDisabledBg: 'var(--strapi-palette-neutral-150)',
                },
                background: {
                  level1: 'var(--strapi-palette-neutral-100)',
                  level2: 'var(--strapi-palette-neutral-150)',
                },
                text: {
                  primary: 'var(--strapi-palette-neutral-800)',
                },
                focusVisible: 'var(--strapi-palette-primary-700)',
                outlinedFocusBorder: 'var(--strapi-palette-neutral-0)',
              },
            },
          },
          focus: {
            default: {
              outline: '2px solid',
              outlineOffset: '2px',
            },
          },
          components: {
            MuiButton: {
              styleOverrides: {
                root: ({ ownerState }) => ({
                  '--Button-gutter': '1rem',
                  borderRadius: '4px',
                  ...(ownerState.size === 'sm' && {
                    minHeight: 32,
                  }),
                  ...(ownerState.size === 'md' && {
                    minHeight: 36,
                  }),
                  ...(ownerState.size === 'lg' && {
                    minHeight: 40,
                  }),
                  '&.Mui-focusVisible': {
                    ...(ownerState.variant === 'outlined' && {
                      borderColor: 'var(--strapi-palette-outlinedFocusBorder)',
                    }),
                  },
                  '&.Mui-disabled': {
                    backgroundColor: 'var(--strapi-palette-neutral-outlinedDisabledBg)',
                    color: 'var(--strapi-palette-neutral-outlinedDisabledColor)',
                    border: '1px solid',
                    borderColor: 'var(--strapi-palette-neutral-outlinedDisabledBorder)',
                  },
                }),
              },
            },
            MuiSvgIcon: {
              defaultProps: {
                fontSize: 'xl',
              },
              styleOverrides: {
                root: ({ ownerState, theme }) => ({
                  ...(ownerState.fontSize &&
                    ownerState.fontSize !== 'inherit' && {
                      fontSize: theme.vars.fontSize[ownerState.fontSize],
                    }),
                  ...(ownerState.color &&
                    ownerState.color !== 'inherit' && {
                      color: theme.vars.palette[ownerState.color].textColor,
                    }),
                }),
              },
            },
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography component="h2" level="h4">
            Custom (Strapi design system)
          </Typography>
          <Typography component="h3" level="h5" gutterBottom>
            Palette
          </Typography>
          <Typography level="body2" gutterBottom>
            Strapi defines 7 palettes (primary, neutral, danger, success, warning, secondary, and
            alternate). However, leave the secondary and alternate blank for now. <br /> This
            example only focus on the light mode because the Figma does not provide the UIs for dark
            mode. See{' '}
            <a
              href="https://www.figma.com/file/9jClRdtL7DgQcG4iYU6MzC/Strapi---UI-Kit-%F0%9F%A7%A9-(Community)?node-id=4183%3A65170"
              target="_blank"
              rel="noreferrer noopener"
            >
              design tokens in Figma
            </a>
          </Typography>
          <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>
            <HighlightedCode
              component={MarkdownElement}
              code={`
declare module '@mui/joy/styles' {
  // Joy has no '0', '150' token by default
  // In the Figma, Strapi defines 0, 150 only for the neutral palette
  interface PaletteNeutral {
    150: string;
    0: string;
  }
}

<CssVarsProvider
  prefix="strapi"
  theme={{
    colorSchemes: {
      light: {
        palette: {
          primary: {
            700: '#271FE0',
            600: '#4945FF',
            500: '#7B79FF',
            200: '#D9D8FF',
            100: '#F0F0FF',
          },
          success: {
            700: '#2F6846',
            600: '#328048',
            500: '#5CB176',
            200: '#C6F0C2',
            100: '#EAFBE7',
          },
          danger: {
            700: '#B72B1A',
            600: '#D02B20',
            500: '#EE5E52',
            200: '#F5C0B8',
            100: '#FCECEA',
          },
          warning: {
            700: '#BE5D01',
            600: '#D9822F',
            500: '#F29D41',
            200: '#FAE7B9',
            100: '#FDF4DC',
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
          },
        },
      },
    },
  }}
/>
              `}
              language="jsx"
            />
          </ThemeProvider>
          <br />
          <Typography component="h3" level="h5" gutterBottom>
            Variant
          </Typography>
          <Typography level="body2" gutterBottom>
            Strapi does not define variant, so I have to translate the design myself to map with Joy
            variant. <br />
            From what I see, Strapi defines 2 styles for the Button, `contained` and `outlined`.{' '}
            Here is how to customize the variant token for each palette. Note that disabled state is
            the same across colors, so it is best to configure under theme.components.MuiButton
          </Typography>
          <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>
            <HighlightedCode
              component={MarkdownElement}
              code={`
declare module '@mui/joy/styles' {
  // other augmentation

  interface Palette {
    outlinedFocusBorder: string;
  }
}

<CssVarsProvider
  prefix="strapi"
  theme={{
    colorSchemes: {
      light: {
        palette: {
          primary: {
            // ...tokens
            containedHoverBg: 'var(--strapi-palette-primary-500)',
            containedActiveBg: 'var(--strapi-palette-primary-700)',
            outlinedColor: 'var(--strapi-palette-primary-600)',
            outlinedBorder: 'var(--strapi-palette-primary-200)',
            outlinedBg: 'var(--strapi-palette-primary-100)',
            outlinedHoverBorder: 'var(--strapi-palette-primary-200)',
            outlinedHoverBg: 'var(--strapi-palette-neutral-0)',
            outlinedActiveColor: 'var(--strapi-palette-primary-700)',
            outlinedActiveBorder: 'var(--strapi-palette-primary-700)',
            outlinedActiveBg: 'var(--strapi-palette-neutral-0)',
          },
          success: {
            // ...tokens
            containedHoverBg: 'var(--strapi-palette-success-500)',
            containedActiveBg: 'var(--strapi-palette-success-700)',
            outlinedColor: 'var(--strapi-palette-success-600)',
            outlinedBorder: 'var(--strapi-palette-success-200)',
            outlinedBg: 'var(--strapi-palette-success-100)',
            outlinedHoverBorder: 'var(--strapi-palette-success-200)',
            outlinedHoverBg: 'var(--strapi-palette-neutral-0)',
            outlinedActiveColor: 'var(--strapi-palette-success-700)',
            outlinedActiveBorder: 'var(--strapi-palette-success-700)',
            outlinedActiveBg: 'var(--strapi-palette-neutral-0)',
          },
          danger: {
            // ...tokens
            containedHoverBg: 'var(--strapi-palette-danger-500)',
            containedActiveBg: 'var(--strapi-palette-danger-700)',
            outlinedColor: 'var(--strapi-palette-danger-600)',
            outlinedBorder: 'var(--strapi-palette-danger-200)',
            outlinedBg: 'var(--strapi-palette-danger-100)',
            outlinedHoverBorder: 'var(--strapi-palette-danger-200)',
            outlinedHoverBg: 'var(--strapi-palette-neutral-0)',
            outlinedActiveColor: 'var(--strapi-palette-danger-700)',
            outlinedActiveBorder: 'var(--strapi-palette-danger-700)',
            outlinedActiveBg: 'var(--strapi-palette-neutral-0)',
          },
          neutral: {
            // ...tokens
            outlinedColor: 'var(--strapi-palette-neutral-800)',
            outlinedBorder: 'var(--strapi-palette-neutral-200)',
            outlinedHoverBg: 'var(--strapi-palette-neutral-100)',
            outlinedActiveBg: 'var(--strapi-palette-neutral-150)',
            outlinedDisabledColor: 'var(--strapi-palette-neutral-600)',
            outlinedDisabledBorder: 'var(--strapi-palette-neutral-200)',
            outlinedDisabledBg: 'var(--strapi-palette-neutral-150)',
          },
          // these colors are not defined in the Figma button component, so leave them for now.
          warning: {},
          secondary: {},
          alternate: {},
          outlinedFocusBorder: 'var(--strapi-palette-neutral-0)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          '--Button-gutter': '1rem',
          borderRadius: '4px',
          ...(ownerState.size === 'sm' && {
            minHeight: 32,
          }),
          ...(ownerState.size === 'md' && {
            minHeight: 36,
          }),
          ...(ownerState.size === 'lg' && {
            minHeight: 40,
          }),
          '&.Mui-focusVisible': {
            ...(ownerState.variant === 'outlined' && {
              borderColor: 'var(--strapi-palette-outlinedFocusBorder)',
            }),
          },
          '&.Mui-disabled': {
            backgroundColor: 'var(--strapi-palette-neutral-outlinedDisabledBg)',
            color: 'var(--strapi-palette-neutral-outlinedDisabledColor)',
            border: '1px solid',
            borderColor: 'var(--strapi-palette-neutral-outlinedDisabledBorder)',
          },
        }),
      },
    },
  }}
/>
              `}
              language="jsx"
            />
          </ThemeProvider>
          <Box
            sx={[
              {
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                justifyContent: 'center',
                alignItems: 'center',
                p: 2,
                borderRadius: 1,
              },
              (theme) => theme.variants.outlined.neutral,
            ]}
          >
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained">Contained</Button>
              <Button variant="outlined">Outlined</Button>
              <Button disabled>Disabled</Button>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button color="danger" variant="contained">
                Contained
              </Button>
              <Button color="danger" variant="outlined">
                Outlined
              </Button>
              <Button color="danger" disabled>
                Disabled
              </Button>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button color="success" variant="contained">
                Contained
              </Button>
              <Button color="success" variant="outlined">
                Outlined
              </Button>
              <Button color="success" disabled>
                Disabled
              </Button>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button color="neutral" variant="outlined">
                Outlined
              </Button>
              <Button color="neutral" disabled>
                Disabled
              </Button>
            </Box>
          </Box>
          <Typography gutterBottom level="body2">
            Developer does not need to deal with the variant style sheet (eg. border,
            background-color, :hover, :active) because Joy will create those styles based on the
            final variables which means developers can also remove the default tokens by providing
            undefined.
          </Typography>
          <br />
          <Typography gutterBottom level="body2">
            Even though, Strapi does not have context override concept, it still work out-of-the
            box.
          </Typography>
          <Box
            sx={[
              {
                display: 'flex',
                gap: 2,
                justifyContent: 'center',
                alignItems: 'center',
                p: 2,
                borderRadius: 1,
              },
              (theme) => theme.variants.contained.primary,
              (theme) => theme.variants.containedOverrides.primary,
            ]}
          >
            <Button color="context" variant="contained">
              Contained
            </Button>
            <Button color="context" variant="outlined">
              Outlined
            </Button>
            <Button color="context" disabled>
              Disabled
            </Button>
          </Box>
          <br />
          <Typography component="h3" level="h5" gutterBottom>
            Focus
          </Typography>
          <Typography gutterBottom level="body2">
            Strapi defines different focus style from Joy. This can be easily configure in
            theme.focus.default to apply to all focusable components.
          </Typography>
          <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>
            <HighlightedCode
              component={MarkdownElement}
              code={`
<CssVarsProvider
  prefix="strapi"
  theme={{
    colorSchemes: {
      // ...
    },
    focus: {
      default: {
        outline: '2px solid',
        outlineOffset: '2px',
        outlineColor: 'var(--strapi-palette-primary-700)',
      },
    },
  }}
/>
              `}
              language="jsx"
            />
          </ThemeProvider>
          <Box
            sx={[
              {
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                justifyContent: 'center',
                alignItems: 'center',
                p: 2,
                borderRadius: 1,
              },
              (theme) => theme.variants.outlined.neutral,
            ]}
          >
            <Button>Tab to focus</Button>
          </Box>
          <br />
          <br />
          <Typography component="h3" level="h5" gutterBottom>
            Custom component
          </Typography>
          <Box
            sx={[
              {
                display: 'flex',
                gap: 2,
                justifyContent: 'center',
                p: 2,
                borderRadius: 1,
              },
              (theme) => theme.variants.outlined.neutral,
            ]}
          >
            <Tile sx={{ p: 2 }}>
              <Tile variant="contained">
                <Info />
              </Tile>
            </Tile>
            <Tile sx={{ p: 2 }} color="warning">
              <Tile variant="contained" color="warning">
                <Code />
              </Tile>
            </Tile>
            <Tile sx={{ p: 2 }} color="secondary">
              <Tile variant="contained" color="secondary">
                <PlayArrow />
              </Tile>
            </Tile>
            <Tile sx={{ p: 2 }} color="alternate">
              <Tile variant="contained" color="alternate">
                <HistoryEdu />
              </Tile>
            </Tile>
          </Box>
          <Typography level="body2">
            The above UI looks exactly like the contained variant on top of light variant. In this
            case, developers should extend only light & contained variants to support secondary &
            alternate colors. (Joy does not provide secondary & alternate colors by default)
          </Typography>
          <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>
            <HighlightedCode
              component={MarkdownElement}
              code={`
declare module '@mui/joy/styles' {
  // other augmentation

  interface VariantLight {
    secondary: CSSObject;
    alternate: CSSObject;
  }

  interface VariantContained {
    secondary: CSSObject;
    alternate: CSSObject;
  }
}

<CssVarsProvider
  prefix="strapi"
  theme={{
    colorSchemes: {
      light: {
        palette: {
          // ...other palettes
          secondary: {
            700: '#006096',
            600: '#0C75AF',
            500: '#66B7F1',
            200: '#B8E1FF',
            100: '#EAF5FF',
            // Joy can detect the variables and will automatically generate variant styles
            // even though the color does not exist in the default theme.
            lightBg: 'var(--strapi-palette-secondary-100)',
            lightColor: 'var(--strapi-palette-secondary-700)',
            containedBg: 'var(--strapi-palette-secondary-500)',
            containedColor: '#fff',
          },
          alternate: {
            700: '#8312D1',
            600: '#9736E8',
            500: '#AC73E6',
            200: '#E0C1F4',
            100: '#F6ECFC',
            // Joy can detect the variables and will automatically generate variant styles
            // even though the color does not exist in the default theme.
            lightBg: 'var(--strapi-palette-alternate-100)',
            lightColor: 'var(--strapi-palette-alternate-700)',
            containedBg: 'var(--strapi-palette-alternate-500)',
            containedColor: '#fff',
          },
        }
      }
    },
  }}
/>

// Custom component for Strapi use-case.
const Tile = ({
  children,
  variant = 'light',
  color = 'primary',
  sx = [],
  ...props
}: {
  variant?: 'light' | 'contained';
  color?: 'primary' | 'warning' | 'secondary' | 'alternate';
} & Omit<BoxProps, 'color'>) => {
  return (
    <Box
      sx={[
        { display: 'inline-flex', p: 0.75, borderRadius: '4px' },
        (theme) => theme.variants[variant][color], // easy
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      {children}
    </Box>
  );
};

<Tile sx={{ p: 2 }}>
  <Tile variant="contained">
    <Info />
  </Tile>
</Tile>
<Tile sx={{ p: 2 }} color="warning">
  <Tile variant="contained" color="warning">
    <Code />
  </Tile>
</Tile>
<Tile sx={{ p: 2 }} color="secondary">
  <Tile variant="contained" color="secondary">
    <PlayArrow />
  </Tile>
</Tile>
<Tile sx={{ p: 2 }} color="alternate">
  <Tile variant="contained" color="alternate">
    <HistoryEdu />
  </Tile>
</Tile>
              `}
              language="jsx"
            />
          </ThemeProvider>
        </Box>
      </CssVarsProvider>
    </Box>
  );
}
