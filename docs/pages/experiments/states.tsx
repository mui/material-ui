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
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';

declare module '@mui/material/styles' {
  interface StateGroupOverrides {
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

function makeNeoTheme(bound: boolean): Theme {
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
          // solid controls: Button contained, Chip filled
          input: {
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
            default: {
              initial: {
                backgroundColor: '#FFFFFF',
                color: '#000000',
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
          // outlined quiet controls: Button outlined, Chip outlined
          ghost: {
            primary: {
              initial: {
                backgroundColor: '#FFFFFF',
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
                color: '#000000',
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
          // borderless quiet controls: Button text
          plain: {
            primary: {
              initial: { color: '#000000' },
              hover: { backgroundColor: 'rgba(82, 148, 255, 0.25)' },
              disabled: { opacity: 0.5 },
            },
            error: {
              initial: { color: '#FF4D50' },
              hover: { backgroundColor: 'rgba(255, 77, 80, 0.2)' },
              disabled: { opacity: 0.5 },
            },
          },
          // list rows: ListItemButton, MenuItem, Autocomplete options
          navigation: {
            default: {
              hover: { backgroundColor: 'rgba(82, 148, 255, 0.25)' },
              active: { backgroundColor: 'rgba(82, 148, 255, 0.45)' },
              selected: { backgroundColor: '#5294FF', color: '#000000' },
              selectedHover: { backgroundColor: '#3D82F6' },
              selectedActive: { backgroundColor: '#2F74E8' },
            },
          },
          // data selection: TableRow, ToggleButton, PaginationItem
          dataDisplay: {
            default: {
              hover: { backgroundColor: 'rgba(82, 148, 255, 0.15)' },
              selected: { backgroundColor: '#000000', color: '#FFFFFF' },
              selectedHover: { backgroundColor: '#26262B' },
              disabled: { opacity: 0.5 },
            },
          },
          // text fields: FilledInput (resolved by the input's color prop — primary by default)
          field: {
            primary: {
              initial: {
                backgroundColor: '#FFFFFF',
                color: '#000000',
                border: '2px solid #000000',
              },
              hover: { backgroundColor: '#FFFFFF' },
              focused: { boxShadow: '4px 4px 0 0 #000000' },
              disabled: { opacity: 0.5 },
            },
            error: {
              initial: {
                backgroundColor: '#FFFFFF',
                color: '#FF4D50',
                border: '2px solid #FF4D50',
              },
              focused: { boxShadow: '4px 4px 0 0 #FF4D50' },
            },
          },
          // alerts
          feedback: {
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
          divider: '#000000',
        },
        state: {
          input: {
            primary: {
              initial: {
                backgroundColor: '#5294FF',
                color: '#000000',
                border: '2px solid #000000',
                boxShadow: '4px 4px 0 0 #000000',
              },
              hover: { transform: 'translate(2px, 2px)', boxShadow: '2px 2px 0 0 #000000' },
              disabled: { opacity: 0.5 },
            },
            default: {
              initial: {
                backgroundColor: '#2E2E2E',
                color: '#F5F5F5',
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
          ghost: {
            primary: {
              initial: {
                backgroundColor: '#2E2E2E',
                color: '#F5F5F5',
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
                backgroundColor: '#2E2E2E',
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
                backgroundColor: '#2E2E2E',
                color: '#F5F5F5',
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
            primary: {
              initial: { color: '#F5F5F5' },
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
              hover: { backgroundColor: 'rgba(82, 148, 255, 0.35)' },
              active: { backgroundColor: 'rgba(82, 148, 255, 0.45)' },
              selected: { backgroundColor: '#5294FF', color: '#000000' },
              selectedHover: { backgroundColor: '#3D82F6' },
              selectedActive: { backgroundColor: '#2F74E8' },
            },
          },
          dataDisplay: {
            default: {
              hover: { backgroundColor: 'rgba(82, 148, 255, 0.25)' },
              selected: { backgroundColor: '#F5F5F5', color: '#000000' },
              selectedHover: { backgroundColor: '#D6D6D6' },
              disabled: { opacity: 0.5 },
            },
          },
          field: {
            primary: {
              initial: {
                backgroundColor: '#2E2E2E',
                color: '#F5F5F5',
                border: '2px solid #000000',
              },
              hover: { backgroundColor: '#2E2E2E' },
              focused: { boxShadow: '4px 4px 0 0 #000000' },
              disabled: { opacity: 0.5 },
            },
            error: {
              initial: {
                backgroundColor: '#2E2E2E',
                color: '#FF4D50',
                border: '2px solid #FF4D50',
              },
              focused: { boxShadow: '4px 4px 0 0 #FF4D50' },
            },
          },
          feedback: {
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
    focusVisible: {
      outlineWidth: 2,
      outlineColor: 'var(--mui-palette-text-primary)',
      outlineOffset: 2,
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: ({ theme }) => ({
            border: '2px solid #000000',
            boxShadow: '4px 4px 0 0 #000000',
            borderRadius: theme.shape.borderRadius,
            backgroundImage: 'none',
          }),
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: { borderBottom: '2px solid #000000' },
          head: { fontWeight: 700 },
        },
      },
      MuiToggleButtonGroup: {
        styleOverrides: {
          root: {
            border: '2px solid #000000',
            borderRadius: 5,
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: { border: 'none', borderRadius: 0, fontWeight: 700 },
        },
        ...(bound && { stateVariants: { default: 'dataDisplay' } }),
      },
      MuiButton: {
        styleOverrides: {
          root: { fontWeight: 700, borderRadius: 5 },
        },
        ...(bound && {
          stateVariants: {
            default: 'input',
            contained: 'input',
            outlined: 'ghost',
            text: 'plain',
          },
        }),
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 700,
            borderRadius: 999,
            border: '2px solid #000000',
          },
        },
      },
      MuiFilledInput: {
        defaultProps: { disableUnderline: true },
        styleOverrides: {
          root: { borderRadius: 5 },
        },
        ...(bound && { stateVariants: { default: 'field' } }),
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
          root: { borderRadius: 5, fontWeight: 500 },
        },
        ...(bound && { stateVariants: { standard: 'feedback' } }),
      },
      MuiMenu: {
        styleOverrides: {
          paper: { boxShadow: '4px 4px 0 0 #000000' },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: { borderRadius: 5, margin: '0 8px', width: 'auto' },
        },
        ...(bound && { stateVariants: { default: 'navigation' } }),
      },
      MuiPaginationItem: {
        styleOverrides: {
          root: { fontWeight: 700, borderRadius: 5 },
        },
        ...(bound && { stateVariants: { default: 'dataDisplay', text: 'dataDisplay' } }),
      },
      ...(bound && {
        MuiMenuItem: { stateVariants: { default: 'navigation' } },
        MuiAutocomplete: { stateVariants: { default: 'navigation' } },
        MuiTableRow: { stateVariants: { default: 'dataDisplay' } },
      }),
    },
  });
}

// ---------------------------------------------------------------------------
// Radix look. Reference values: Radix Themes / Radix Colors (radix-ui/themes,
// radix-ui/colors) — 12-step scales; states use the documented steps:
// solid rest/hover = 9/10 (+ active filter), soft rest/hover/active = a3/a4/a5,
// surface = accent-surface bg + a7 ring -> a8 on hover,
// disabled = grayA3 bg + grayA8 text.
// ---------------------------------------------------------------------------

function makeRadixTheme(bound: boolean): Theme {
  return createTheme({
    cssVariables: { colorSchemeSelector: 'class' },
    colorSchemes: {
      light: {
        palette: {
          primary: { main: '#0090ff', contrastText: '#ffffff' },
          error: { main: '#e5484d' },
          warning: { main: '#ffc53d' },
          success: { main: '#30a46c' },
          info: { main: '#0090ff' },
          background: { default: '#fcfcfd', paper: '#ffffff' },
          text: { primary: '#1c2024', secondary: '#60646c' },
          divider: '#00002f26',
        },
        state: {
          // solid: Button contained, Chip filled — accent 9 -> 10 -> 10 + filter
          input: {
            primary: {
              initial: { backgroundColor: '#0090ff', color: '#ffffff' },
              hover: { backgroundColor: '#0588f0' },
              active: { backgroundColor: '#0588f0', filter: 'brightness(0.92) saturate(1.1)' },
              disabled: { backgroundColor: '#0000330f', color: '#00083046' },
            },
            default: {
              initial: { backgroundColor: '#0000330f', color: '#1c2024' },
              hover: { backgroundColor: '#00002d17' },
              active: { backgroundColor: '#0009321f' },
              disabled: { backgroundColor: '#0000330f', color: '#00083046' },
            },
          },
          // surface: Button outlined, Chip outlined — a7 ring -> a8, soft press fill
          ghost: {
            primary: {
              initial: {
                backgroundColor: '#f1f9ffcc',
                borderColor: '#0083eb71',
                color: '#006dcbf2',
              },
              hover: { borderColor: '#0084e6a1' },
              active: { backgroundColor: '#008ff519', borderColor: '#0084e6a1' },
              disabled: {
                backgroundColor: '#0000330f',
                color: '#00083046',
                borderColor: '#00062e32',
              },
            },
            error: {
              initial: {
                backgroundColor: '#fff5f5cc',
                borderColor: '#df000356',
                color: '#c40006d3',
              },
              hover: { borderColor: '#d2000571' },
              active: { backgroundColor: '#f3000d14', borderColor: '#d2000571' },
              disabled: {
                backgroundColor: '#0000330f',
                color: '#00083046',
                borderColor: '#00062e32',
              },
            },
            default: {
              initial: { backgroundColor: '#ffffffcc', borderColor: '#00062e32', color: '#1c2024' },
              hover: { borderColor: '#00083046' },
              active: { backgroundColor: '#00002d17', borderColor: '#00083046' },
              disabled: {
                backgroundColor: '#0000330f',
                color: '#00083046',
                borderColor: '#00062e32',
              },
            },
          },
          // ghost: Button text — transparent -> a3 -> a4
          plain: {
            primary: {
              initial: { color: '#006dcbf2' },
              hover: { backgroundColor: '#008ff519' },
              active: { backgroundColor: '#009eff2a' },
              disabled: { color: '#00083046' },
            },
            error: {
              initial: { color: '#c40006d3' },
              hover: { backgroundColor: '#f3000d14' },
              active: { backgroundColor: '#ff000824' },
              disabled: { color: '#00083046' },
            },
          },
          // menu highlight: solid accent + contrast text; selection: soft a5
          navigation: {
            default: {
              hover: { backgroundColor: '#0090ff', color: '#ffffff' },
              active: { backgroundColor: '#0588f0', color: '#ffffff' },
              selected: { backgroundColor: '#0093ff3d' },
              selectedHover: { backgroundColor: '#0090ff', color: '#ffffff' },
              selectedActive: { backgroundColor: '#0588f0', color: '#ffffff' },
            },
          },
          // rows, toggles, pagination: gray wash hover, soft accent selection
          dataDisplay: {
            default: {
              hover: { backgroundColor: '#0000330f' },
              selected: { backgroundColor: '#0093ff3d' },
              selectedHover: { backgroundColor: '#0093ff3d' },
              disabled: { color: '#00083046' },
            },
          },
          // text fields: surface + gray a7 ring; focus = 2px accent-8 ring
          field: {
            primary: {
              initial: {
                backgroundColor: '#ffffff',
                border: '1px solid #00062e32',
                color: '#1c2024',
              },
              hover: { backgroundColor: '#ffffff' },
              focused: { outline: '2px solid #5eb1ef', outlineOffset: -1 },
              disabled: { backgroundColor: '#0000330f', color: '#00083046' },
            },
            error: {
              initial: {
                backgroundColor: '#ffffff',
                border: '1px solid #d2000571',
                color: '#ce2c31',
              },
              focused: { outline: '2px solid #d2000571', outlineOffset: -1 },
            },
          },
          // callouts: soft a3 fill + step-11 text, no border
          feedback: {
            warning: { initial: { backgroundColor: '#ffde003d', color: '#ab6400' } },
            error: { initial: { backgroundColor: '#f3000d14', color: '#ce2c31' } },
            success: { initial: { backgroundColor: '#00a43319', color: '#218358' } },
            info: { initial: { backgroundColor: '#008ff519', color: '#0d74ce' } },
          },
        },
      },
      dark: {
        palette: {
          primary: { main: '#0090ff', contrastText: '#ffffff' },
          error: { main: '#e5484d' },
          warning: { main: '#ffc53d' },
          success: { main: '#30a46c' },
          info: { main: '#0090ff' },
          background: { default: '#111113', paper: '#18191b' },
          text: { primary: '#edeef0', secondary: '#b0b4ba' },
          divider: '#d9edff36',
        },
        state: {
          input: {
            primary: {
              initial: { backgroundColor: '#0090ff', color: '#ffffff' },
              hover: { backgroundColor: '#3b9eff' },
              active: { backgroundColor: '#3b9eff', filter: 'brightness(1.08)' },
              disabled: { backgroundColor: '#ddeaf814', color: '#d9edff5d' },
            },
            default: {
              initial: { backgroundColor: '#ddeaf814', color: '#edeef0' },
              hover: { backgroundColor: '#d3edf81d' },
              active: { backgroundColor: '#d9edfe25' },
              disabled: { backgroundColor: '#ddeaf814', color: '#d9edff5d' },
            },
          },
          ghost: {
            primary: {
              initial: { backgroundColor: '#11213d80', borderColor: '#2a91fe98', color: '#70b8ff' },
              hover: { borderColor: '#3094feb9' },
              active: { backgroundColor: '#0077ff3a', borderColor: '#3094feb9' },
              disabled: {
                backgroundColor: '#ddeaf814',
                color: '#d9edff5d',
                borderColor: '#d9edff40',
              },
            },
            error: {
              initial: { backgroundColor: '#2f151780', borderColor: '#ff536184', color: '#ff9592' },
              hover: { borderColor: '#ff5d61b0' },
              active: { backgroundColor: '#ff173f2d', borderColor: '#ff5d61b0' },
              disabled: {
                backgroundColor: '#ddeaf814',
                color: '#d9edff5d',
                borderColor: '#d9edff40',
              },
            },
            default: {
              initial: { backgroundColor: '#21212180', borderColor: '#d9edff40', color: '#edeef0' },
              hover: { borderColor: '#d9edff5d' },
              active: { backgroundColor: '#d3edf81d', borderColor: '#d9edff5d' },
              disabled: {
                backgroundColor: '#ddeaf814',
                color: '#d9edff5d',
                borderColor: '#d9edff40',
              },
            },
          },
          plain: {
            primary: {
              initial: { color: '#70b8ff' },
              hover: { backgroundColor: '#0077ff3a' },
              active: { backgroundColor: '#0075ff57' },
              disabled: { color: '#d9edff5d' },
            },
            error: {
              initial: { color: '#ff9592' },
              hover: { backgroundColor: '#ff173f2d' },
              active: { backgroundColor: '#fe0a3b44' },
              disabled: { color: '#d9edff5d' },
            },
          },
          navigation: {
            default: {
              hover: { backgroundColor: '#0090ff', color: '#ffffff' },
              active: { backgroundColor: '#3b9eff', color: '#ffffff' },
              selected: { backgroundColor: '#0081fd6b' },
              selectedHover: { backgroundColor: '#0090ff', color: '#ffffff' },
              selectedActive: { backgroundColor: '#3b9eff', color: '#ffffff' },
            },
          },
          dataDisplay: {
            default: {
              hover: { backgroundColor: '#ddeaf814' },
              selected: { backgroundColor: '#0081fd6b' },
              selectedHover: { backgroundColor: '#0081fd6b' },
              disabled: { color: '#d9edff5d' },
            },
          },
          field: {
            primary: {
              initial: {
                backgroundColor: '#18191b',
                border: '1px solid #d9edff40',
                color: '#edeef0',
              },
              hover: { backgroundColor: '#18191b' },
              focused: { outline: '2px solid #2870bd', outlineOffset: -1 },
              disabled: { backgroundColor: '#ddeaf814', color: '#d9edff5d' },
            },
            error: {
              initial: {
                backgroundColor: '#18191b',
                border: '1px solid #ff5d61b0',
                color: '#ff9592',
              },
              focused: { outline: '2px solid #ff5d61b0', outlineOffset: -1 },
            },
          },
          feedback: {
            warning: { initial: { backgroundColor: '#fa820022', color: '#ffca16' } },
            error: { initial: { backgroundColor: '#ff173f2d', color: '#ff9592' } },
            success: { initial: { backgroundColor: '#22ff991e', color: '#3dd68c' } },
            info: { initial: { backgroundColor: '#0077ff3a', color: '#70b8ff' } },
          },
        },
      },
    },
    shape: { borderRadius: 4 },
    typography: {
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI (Custom)", Roboto, "Helvetica Neue", "Open Sans (Custom)", system-ui, sans-serif',
      button: { textTransform: 'none', fontWeight: 500 },
      subtitle2: { fontWeight: 500 },
      h6: { fontWeight: 600 },
    },
    focusVisible: {
      outlineWidth: 2,
      outlineColor: '#5eb1ef',
      outlineOffset: 2,
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: ({ theme }) => ({
            border: `1px solid ${(theme.vars || theme).palette.divider}`,
            boxShadow: 'none',
            borderRadius: 8,
            backgroundImage: 'none',
          }),
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
          }),
          head: { fontWeight: 500 },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontWeight: 500,
            borderRadius: 4,
            padding: '4px 12px',
            minHeight: 32,
          },
        },
        ...(bound && {
          stateVariants: {
            default: 'input',
            contained: 'input',
            outlined: 'ghost',
            text: 'plain',
          },
        }),
      },
      MuiChip: {
        styleOverrides: {
          root: { fontWeight: 500, borderRadius: 4 },
        },
        ...(bound && { stateVariants: { default: 'input', filled: 'input', outlined: 'ghost' } }),
      },
      MuiFilledInput: {
        defaultProps: { disableUnderline: true },
        styleOverrides: {
          root: { borderRadius: 4 },
        },
        ...(bound && { stateVariants: { default: 'field' } }),
      },
      MuiInputLabel: {
        styleOverrides: {
          root: ({ theme }) => ({
            '&.Mui-focused': { color: (theme.vars || theme).palette.text.primary },
          }),
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: { borderRadius: 8 },
        },
        ...(bound && { stateVariants: { standard: 'feedback' } }),
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            boxShadow: '0px 12px 32px -16px rgba(0, 0, 60, 0.2), 0px 8px 40px rgba(0, 0, 0, 0.05)',
            borderRadius: 8,
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: { borderRadius: 4, margin: '0 4px' },
        },
        ...(bound && { stateVariants: { default: 'navigation' } }),
      },
      MuiListItemButton: {
        styleOverrides: {
          root: { borderRadius: 4, margin: '0 8px', width: 'auto' },
        },
        ...(bound && { stateVariants: { default: 'navigation' } }),
      },
      MuiToggleButtonGroup: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: theme.palette.mode === 'dark' ? '#ddeaf814' : '#0000330f',
            borderRadius: 4,
            padding: 2,
          }),
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: { border: 'none', borderRadius: 3, fontWeight: 500 },
        },
        ...(bound && { stateVariants: { default: 'dataDisplay' } }),
      },
      MuiPaginationItem: {
        styleOverrides: {
          root: { fontWeight: 500, borderRadius: 4 },
        },
        ...(bound && { stateVariants: { default: 'dataDisplay', text: 'dataDisplay' } }),
      },
      ...(bound && {
        MuiAutocomplete: { stateVariants: { default: 'navigation' } },
        MuiTableRow: { stateVariants: { default: 'dataDisplay' } },
      }),
    },
  });
}

