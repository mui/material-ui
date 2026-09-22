import * as React from 'react';
import Head from 'next/head';
import { createTheme, ThemeProvider, useColorScheme, Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Autocomplete from '@mui/material/Autocomplete';
import Pagination from '@mui/material/Pagination';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Divider from '@mui/material/Divider';

declare module '@mui/material/styles' {
  interface StateGroupOverrides {
    solid: true;
    sub: true;
    input: true;
    ghost: true;
    plain: true;
    navigation: true;
    dataDisplay: true;
    field: true;
    feedback: true;
  }
}

// ---------------------------------------------------------------------------
// Neobrutalism look. Reference values: neobrutalism.dev (ekmas/neobrutalism-components)
// ---------------------------------------------------------------------------

function makeNeoTheme(): Theme {
  return createTheme({
    cssVariables: { colorSchemeSelector: 'class' },
    colorSchemes: {
      light: {
        palette: {
          primary: { main: '#5294FF', contrastText: '#000000' },
          secondary: { main: '#7A83FF', contrastText: '#000000' },
          error: { main: '#FF4D50', contrastText: '#000000' },
          warning: { main: '#FACC00', contrastText: '#000000' },
          success: { main: '#05E17A', contrastText: '#000000' },
          info: { main: '#7A83FF', contrastText: '#000000' },
          background: { default: '#DCEBFE', paper: '#FFFFFF' },
          text: { primary: '#000000', secondary: '#404040' },
          divider: '#000000',
        },
        state: {
          solid: {
            primary: {
              initial: {
                backgroundColor: '#5294FF',
                color: '#000000',
                border: '2px solid #000000',
                boxShadow: '4px 4px 0 0 #000000',
                transition: '0.15s',
              },
              hover: {
                transform: 'translate(4px, 4px)',
                boxShadow: 'none',
              },
              disabled: { opacity: 0.5 },
            },
            warning: {
              initial: {
                backgroundColor: '#FACC00',
                color: '#000000',
                border: '2px solid #000000',
                boxShadow: '4px 4px 0 0 #000000',
              },
            },
            error: {
              initial: {
                backgroundColor: '#FF4D50',
                color: '#000000',
                border: '2px solid #000000',
                boxShadow: '4px 4px 0 0 #000000',
              },
            },
            success: {
              initial: {
                backgroundColor: '#05E17A',
                color: '#000000',
                border: '2px solid #000000',
                boxShadow: '4px 4px 0 0 #000000',
              },
            },
            info: {
              initial: {
                backgroundColor: '#7A83FF',
                color: '#000000',
                border: '2px solid #000000',
                boxShadow: '4px 4px 0 0 #000000',
              },
            },
          },
          sub: {
            primary: {
              initial: {
                backgroundColor: '#FFFFFF',
                border: '2px solid #000000',
                boxShadow: '4px 4px 0 0 #000000',
                transition: '0.15s',
              },
              hover: {
                transform: 'translate(4px, 4px)',
                boxShadow: 'none',
              },
              disabled: { opacity: 0.5 },
            },
            error: {
              initial: {
                backgroundColor: '#FFFFFF',
                color: '#FF4D50',
                border: '2px solid #000000',
                boxShadow: '4px 4px 0 0 #000000',
                transition: '0.15s',
              },
              hover: {
                transform: 'translate(4px, 4px)',
                boxShadow: 'none',
              },
              disabled: { opacity: 0.5 },
            },
            default: {
              initial: {
                backgroundColor: '#FFFFFF',
                border: '2px solid #000000',
                boxShadow: '2px 2px 0 0 #000000',
                transition: '0.15s',
              },
              hover: {
                transform: 'translate(2px, 2px)',
                boxShadow: 'none',
              },
              disabled: { opacity: 0.5 },
            },
          },
          plain: {
            default: {
              initial: { borderWidth: '2px', borderColor: '#000000' },
              selected: { backgroundColor: '#000000', color: '#FFFFFF' },
              selectedHover: { backgroundColor: '#26262B' },
              disabled: { opacity: 0.5 },
            },
            primary: {
              initial: { borderWidth: '2px', borderColor: '#000000' },
              hover: { backgroundColor: 'rgba(82, 148, 255, 0.25)' },
              disabled: { opacity: 0.5 },
            },
            error: {
              initial: { color: '#FF4D50' },
              hover: { backgroundColor: 'rgba(255, 77, 80, 0.2)' },
              disabled: { opacity: 0.5 },
            },
          },
          navigation: {
            default: {
              initial: {
                border: '2px solid transparent',
              },
              hover: { backgroundColor: 'rgba(82, 148, 255, 0.25)' },
              active: { backgroundColor: 'rgba(82, 148, 255, 0.45)' },
              selected: {
                backgroundColor: '#5294FF',
                color: '#000000',
                border: '2px solid #000000',
              },
              selectedHover: { backgroundColor: '#3D82F6' },
              selectedActive: { backgroundColor: '#2F74E8' },
            },
          },
          field: {
            primary: {
              initial: {
                backgroundColor: '#FFFFFF',
                border: '2px solid #000000',
              },
              hover: { backgroundColor: '#FFFFFF' },
              focused: { boxShadow: '0 0 0 2px #FFFFFF, 0 0 0 4px #000000' },
              disabled: { opacity: 0.5 },
            },
            error: {
              initial: {
                backgroundColor: '#FFFFFF',
                color: '#FF4D50',
                border: '2px solid #FF4D50',
              },
              focused: { boxShadow: '0 0 0 2px #FFFFFF, 0 0 0 4px #FF4D50' },
            },
          },
        },
      },
      dark: {
        palette: {
          primary: { main: '#5294FF', contrastText: '#000000' },
          secondary: { main: '#7A83FF', contrastText: '#000000' },
          error: { main: '#FF4D50', contrastText: '#000000' },
          warning: { main: '#FACC00', contrastText: '#000000' },
          success: { main: '#05E17A', contrastText: '#000000' },
          info: { main: '#7A83FF', contrastText: '#000000' },
          background: { default: '#1D1F27', paper: '#212121' },
          text: { primary: '#F5F5F5', secondary: '#B8B8B8' },
          divider: 'rgba(255, 255, 255, 0.2)',
        },
        state: {
          solid: {
            primary: {
              initial: {
                backgroundColor: '#5294FF',
                color: '#000000',
                border: '2px solid #000000',
                boxShadow: '4px 4px 0 0 #000000',
                transition: '0.15s',
              },
              hover: {
                transform: 'translate(4px, 4px)',
                boxShadow: 'none',
              },
              disabled: { opacity: 0.5 },
            },
            warning: {
              initial: {
                backgroundColor: '#FACC00',
                color: '#000000',
                border: '2px solid #000000',
                boxShadow: '4px 4px 0 0 #000000',
              },
            },
            error: {
              initial: {
                backgroundColor: '#FF4D50',
                color: '#000000',
                border: '2px solid #000000',
                boxShadow: '4px 4px 0 0 #000000',
              },
            },
            success: {
              initial: {
                backgroundColor: '#05E17A',
                color: '#000000',
                border: '2px solid #000000',
                boxShadow: '4px 4px 0 0 #000000',
              },
            },
            info: {
              initial: {
                backgroundColor: '#7A83FF',
                color: '#000000',
                border: '2px solid #000000',
                boxShadow: '4px 4px 0 0 #000000',
              },
            },
          },
          sub: {
            primary: {
              initial: {
                backgroundColor: '#2E2E2E',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '4px 4px 0 0 #000000',
                transition: '0.15s',
              },
              hover: {
                transform: 'translate(4px, 4px)',
                boxShadow: 'none',
              },
              disabled: { opacity: 0.5 },
            },
            error: {
              initial: {
                backgroundColor: '#2E2E2E',
                color: '#FF4D50',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '4px 4px 0 0 #000000',
                transition: '0.15s',
              },
              hover: {
                transform: 'translate(4px, 4px)',
                boxShadow: 'none',
              },
              disabled: { opacity: 0.5 },
            },
            default: {
              initial: {
                backgroundColor: '#2E2E2E',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '2px 2px 0 0 #000000',
                transition: '0.15s',
              },
              hover: {
                transform: 'translate(2px, 2px)',
                boxShadow: 'none',
              },
              disabled: { opacity: 0.5 },
            },
          },
          plain: {
            default: {
              initial: { borderWidth: '2px', borderColor: 'rgba(255, 255, 255, 0.2)' },
              selected: { backgroundColor: '#F5F5F5', color: '#000000' },
              selectedHover: { backgroundColor: '#D6D6D6' },
              disabled: { opacity: 0.5 },
            },
            primary: {
              initial: { borderWidth: '2px', borderColor: 'rgba(255, 255, 255, 0.2)' },
              hover: { backgroundColor: 'rgba(82, 148, 255, 0.35)' },
              disabled: { opacity: 0.5 },
            },
            error: {
              initial: { color: '#FF4D50' },
              hover: { backgroundColor: 'rgba(255, 77, 80, 0.2)' },
              disabled: { opacity: 0.5 },
            },
          },
          navigation: {
            default: {
              initial: {
                border: '2px solid transparent',
              },
              hover: { backgroundColor: 'rgba(82, 148, 255, 0.35)' },
              active: { backgroundColor: 'rgba(82, 148, 255, 0.45)' },
              selected: {
                backgroundColor: '#5294FF',
                color: '#000000',
                border: '2px solid #000000',
              },
              selectedHover: { backgroundColor: '#3D82F6' },
              selectedActive: { backgroundColor: '#2F74E8' },
            },
          },
          field: {
            primary: {
              initial: {
                backgroundColor: '#2E2E2E',
                border: '2px solid rgba(255, 255, 255, 0.2)',
              },
              hover: { backgroundColor: '#2E2E2E' },
              focused: { boxShadow: '0 0 0 2px #212121, 0 0 0 4px #FFFFFF' },
              disabled: { opacity: 0.5 },
            },
            error: {
              initial: {
                backgroundColor: '#2E2E2E',
                color: '#FF4D50',
                border: '2px solid #FF4D50',
              },
              focused: { boxShadow: '0 0 0 2px #212121, 0 0 0 4px #FF4D50' },
            },
          },
        },
      },
    },
    shape: { borderRadius: 5 },
    typography: {
      fontFamily: '"DM Sans", "DM Sans Fallback", sans-serif',
      fontWeightRegular: 500,
      fontWeightMedium: 500,
      fontWeightBold: 700,
      h6: { fontWeight: 700 },
      subtitle2: { fontWeight: 700 },
      button: { textTransform: 'none', fontWeight: 700 },
    },
    focusVisible: true,
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: ({ theme }) => ({
            border: `2px solid ${(theme.vars || theme).palette.divider}`,
            boxShadow: '4px 4px 0 0 #000000',
            borderRadius: theme.shape.borderRadius,
            backgroundImage: 'none',
          }),
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderBottom: `2px solid ${(theme.vars || theme).palette.divider}`,
          }),
          head: { fontWeight: 700 },
        },
      },
      MuiToggleButton: {
        stateVariants: { default: 'plain' },
      },
      MuiButton: {
        styleOverrides: {
          root: { fontWeight: 700 },
        },
        stateVariants: {
          default: 'solid',
          contained: 'solid',
          outlined: 'sub',
          text: 'plain',
        },
      },
      MuiChip: {
        styleOverrides: {
          root: ({ theme }) => ({
            fontWeight: 700,
            borderRadius: 999,
            border: `2px solid ${(theme.vars || theme).palette.divider}`,
          }),
        },
      },
      MuiFilledInput: {
        defaultProps: { disableUnderline: true },
        styleOverrides: {
          root: ({ theme }) => ({ borderRadius: (theme.vars || theme).shape.borderRadius }),
        },
        stateVariants: { default: 'field' },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: ({ theme }) => ({
            fontWeight: 700,
            '&.Mui-focused': { color: (theme.vars || theme).palette.text.primary },
          }),
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: { fontWeight: 500 },
        },
        stateVariants: { standard: 'solid' },
      },
      MuiMenu: {
        styleOverrides: {
          paper: { boxShadow: '4px 4px 0 0 #000000' },
          list: { padding: 8 },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: ({ theme }) => ({ borderRadius: (theme.vars || theme).shape.borderRadius }),
        },
        stateVariants: { default: 'navigation' },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: (theme.vars || theme).shape.borderRadius,
            margin: '0 8px',
            width: 'auto',
          }),
        },
        stateVariants: { default: 'navigation' },
      },
      MuiPaginationItem: {
        styleOverrides: {
          root: ({ theme }) => ({
            fontWeight: 700,
            borderRadius: (theme.vars || theme).shape.borderRadius,
          }),
        },
        stateVariants: { default: 'plain', text: 'plain' },
      },
      MuiAutocomplete: {
        styleOverrides: {
          listbox: { padding: 8 },
          option: ({ theme }) => ({ borderRadius: (theme.vars || theme).shape.borderRadius }),
        },
        stateVariants: { default: 'navigation' },
      },
      MuiTableRow: {
        stateVariants: { default: 'plain' },
      },
    },
  });
}

