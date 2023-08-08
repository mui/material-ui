import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import useScript from './useScript';
import FirstSidebar from './components/FirstSidebar';
import SecondSidebar from './components/SecondSidebar';
import OrderTable from './components/OrderTable';
import Header from './components/Header';
import ColorSchemeToggle from './components/ColorSchemeToggle';

export const newTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        // background: {
        //   body: 'var(--joy-palette-neutral-50)',
        // },
        primary: {
          50: '#fdf7ef',
          100: '#fbedd9',
          200: '#f7d7b1',
          300: '#f1bc80',
          400: '#ea974d',
          500: '#e57928',
          600: '#d7611f',
          700: '#8e3c1e',
          800: '#73341b',
          900: '#3e180c',
        },
        neutral: {
          50: '#f4f5f7',
          100: '#e4e8e9',
          200: '#cbd2d6',
          300: '#a8b3b8',
          400: '#7c8c94',
          500: '#6a7b84',
          600: '#535f67',
          700: '#475057',
          800: '#383d41',
          900: '#232729',
        },
        warning: {
          50: '#ffffe7',
          100: '#feffc1',
          200: '#fffd86',
          300: '#fff341',
          400: '#ffe40d',
          500: '#ffd500',
          600: '#d19c00',
          700: '#a67002',
          800: '#74470f',
          900: '#442504',
          solidColor: 'var(--joy-palette-warning-800)',
          outlinedColor: 'var(--joy-palette-warning-700)',
          plainColor: 'var(--joy-palette-warning-700)',
        },
        danger: {
          50: '#fff2f1',
          100: '#ffe1df',
          200: '#ffc8c5',
          300: '#ffa29d',
          400: '#ff6c64',
          500: '#ff3d33',
          600: '#ed2015',
          700: '#c8160d',
          800: '#881a14',
          900: '#4b0704',
        },
        success: {
          50: '#effce9',
          100: '#ddf8cf',
          200: '#bdf1a5',
          300: '#92e670',
          400: '#6cd744',
          500: '#4cbd25',
          600: '#379719',
          700: '#2c7318',
          800: '#244e19',
          900: '#0e2b08',
          solidBg: 'var(--joy-palette-success-500)',
        },
        focusVisible: 'rgba(229, 121, 40, 0.5)',
      },
    },
    dark: {
      palette: {
        common: {
          black: '#171A1C',
        },
        primary: {
          50: '#fdf7ef',
          100: '#fbedd9',
          200: '#f7d7b1',
          300: '#f1bc80',
          400: '#ea974d',
          500: '#e57928',
          600: '#d7611f',
          700: '#8e3c1e',
          800: '#73341b',
          900: '#3e180c',
          solidBg: 'var(--joy-palette-primary-600)',
          solidHoverBg: 'var(--joy-palette-primary-700)',
          solidActiveBg: 'var(--joy-palette-primary-800)',
          softActiveBg: 'var(--joy-palette-primary-800)',
          outlinedActiveBg: 'var(--joy-palette-primary-800)',
          outlinedHoverBg: 'var(--joy-palette-primary-700)',
          plainActiveBg: 'var(--joy-palette-primary-800)',
          plainHoverBg: 'var(--joy-palette-primary-700)',
        },
        neutral: {
          50: '#f4f5f7',
          100: '#e4e8e9',
          200: '#cbd2d6',
          300: '#a8b3b8',
          400: '#7c8c94',
          500: '#6a7b84',
          600: '#535f67',
          700: '#475057',
          800: '#383d41',
          900: '#232729',
          solidBg: 'var(--joy-palette-neutral-600)',
          solidHoverBg: 'var(--joy-palette-neutral-700)',
          solidActiveBg: 'var(--joy-palette-neutral-800)',
          softActiveBg: 'var(--joy-palette-neutral-800)',
          outlinedActiveBg: 'var(--joy-palette-neutral-800)',
          outlinedHoverBg: 'var(--joy-palette-neutral-700)',
          plainActiveBg: 'var(--joy-palette-neutral-800)',
          plainHoverBg: 'var(--joy-palette-neutral-700)',
        },
        warning: {
          50: '#ffffe7',
          100: '#feffc1',
          200: '#fffd86',
          300: '#fff341',
          400: '#ffe40d',
          500: '#ffd500',
          600: '#d19c00',
          700: '#a67002',
          800: '#74470f',
          900: '#442504',
          solidColor: 'var(--joy-palette-warning-900)',
          solidBg: 'var(--joy-palette-warning-600)',
          solidHoverBg: 'var(--joy-palette-warning-700)',
          solidActiveBg: 'var(--joy-palette-warning-800)',
          softActiveBg: 'var(--joy-palette-warning-800)',
          outlinedActiveBg: 'var(--joy-palette-warning-800)',
          outlinedHoverBg: 'var(--joy-palette-warning-700)',
          plainActiveBg: 'var(--joy-palette-warning-800)',
          plainHoverBg: 'var(--joy-palette-warning-700)',
        },
        danger: {
          50: '#fff2f1',
          100: '#ffe1df',
          200: '#ffc8c5',
          300: '#ffa29d',
          400: '#ff6c64',
          500: '#ff3d33',
          600: '#ed2015',
          700: '#c8160d',
          800: '#881a14',
          900: '#4b0704',
          solidBg: 'var(--joy-palette-danger-600)',
          solidHoverBg: 'var(--joy-palette-danger-700)',
          solidActiveBg: 'var(--joy-palette-danger-800)',
          softActiveBg: 'var(--joy-palette-danger-800)',
          outlinedActiveBg: 'var(--joy-palette-danger-800)',
          outlinedHoverBg: 'var(--joy-palette-danger-700)',
          plainActiveBg: 'var(--joy-palette-danger-800)',
          plainHoverBg: 'var(--joy-palette-danger-700)',
        },
        success: {
          50: '#effce9',
          100: '#ddf8cf',
          200: '#bdf1a5',
          300: '#92e670',
          400: '#6cd744',
          500: '#4cbd25',
          600: '#379719',
          700: '#2c7318',
          800: '#244e19',
          900: '#0e2b08',
          solidBg: 'var(--joy-palette-success-600)',
          solidHoverBg: 'var(--joy-palette-success-700)',
          solidActiveBg: 'var(--joy-palette-success-800)',
          softActiveBg: 'var(--joy-palette-success-800)',
          outlinedActiveBg: 'var(--joy-palette-success-800)',
          outlinedHoverBg: 'var(--joy-palette-success-700)',
          plainActiveBg: 'var(--joy-palette-success-800)',
          plainHoverBg: 'var(--joy-palette-success-700)',
        },
      },
    },
  },
  focus: {
    default: {
      outlineWidth: '2px',
    },
  },
  fontFamily: {
    body: 'Open Sans, var(--gh-fontFamily-fallback)',
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.size === 'md' && {
            minHeight: '32px',
            '--Button-paddingInline': '1rem',
          }),
          ...(ownerState.variant === 'solid' && {
            border: '1px solid rgba(27, 31, 36, 0.15)',
            boxShadow: [
              'inset 0px 1px 0px rgba(210, 210, 210, 0.2)',
              'inset 0px -1px 0px rgba(0, 0, 0, 0.05)',
              '0 1px 0 0 rgba(27, 31, 35, 0.05)',
            ].join(', '),
            '&:active': {
              boxShadow: 'inset 0px 1px 0px rgba(27, 31, 36, 0.2)',
            },
          }),
          ...(ownerState.color === 'neutral' &&
            ownerState.variant === 'outlined' && {
              '&:active': {
                boxShadow: 'none',
              },
            }),
        }),
      },
    },
    JoyList: {
      styleOverrides: {
        root: {
          '--ListItem-radius': '8px',
        },
      },
    },
    JoySheet: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          borderColor: 'var(--joy-palette-neutral-200)',
          ...(ownerState.variant === 'soft' && {
            background: `linear-gradient(var(--joy-palette-neutral-100), var(--joy-palette-neutral-200))`,
          }),
          ...(ownerState.variant === 'solid' && {
            background: `linear-gradient(var(--joy-palette-neutral-200), var(--joy-palette-neutral-500))`,
          }),
          [theme.getColorSchemeSelector('dark')]: {
            borderColor: 'var(--joy-palette-neutral-800)',
            ...(ownerState.variant === 'soft' && {
              background: `linear-gradient(var(--joy-palette-neutral-800), var(--joy-palette-neutral-900))`,
            }),
            ...(ownerState.variant === 'solid' && {
              background: `linear-gradient(var(--joy-palette-neutral-900), var(--joy-palette-common-black))`,
            }),
          },
        }),
      },
    },
    JoyInput: {
      styleOverrides: {
        root: ({ theme }) =>
          theme.unstable_sx({
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.12)',
            [theme.getColorSchemeSelector('dark')]: {
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
            },
          }),
      },
    },
    JoyDivider: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: '1px solid rgba(27, 31, 36, 0.05)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundColor: '1px solid rgba(27, 31, 36, 0.15)',
          },
        }),
      },
    },
    JoyTabs: {
      styleOverrides: {
        root: {
          '--ListItem-radius': '8px',
        },
      },
    },
    JoyTabList: {
      styleOverrides: {
        root: ({ theme }) =>
          theme.unstable_sx({
            p: 1,
            gap: 0.5,
            bgcolor: 'background.level1',
          }),
      },
    },
    JoyTab: {
      styleOverrides: {
        root: {
          '--Tab-indicatorThickness': '0',
          [`&[aria-selected="true"]`]: {
            boxShadow: [
              'inset 0px 1px 0px rgba(210, 210, 210, 0.2)',
              'inset 0px -1px 0px rgba(0, 0, 0, 0.08)',
            ].join(', '),
            bgcolor: 'background.surface',
            borderRadius: '12px',
            paddingBottom: '6px',
          },
        },
      },
    },
    JoySwitch: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          '--Switch-thumbShadow': `$(theme.vars.shadow.sm)`,
          '--Switch-trackRadius': '4px',
          '--Switch-thumbSize': '16px',
          '--Switch-trackWidth': '42px',
          '--Switch-trackHeight': '22px',
          [theme.getColorSchemeSelector('dark')]: {
            '&:checked': {
              '--Switch-trackBackground': 'var(--joy-palette-success-500)',
            },
          },
        }),
      },
    },
    JoyCard: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          [theme.getColorSchemeSelector('light')]: {
            ...(ownerState.variant === 'soft' && {
              border: '1px solid rgba(27, 31, 36, 0.15)',
              background: `linear-gradient(-45deg,var(--joy-palette-neutral-200), var(--joy-palette-neutral-100))`,
              boxShadow: [
                'inset 0px 1px 0px rgba(250, 250, 250, 0.6)',
                'inset 0px -1px 0px rgba(0, 0, 0, 0.08)',
                // '0px 2px 8px -2px rgba(21 21 21, 0.2)',
                // '0px 6px 12px -2px rgba(21 21 21, 0.2)',
              ].join(', '),
            }),
            ...(ownerState.variant === 'solid' && {
              border: '1px solid rgba(27, 31, 36, 0.15)',
              background: `linear-gradient(-45deg,var(--joy-palette-neutral-400), var(--joy-palette-neutral-300))`,
              boxShadow: [
                'inset 0px 1px 0px rgba(250, 250, 250, 0.2)',
                'inset 0px -1px 0px rgba(0, 0, 0, 0.08)',
                // '0px 1px 2px 0px rgba(21 21 21, 0.12)',
                // '0px 2px 4px 0px rgba(21 21 21, 0.12)',
              ].join(', '),
            }),
            ...(ownerState.variant === 'outlined' && {
              borderColor: 'var(--joy-palette-neutral-200)',
              boxShadow: 'inset 0px -1px 0px rgba(0, 0, 0, 0.07)',
            }),
            ...(ownerState.variant === 'plain' && {
              boxShadow: 'none',
            }),
          },
          [theme.getColorSchemeSelector('dark')]: {
            ...(ownerState.variant === 'soft' && {
              border: '1px solid rgba(27, 31, 36)',
              background: `linear-gradient(-45deg, var(--joy-palette-common-black), var(--joy-palette-neutral-900))`,
              boxShadow: [
                'inset 0px 1px 0px rgba(210, 210, 210, 0.08)',
                'inset 0px -1px 0px rgba(0, 0, 0, 0.8)',
                // '0px 2px 8px -2px rgba(21 21 21, 0.01)',
                // '0px 6px 12px -2px rgba(21 21 21, 0.01)',
              ].join(', '),
            }),
            ...(ownerState.variant === 'solid' && {
              border: '1px solid rgba(27, 31, 36)',
              background: `linear-gradient(-45deg,var(--joy-palette-neutral-900), var(--joy-palette-neutral-800))`,
              boxShadow: [
                'inset 0px 1px 0px rgba(250, 250, 250, 0.08)',
                'inset 0px -1px 0px rgba(0, 0, 0, 0.8)',
                // '0px 1px 2px 0px rgba(21 21 21, 0.01)',
                // '0px 2px 4px 0px rgba(21 21 21, 0.01)',
              ].join(', '),
            }),
            ...(ownerState.variant === 'outlined' && {
              borderColor: 'var(--joy-palette-neutral-800)',
              boxShadow: 'inset 0px -1px 0px rgba(0, 0, 0, 0.07)',
            }),
            ...(ownerState.variant === 'plain' && {
              boxShadow: 'none',
            }),
          },
        }),
      },
    },
    JoyAlert: {
      defaultProps: {
        variant: 'soft',
        color: 'neutral',
      },
    },
  },
});

const useEnhancedEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

export default function JoyOrderDashboardTemplate() {
  const status = useScript(`https://unpkg.com/feather-icons`);

  useEnhancedEffect(() => {
    // Feather icon setup: https://github.com/feathericons/feather#4-replace
    // @ts-ignore
    if (typeof feather !== 'undefined') {
      // @ts-ignore
      feather.replace();
    }
  }, [status]);

  return (
    <CssVarsProvider disableTransitionOnChange>
      <GlobalStyles
        styles={(theme) => ({
          '[data-feather], .feather': {
            color: `var(--Icon-color, ${theme.vars.palette.text.icon})`,
            margin: 'var(--Icon-margin)',
            fontSize: `var(--Icon-fontSize, ${theme.vars.fontSize.xl})`,
            width: '1em',
            height: '1em',
          },
        })}
      />
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Header />
        <FirstSidebar />
        <SecondSidebar />
        <Box
          component="main"
          className="MainContent"
          sx={(theme) => ({
            px: {
              xs: 2,
              md: 6,
            },
            pt: {
              xs: `calc(${theme.spacing(2)} + var(--Header-height))`,
              sm: `calc(${theme.spacing(2)} + var(--Header-height))`,
              md: 3,
            },
            pb: {
              xs: 2,
              sm: 2,
              md: 3,
            },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
            gap: 1,
          })}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Breadcrumbs
              size="sm"
              aria-label="breadcrumbs"
              separator={<i data-feather="chevron-right" />}
              sx={{
                '--Breadcrumbs-gap': '1rem',
                '--Icon-fontSize': '16px',
                fontWeight: 'lg',
                color: 'neutral.400',
                px: 0,
              }}
            >
              <Link
                underline="none"
                color="neutral"
                fontSize="inherit"
                href="#some-link"
                aria-label="Home"
              >
                <i data-feather="home" />
              </Link>
              <Link
                underline="hover"
                color="neutral"
                fontSize="inherit"
                href="#some-link"
              >
                Dashboard
              </Link>
              <Typography fontSize="inherit" variant="plain" color="primary">
                Orders
              </Typography>
            </Breadcrumbs>
            <ColorSchemeToggle
              sx={{ ml: 'auto', display: { xs: 'none', md: 'inline-flex' } }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              my: 1,
              gap: 1,
              flexWrap: 'wrap',
              '& > *': {
                minWidth: 'clamp(0px, (500px - 100%) * 999, 100%)',
                flexGrow: 1,
              },
            }}
          >
            <Typography level="h1" fontSize="xl4">
              Orders
            </Typography>
            <Box sx={{ flex: 999 }} />
            <Box sx={{ display: 'flex', gap: 1, '& > *': { flexGrow: 1 } }}>
              <Button
                variant="outlined"
                color="neutral"
                startDecorator={<i data-feather="download-cloud" />}
              >
                Download PDF
              </Button>
              <Button
                variant="outlined"
                color="neutral"
                startDecorator={<i data-feather="table" />}
              >
                Download CSV
              </Button>
            </Box>
          </Box>
          <OrderTable />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