const themes: Record<string, { label: string; bound: Theme; unbound: Theme }> = {
  material: {
    label: 'Material',
    bound: createTheme({
      cssVariables: { colorSchemeSelector: 'class' },
      colorSchemes: { light: true, dark: true },
    }),
    unbound: createTheme({
      cssVariables: { colorSchemeSelector: 'class' },
      colorSchemes: { light: true, dark: true },
    }),
  },
  neo: {
    label: 'Neobrutalism',
    bound: makeNeoTheme(true),
    unbound: makeNeoTheme(false),
  },
  radix: {
    label: 'Radix',
    bound: makeRadixTheme(true),
    unbound: makeRadixTheme(false),
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

        <Alert severity="warning">Your mailbox is 90% full — archive old mail to free space.</Alert>
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
  const [look, setLook] = React.useState<'material' | 'neo' | 'radix'>('neo');
  const [bindings, setBindings] = React.useState(true);
  const theme = bindings ? themes[look].bound : themes[look].unbound;

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
            <FormControlLabel
              control={
                <Switch
                  checked={bindings}
                  disabled={look === 'material'}
                  onChange={(event) => setBindings(event.target.checked)}
                />
              }
              label="State bindings"
            />
          </Stack>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
            Every component below is unmodified <code>@mui/material</code>. The look — including
            every hover, press, selection, focus, and disabled — comes from the theme: user-defined{' '}
            <code>state</code> groups bound per variant with <code>stateVariants</code>. Turn
            &ldquo;State bindings&rdquo; off to remove only the bindings: typography and radius
            stay, and every interaction falls back to Material.
          </Typography>
          <MailPane />
          <ConfigViewer theme={theme} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
