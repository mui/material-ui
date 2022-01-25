import * as React from 'react';
import { CssVarsProvider, createGetCssVar } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Switch from '@mui/joy/Switch';

const getCssVar = createGetCssVar();

declare module '@mui/joy/styles' {
  interface PaletteRange {
    150: string;
    0: string;
    outlinedActiveColor: string;
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
}

export default function Strapi() {
  return (
    <CssVarsProvider
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
                containedHoverBg: getCssVar('palette-primary-500'),
                containedActiveBg: getCssVar('palette-primary-700'),
                outlinedColor: getCssVar('palette-primary-600'),
                outlinedBorder: getCssVar('palette-primary-200'),
                outlinedHoverBorder: getCssVar('palette-primary-200'),
                outlinedBg: getCssVar('palette-primary-100'),
                outlinedHoverBg: getCssVar('palette-neutral-0'),
                outlinedActiveBg: getCssVar('palette-neutral-0'),
                // new tokens that Joy does not provide
                outlinedActiveColor: getCssVar('palette-primary-700'),
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
                outlinedHoverBorder: getCssVar('palette-success-200'),
                outlinedBg: getCssVar('palette-success-100'),
                outlinedHoverBg: getCssVar('palette-neutral-0'),
                outlinedActiveBg: getCssVar('palette-neutral-0'),
                // new tokens that Joy does not provide
                outlinedActiveColor: getCssVar('palette-success-700'),
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
                outlinedHoverBorder: getCssVar('palette-danger-200'),
                outlinedBg: getCssVar('palette-danger-100'),
                outlinedHoverBg: getCssVar('palette-neutral-0'),
                outlinedActiveBg: getCssVar('palette-neutral-0'),
                // new tokens that Joy does not provide
                outlinedActiveColor: getCssVar('palette-danger-700'),
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
                50: '#FDF4DC',
                0: '#FFFFFF',
                outlinedColor: getCssVar('palette-neutral-800'),
                outlinedBorder: getCssVar('palette-neutral-200'),
                outlinedHoverBg: getCssVar('palette-neutral-100'),
                outlinedActiveBg: getCssVar('palette-neutral-150'),
              },
              outlinedFocusBorder: getCssVar('palette-neutral-0'),
            },
          },
        },
        variants: {
          outlinedActive: {
            primary: {
              '&:active': {
                color: getCssVar('palette-primary-outlinedActiveColor'),
                borderColor: getCssVar('palette-primary-outlinedActiveColor'),
              },
            },
            success: {
              '&:active': {
                color: getCssVar('palette-success-outlinedActiveColor'),
                borderColor: getCssVar('palette-success-outlinedActiveColor'),
              },
            },
            danger: {
              '&:active': {
                color: getCssVar('palette-danger-outlinedActiveColor'),
                borderColor: getCssVar('palette-danger-outlinedActiveColor'),
              },
            },
          },
        },
        typography: {
          header1: {
            fontFamily: getCssVar('fontFamily-body'),
            fontWeight: 600,
            fontSize: '2rem',
            lineHeight: '2.5rem',
            color: getCssVar('palette-neutral-800'),
          },
          header2: {
            fontFamily: getCssVar('fontFamily-body'),
            fontWeight: 600,
            fontSize: '1.125rem',
            lineHeight: '1.375rem',
            color: getCssVar('palette-neutral-800'),
          },
          header3: {
            fontFamily: getCssVar('fontFamily-body'),
            fontWeight: 500,
            fontSize: '1rem',
            lineHeight: '1.25rem',
            color: getCssVar('palette-neutral-800'),
          },
          subtitle: {
            fontFamily: getCssVar('fontFamily-body'),
            fontWeight: 400,
            fontSize: '1rem',
            lineHeight: '1.5rem',
            color: getCssVar('palette-neutral-600'),
          },
          body: {
            fontFamily: getCssVar('fontFamily-body'),
            fontWeight: 400,
            fontSize: '0.875rem',
            lineHeight: '1rem',
            color: getCssVar('palette-neutral-800'),
          },
          bodyHighlight: {
            fontFamily: getCssVar('fontFamily-body'),
            fontWeight: 500,
            fontSize: '0.875rem',
            lineHeight: '1rem',
            color: getCssVar('palette-neutral-800'),
          },
          buttonText: {
            fontFamily: getCssVar('fontFamily-body'),
            fontWeight: 600,
            fontSize: '0.875rem',
            lineHeight: '1rem',
            // button should not contain color globally
            // color: getCssVar('palette-neutral-800'),
          },
          smallText: {
            fontFamily: getCssVar('fontFamily-body'),
            fontWeight: 400,
            fontSize: '0.75rem',
            lineHeight: '1rem',
            color: getCssVar('palette-neutral-800'),
          },
          smallButtonText: {
            fontFamily: getCssVar('fontFamily-body'),
            fontWeight: 600,
            fontSize: '0.75rem',
            lineHeight: '1rem',
            // button should not contain color globally
            // color: getCssVar('palette-neutral-600'),
          },
          tableLabel: {
            fontFamily: getCssVar('fontFamily-body'),
            fontWeight: 600,
            fontSize: '0.7rem',
            lineHeight: '1rem',
            color: getCssVar('palette-neutral-800'),
            textTransform: 'uppercase',
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: ({ ownerState, theme }) => ({
                paddingLeft: '1rem',
                paddingRight: '1rem',
                borderRadius: '4px',
                ...theme.typography.buttonText,
                ...(ownerState.size === 'sm' && {
                  minHeight: 32,
                  ...theme.typography.smallButtonText,
                }),
                ...(ownerState.size === 'md' && {
                  minHeight: 36,
                }),
                ...(ownerState.size === 'lg' && {
                  minHeight: 40,
                }),
                '&.Mui-focusVisible': {
                  outline: '2px solid',
                  outlineColor: theme.vars.palette.primary[700],
                  outlineOffset: '2px',
                  ...(ownerState.variant === 'outlined' && {
                    // @ts-ignore This type error only occur in our repository due to multiple module augmentation
                    borderColor: theme.vars.palette.outlinedFocusBorder,
                  }),
                },
                '&.Mui-disabled': {
                  backgroundColor: theme.vars.palette.neutral[150],
                  color: theme.vars.palette.neutral[600],
                  border: '1px solid',
                  borderColor: theme.vars.palette.neutral[200],
                },
              }),
            },
          },
          MuiSwitch: {
            styleOverrides: {
              root: {
                '--Switch-track-width': '40px',
                '--Switch-track-thumb': '16px',
                color: getCssVar('palette-danger-500'),
                '&:hover': {
                  color: getCssVar('palette-danger-600'),
                },
                '&.Mui-checked': {
                  color: getCssVar('palette-success-500'),
                  '&:hover': {
                    color: getCssVar('palette-success-600'),
                  },
                },
              },
            },
          },
        },
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 2,
          '& > div': {
            display: 'flex',
            flexWrap: 'wrap',
            py: 4,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
          },
        }}
      >
        <Box>
          <Button size="sm">Text</Button>
          <Button>Text</Button>
          <Button size="lg">Text</Button>
          <Button disabled>Text</Button>

          <Button color="success" size="sm">
            Text
          </Button>
          <Button color="success">Text</Button>
          <Button color="success" size="lg">
            Text
          </Button>
          <Button color="success" disabled>
            Text
          </Button>

          <Button color="danger" size="sm">
            Text
          </Button>
          <Button color="danger">Text</Button>
          <Button color="danger" size="lg">
            Text
          </Button>
          <Button color="danger" disabled>
            Text
          </Button>
        </Box>
        <Box>
          <Button variant="outlined" size="sm">
            Text
          </Button>
          <Button variant="outlined">Text</Button>
          <Button variant="outlined" size="lg">
            Text
          </Button>
          <Button variant="outlined" disabled>
            Text
          </Button>

          <Button variant="outlined" color="success" size="sm">
            Text
          </Button>
          <Button variant="outlined" color="success">
            Text
          </Button>
          <Button variant="outlined" color="success" size="lg">
            Text
          </Button>
          <Button variant="outlined" color="success" disabled>
            Text
          </Button>

          <Button variant="outlined" color="danger" size="sm">
            Text
          </Button>
          <Button variant="outlined" color="danger">
            Text
          </Button>
          <Button variant="outlined" color="danger" size="lg">
            Text
          </Button>
          <Button variant="outlined" color="danger" disabled>
            Text
          </Button>
        </Box>
        <Box>
          <Button color="neutral" variant="outlined" size="sm">
            Text
          </Button>
          <Button color="neutral" variant="outlined">
            Text
          </Button>
          <Button color="neutral" variant="outlined" size="lg">
            Text
          </Button>
          <Button color="neutral" variant="outlined" disabled>
            Text
          </Button>
        </Box>
        <Box>
          <Switch defaultChecked />
          <Switch />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