// ---------------------------------------------------------------------------
// Custom look: a design system driven purely by tokens — palette + state
// groups + bindings, no styleOverrides. Structure stays stock Material;
// every interaction color comes from the state groups.
// ---------------------------------------------------------------------------

function makeCustomTheme(): Theme {
  return createTheme({
    focusVisible: true,
    shape: {
      borderRadius: 6,
    },
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
    cssVariables: { colorSchemeSelector: 'class' },
    colorSchemes: {
      light: {
        palette: {
          primary: { main: '#006DA2' },
          secondary: { main: '#363636' },
          error: { main: '#D13F3F' },
        },
        state: {
          input: {
            default: {
              initial: {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            },
            primary: {
              initial: {
                backgroundColor: '#006DA2',
                color: '#FFFFFF',
                borderColor: 'rgba(0, 0, 0, 0.15)',
              },
              hover: { backgroundColor: '#006698' },
              active: {
                backgroundColor: '#005F8E',
              },
              disabled: {
                opacity: 0.5,
              },
            },
            secondary: {
              initial: {
                backgroundColor: 'rgba(255, 255, 255, 0)',
                color: '#363636',
                borderColor: 'rgba(0, 0, 0, 0.15)',
              },
              hover: { backgroundColor: 'rgba(0, 0, 0, 0.05)' },
              active: {
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              },
              disabled: {
                opacity: 0.5,
              },
            },
            error: {
              initial: {
                backgroundColor: '#D13F3F',
                color: '#FFFFFF',
                borderColor: 'rgba(0, 0, 0, 0.15)',
              },
              hover: { backgroundColor: '#C83838' },
              active: {
                backgroundColor: '#BE3232',
              },
              disabled: {
                opacity: 0.5,
              },
            },
          },
          ghost: {
            default: {
              initial: {
                color: '#363636',
                borderColor: 'rgba(0, 0, 0, 0.15)',
              },
              hover: { backgroundColor: 'rgba(0, 0, 0, 0.05)' },
              active: {
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              },
              disabled: {
                opacity: 0.5,
              },
            },
            primary: {
              initial: {
                color: '#006DA2',
                borderColor: 'rgba(0, 0, 0, 0.15)',
              },
              hover: { backgroundColor: 'rgba(0, 0, 0, 0.05)' },
              active: {
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              },
              disabled: {
                opacity: 0.5,
              },
            },
            secondary: {
              initial: {
                color: '#363636',
                borderColor: 'rgba(0, 0, 0, 0.15)',
              },
              hover: { backgroundColor: 'rgba(0, 0, 0, 0.05)' },
              active: {
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              },
              disabled: {
                opacity: 0.5,
              },
            },
            error: {
              initial: {
                color: '#D13F3F',
                borderColor: 'rgba(0, 0, 0, 0.15)',
              },
              hover: { backgroundColor: 'rgba(0, 0, 0, 0.05)' },
              active: {
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              },
              disabled: {
                opacity: 0.5,
              },
            },
          },
          navigation: {
            default: {
              hover: { backgroundColor: 'rgba(0, 0, 0, 0.05)' },
              active: { backgroundColor: 'rgba(0, 0, 0, 0.1)' },
              selected: {
                boxShadow: 'inset 0 0 0 1px rgba(0, 109, 162, 0.7)',
                backgroundColor: 'rgba(205, 234, 247, 0.4)',
              },
              selectedHover: {
                backgroundColor: 'rgba(155, 213, 239, 0.35)',
              },
              selectedActive: {
                backgroundColor: 'rgba(106, 192, 231, 0.35)',
              },
              disabled: { opacity: 50 / 100 },
            },
          },
          field: {
            primary: {
              initial: {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                borderColor: 'rgba(0, 0, 0, 0.15)',
              },
              hover: {
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                borderColor: 'rgba(0, 0, 0, 0.4)',
              },
              focused: {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                borderColor: '#006DA2',
              },
              disabled: {
                borderColor: 'rgba(0, 0, 0, 0.1)',
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                opacity: 0.5,
              },
            },
            error: {
              initial: { borderColor: '#D13F3F' },
              focused: { borderColor: '#D13F3F' },
            },
          },
          dataDisplay: {
            default: {
              initial: {
                backgroundColor: '#FFFFFF',
                color: '#363636',
                borderColor: 'rgba(0, 0, 0, 0.15)',
              },
              hover: {
                backgroundColor: '#F0F0F0',
              },
              active: {
                backgroundColor: '#E5E5E5',
              },
              selected: {
                borderColor: 'rgba(0, 109, 162, 0.7)',
                backgroundColor: 'rgba(205, 234, 247, 0.4)',
              },
              selectedHover: {
                backgroundColor: 'rgba(155, 213, 239, 0.35)',
              },
              selectedActive: {
                backgroundColor: 'rgba(106, 192, 231, 0.35)',
              },
              disabled: {
                opacity: 0.5,
              },
            },
            primary: {
              initial: {
                backgroundColor: 'rgba(205, 234, 247, 0.4)',
                color: '#363636',
                borderColor: 'rgba(0, 109, 162, 0.7)',
              },
              hover: {
                backgroundColor: 'rgba(155, 213, 239, 0.35)',
              },
              active: {
                backgroundColor: 'rgba(106, 192, 231, 0.35)',
              },
            },
          },
          feedback: {
            success: {
              initial: {
                backgroundColor: '#F3F7EC',
                color: '#547919',
                borderColor: 'rgba(84, 121, 25, 0.2)',
                borderLeft: '6px solid #547919',
              },
            },
            info: {
              initial: {
                backgroundColor: '#E6F5FB',
                color: '#006698',
                borderColor: 'rgba(0, 109, 162, 0.2)',
                borderLeft: '6px solid #006DA2',
              },
            },
            warning: {
              initial: {
                backgroundColor: '#FFF9E8',
                color: '#8C530E',
                borderColor: 'rgba(140, 83, 14, 0.2)',
                borderLeft: '6px solid #FFC21A',
              },
            },
            error: {
              initial: {
                backgroundColor: '#FDEEEE',
                color: '#A62626',
                borderColor: 'rgba(209, 63, 63, 0.2)',
                borderLeft: '6px solid #D13F3F',
              },
            },
          },
        },
      },
      dark: {
        palette: {
          primary: { main: '#38ABDF' },
          secondary: { main: '#FFFFFF' },
          error: { main: '#F18888' },
        },
        state: {
          input: {
            primary: {
              initial: {
                backgroundColor: '#38ABDF',
                color: '#080808',
              },
              hover: { backgroundColor: '#44B0E1' },
              active: {
                backgroundColor: '#51B6E3',
              },
            },
            error: {
              initial: {
                backgroundColor: '#F18888',
                color: '#080808',
              },
              hover: { backgroundColor: '#F29191' },
              active: { backgroundColor: '#F39999' },
            },
          },
          ghost: {
            default: {
              initial: {
                color: '#FFFFFF',
                borderColor: 'rgba(255, 255, 255, 0.3)',
              },
              hover: {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
              active: {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
            },
            primary: {
              initial: {
                color: '#38ABDF',
                borderColor: '#38ABDF',
              },
              hover: {
                backgroundColor: '#081B34',
              },
            },
            error: {
              initial: { color: '#F18888' },
              hover: {
                backgroundColor: '#330505',
              },
            },
          },
          navigation: {
            default: {
              hover: {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
              active: {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              },
              selected: {
                backgroundColor: 'rgba(56, 171, 223, 0.3)',
              },
              selectedHover: {
                backgroundColor: 'rgba(56, 171, 223, 0.4)',
              },
              selectedActive: {
                backgroundColor: 'rgba(56, 171, 223, 0.5)',
              },
              disabled: { opacity: 50 / 100 },
            },
          },
          field: {
            primary: {
              initial: {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.3)',
              },
              hover: {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderColor: 'rgba(255, 255, 255, 0.5)',
              },
              focused: { borderColor: '#38ABDF' },
              disabled: { borderColor: 'rgba(255, 255, 255, 0.2)' },
            },
            error: {
              initial: { borderColor: '#F18888' },
              focused: { borderColor: '#F18888' },
            },
          },
          dataDisplay: {
            default: {
              initial: {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
              },
              hover: {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
              active: {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              },
              selected: {
                backgroundColor: 'rgba(56, 171, 223, 0.3)',
              },
              selectedHover: {
                backgroundColor: 'rgba(56, 171, 223, 0.4)',
              },
              selectedActive: {
                backgroundColor: 'rgba(56, 171, 223, 0.5)',
              },
            },
            primary: {
              initial: {
                backgroundColor: 'rgba(56, 171, 223, 0.3)',
                color: '#FFFFFF',
              },
              hover: {
                backgroundColor: 'rgba(56, 171, 223, 0.4)',
              },
              active: {
                backgroundColor: 'rgba(56, 171, 223, 0.5)',
              },
            },
          },
          feedback: {
            success: {
              initial: {
                backgroundColor: '#1D2D04',
                color: '#CFE1B3',
                borderColor: 'rgba(171, 202, 121, 0.3)',
              },
            },
            info: {
              initial: {
                backgroundColor: '#081B34',
                color: '#C1E5F5',
                borderColor: 'rgba(56, 171, 223, 0.3)',
              },
            },
            warning: {
              initial: {
                backgroundColor: '#331805',
                color: '#FFEDBA',
                borderColor: 'rgba(255, 209, 83, 0.3)',
              },
            },
            error: {
              initial: {
                backgroundColor: '#330505',
                color: '#FAD5D5',
                borderColor: 'rgba(241, 136, 136, 0.3)',
              },
            },
          },
        },
      },
    },
    components: {
      MuiButtonBase: { defaultProps: { disableRipple: true } },
      MuiButton: {
        defaultProps: { disableElevation: true },
        stateVariants: {
          default: 'ghost',
          contained: 'input',
          outlined: 'ghost',
          text: 'ghost',
        },
      },
      MuiMenuItem: {
        stateVariants: { default: 'navigation' },
      },
      MuiChip: {
        stateVariants: {
          default: 'dataDisplay',
          filled: 'input',
          outlined: 'dataDisplay',
        },
      },
      MuiFilledInput: {
        stateVariants: {
          default: 'field',
        },
      },
      MuiListItemButton: {
        stateVariants: {
          default: 'navigation',
        },
      },
      MuiTableRow: {
        stateVariants: {
          default: 'dataDisplay',
        },
      },
      MuiAutocomplete: {
        stateVariants: {
          default: 'navigation',
        },
      },
      MuiPaginationItem: {
        stateVariants: {
          default: 'navigation',
          text: 'navigation',
        },
      },
      MuiToggleButton: {
        stateVariants: {
          default: 'dataDisplay',
        },
      },
      MuiAlert: {
        stateVariants: {
          standard: 'feedback',
          outlined: 'feedback',
        },
      },
    },
  });
}

const themes: Record<string, { label: string; theme: Theme }> = {
  material: {
    label: 'Material',
    theme: createTheme({
      cssVariables: { colorSchemeSelector: 'class' },
      colorSchemes: { light: true, dark: true },
    }),
  },
  neo: {
    label: 'Neobrutalism',
    theme: makeNeoTheme(),
  },
  custom: {
    label: 'Custom',
    theme: makeCustomTheme(),
  },
};

// ---------------------------------------------------------------------------
// Mail data
// ---------------------------------------------------------------------------

const folders = [
  { name: 'Inbox', count: 12 },
  { name: 'Sent', count: 0 },
  { name: 'Drafts', count: 2 },
  { name: 'Archive', count: 0 },
];

const messages = [
  {
    id: 1,
    from: 'Riley Chen',
    subject: 'Design review notes for the settings page',
    date: 'Sep 21',
    body: 'Attached the notes from this morning. The spacing scale needs one more pass before we hand it off — can you take a look at rows 12 through 18?',
  },
  {
    id: 2,
    from: 'Amara Diallo',
    subject: 'Re: Quarterly infrastructure budget',
    date: 'Sep 21',
    body: 'The revised numbers are in. We are under by 8% if the migration finishes this quarter.',
  },
  {
    id: 3,
    from: 'Build Bot',
    subject: 'Nightly build #4182 passed',
    date: 'Sep 20',
    body: 'All 2,431 tests green. Bundle size delta +0.2 KB.',
  },
  {
    id: 4,
    from: 'Priya Nair',
    subject: 'Team offsite: venue shortlist',
    date: 'Sep 20',
    body: 'Three options inside budget. My vote is the second one — has the best workshop rooms.',
  },
  {
    id: 5,
    from: 'Jonas Weber',
    subject: 'Customer feedback digest, week 38',
    date: 'Sep 19',
    body: 'Highlights: onboarding praise up, two requests for keyboard shortcuts in the editor.',
  },
];

const filterOptions = ['Unread', 'Starred', 'Attachments', 'Mentions'];

// ---------------------------------------------------------------------------
// The pane
// ---------------------------------------------------------------------------

function MailPane() {
  const [folder, setFolder] = React.useState('Inbox');
  const [selectedId, setSelectedId] = React.useState<number | null>(2);
  const [view, setView] = React.useState<'comfortable' | 'compact'>('comfortable');
  const [filters, setFilters] = React.useState<string[]>(['Unread']);
  const [sortAnchor, setSortAnchor] = React.useState<null | HTMLElement>(null);
  const [sortBy, setSortBy] = React.useState('Date');
  const [replyTo, setReplyTo] = React.useState('riley@example.com');
  const [replyBody, setReplyBody] = React.useState('');
  const [sent, setSent] = React.useState(false);

  const selected = messages.find((message) => message.id === selectedId) ?? null;
  const replyToError = replyTo.length > 0 && !replyTo.includes('@');

  return (
    <Paper elevation={0} sx={{ display: 'flex', overflow: 'hidden', minHeight: 640 }}>
      <Box
        sx={{
          width: 200,
          flexShrink: 0,
          borderRight: '2px solid',
          borderColor: 'divider',
          py: 1,
        }}
      >
        <Typography variant="subtitle2" sx={{ px: 2, py: 1 }}>
          Mail
        </Typography>
        <List disablePadding>
          {folders.map((item) => (
            <ListItemButton
              key={item.name}
              selected={folder === item.name}
              onClick={() => setFolder(item.name)}
            >
              <ListItemText
                primary={item.name}
                secondary={item.count > 0 ? `${item.count} unread` : null}
                slotProps={{ secondary: { color: 'inherit', sx: { opacity: 0.7 } } }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Stack sx={{ flexGrow: 1, minWidth: 0, p: 2, gap: 2 }}>
        <Stack direction="row" sx={{ gap: 1.5, alignItems: 'center', flexWrap: 'wrap' }}>
          <Button variant="contained" onClick={() => setSent(false)}>
            Compose
          </Button>
          <Button variant="outlined">Archive</Button>
          <Button variant="outlined" color="error">
            Delete
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <ToggleButtonGroup
            exclusive
            size="small"
            value={view}
            onChange={(event, next) => next && setView(next)}
          >
            <ToggleButton value="comfortable">Cozy</ToggleButton>
            <ToggleButton value="compact">Compact</ToggleButton>
          </ToggleButtonGroup>
          <Button variant="text" onClick={(event) => setSortAnchor(event.currentTarget)}>
            Sort: {sortBy}
          </Button>
          <Menu
            anchorEl={sortAnchor}
            open={Boolean(sortAnchor)}
            onClose={() => setSortAnchor(null)}
          >
            {['Date', 'Sender', 'Subject'].map((option) => (
              <MenuItem
                key={option}
                selected={option === sortBy}
                onClick={() => {
                  setSortBy(option);
                  setSortAnchor(null);
                }}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Stack>

        <Stack direction="row" sx={{ gap: 1.5, alignItems: 'center', flexWrap: 'wrap' }}>
          <Autocomplete
            options={messages.map((message) => message.subject)}
            sx={{ width: 320 }}
            renderInput={(params) => (
              <TextField {...params} variant="filled" label="Search mail" size="small" />
            )}
          />
          {filterOptions.map((filter) => {
            const active = filters.includes(filter);
            return (
              <Chip
                key={filter}
                label={filter}
                variant={active ? 'filled' : 'outlined'}
                color={active ? 'primary' : 'default'}
                onClick={() =>
                  setFilters((prev) =>
                    active ? prev.filter((f) => f !== filter) : [...prev, filter],
                  )
                }
                onDelete={
                  active ? () => setFilters((prev) => prev.filter((f) => f !== filter)) : undefined
                }
              />
            );
          })}
        </Stack>

        <Alert
          severity="warning"
          action={
            <Button color="inherit" size="small" variant="text">
              Upgrade
            </Button>
          }
        >
          Your mailbox is 90% full — archive old mail to free space.
        </Alert>
        {sent ? <Alert severity="success">Reply sent.</Alert> : null}

        <Table size={view === 'compact' ? 'small' : 'medium'}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 160 }}>From</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell align="right" sx={{ width: 80 }}>
                Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages.map((message) => (
              <TableRow
                key={message.id}
                hover
                selected={message.id === selectedId}
                onClick={() => setSelectedId(message.id)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell sx={{ color: 'inherit' }}>{message.from}</TableCell>
                <TableCell sx={{ color: 'inherit' }}>{message.subject}</TableCell>
                <TableCell align="right" sx={{ color: 'inherit' }}>
                  {message.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Stack direction="row" sx={{ justifyContent: 'center' }}>
          <Pagination count={3} page={1} />
        </Stack>

        {selected ? (
          <Paper elevation={0} sx={{ p: 2 }}>
            <Typography variant="subtitle2">{selected.subject}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
              {selected.from} · {selected.date}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {selected.body}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack sx={{ gap: 1.5 }}>
              <TextField
                variant="filled"
                label="To"
                size="small"
                value={replyTo}
                error={replyToError}
                helperText={replyToError ? 'Enter a valid address' : ' '}
                onChange={(event) => setReplyTo(event.target.value)}
                sx={{ width: 320 }}
              />
              <TextField
                variant="filled"
                label={`Reply to ${selected.from}`}
                multiline
                minRows={2}
                value={replyBody}
                error={replyBody.trim().length === 0}
                helperText={replyBody.trim().length === 0 ? 'Message is required' : ' '}
                onChange={(event) => {
                  setReplyBody(event.target.value);
                  setSent(false);
                }}
              />
              <Stack direction="row" sx={{ gap: 1.5 }}>
                <Button
                  variant="contained"
                  disabled={replyBody.trim().length === 0 || replyToError}
                  onClick={() => {
                    setSent(true);
                    setReplyBody('');
                  }}
                >
                  Send
                </Button>
                <Button variant="text" onClick={() => setReplyBody('')}>
                  Discard
                </Button>
              </Stack>
            </Stack>
          </Paper>
        ) : null}
      </Stack>
    </Paper>
  );
}

// ---------------------------------------------------------------------------
// Chrome
// ---------------------------------------------------------------------------

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  return (
    <ToggleButtonGroup
      exclusive
      size="small"
      value={mode ?? 'light'}
      onChange={(event, next) => next && setMode(next)}
    >
      <ToggleButton value="light">Light</ToggleButton>
      <ToggleButton value="dark">Dark</ToggleButton>
    </ToggleButtonGroup>
  );
}

function ConfigViewer({ theme }: { theme: Theme }) {
  const bindings = Object.fromEntries(
    Object.entries(theme.components ?? {}).flatMap(([key, value]) => {
      const stateVariants = (value as { stateVariants?: unknown })?.stateVariants;
      return stateVariants ? [[key, { stateVariants }]] : [];
    }),
  );
  return (
    <Box component="details" sx={{ mt: 2, fontFamily: 'monospace', fontSize: 13 }}>
      <Box component="summary" sx={{ cursor: 'pointer', mb: 1 }}>
        View the `state` + `stateVariants` config powering this look
      </Box>
      <Box
        component="pre"
        sx={{
          m: 0,
          p: 2,
          overflow: 'auto',
          maxHeight: 420,
          bgcolor: 'rgba(0, 0, 0, 0.06)',
          borderRadius: 1,
        }}
      >
        {JSON.stringify(
          {
            colorSchemes: {
              light: { state: (theme.colorSchemes as any)?.light?.state ?? {} },
              dark: { state: (theme.colorSchemes as any)?.dark?.state ?? {} },
            },
            components: bindings,
          },
          null,
          2,
        )}
      </Box>
    </Box>
  );
}

export default function StatesShowcase() {
  const [look, setLook] = React.useState<'material' | 'neo' | 'custom'>('neo');
  const theme = themes[look].theme;

  return (
    <ThemeProvider theme={theme} defaultMode="light" disableTransitionOnChange>
      <Head>
        <title>theme.state showcase</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap"
        />
      </Head>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', p: { xs: 2, md: 4 } }}>
        <Box sx={{ maxWidth: 1080, mx: 'auto' }}>
          <Stack direction="row" sx={{ gap: 2, alignItems: 'center', flexWrap: 'wrap', mb: 1 }}>
            <Typography variant="h6" sx={{ mr: 'auto' }}>
              One mail app, three design systems
            </Typography>
            <ToggleButtonGroup
              exclusive
              size="small"
              value={look}
              onChange={(event, next) => next && setLook(next)}
            >
              {Object.entries(themes).map(([key, value]) => (
                <ToggleButton key={key} value={key}>
                  {value.label}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
            <ModeToggle />
          </Stack>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
            Every component below is unmodified <code>@mui/material</code>. The look — including
            every hover, press, selection, focus, and disabled — comes from the theme: user-defined{' '}
            <code>state</code> groups bound per variant with <code>stateVariants</code>.
          </Typography>
          <MailPane />
          <ConfigViewer theme={theme} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
