import * as React from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import CssBaseline from '@mui/joy/CssBaseline';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Sheet from '@mui/joy/Sheet';

const newTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: 'E5F7FF',
          100: '#CCEFFF',
          200: '#99DBFF',
          300: '#66C2FF',
          400: '#3FA9FF',
          500: '#0080FF',
          600: '#0063DB',
          700: '#0049B7',
          800: '#003393',
          900: '#00247A',
        },
        neutral: {
          outlinedBg: '#F6F8FA',
          outlinedHoverBg: '#F3F4F6',
          outlinedActiveBg: 'rgba(238, 239, 242, 1)',
          outlinedBorder: 'rgba(27, 31, 36, 0.15)',
        },
        warning: {
          50: '#FFFCE5',
          100: '#FFFACC',
          200: '#FFF399',
          300: '#FFEB66',
          400: '#FFE23F',
          500: '#ffd500',
          600: '#DBB300',
          700: '#B79300',
          800: '#937300',
          900: '#937300',
        },
        danger: {
          50: '#FFEFE5',
          100: '#FFE5D6',
          200: '#FFC5AD',
          300: '#FF9F84',
          400: '#FF7A66',
          500: '#ff3d33',
          600: '#DB252B',
          700: '#B7192C',
          800: '#93102A',
          900: '#7A092A',
        },
        success: {
          solidBg: '#2DA44E',
          solidHoverBg: '#2C974B',
          solidActiveBg: '#298E46',
        },
        focusVisible: 'rgba(3, 102, 214, 0.3)',
      },
    },
    dark: {
      palette: {
        primary: {
          50: 'E5F7FF',
          100: '#CCEFFF',
          200: '#99DBFF',
          300: '#66C2FF',
          400: '#3FA9FF',
          500: '#0080FF',
          600: '#0063DB',
          700: '#0049B7',
          800: '#003393',
          900: '#00247A',
        },
        neutral: {
          50: '#FAFAFA',
          100: '#F6F6F6',
          200: '#EDEDEE',
          300: '#DFDFE1',
          400: '#9E9EA4',
          500: '#616168',
          600: '#4B4B50',
          700: '#3C3C3F',
          800: '#2A2A2C',
          900: '#1A1A1C',
        },
        warning: {
          50: '#FFFCE5',
          100: '#FFFACC',
          200: '#FFF399',
          300: '#FFEB66',
          400: '#FFE23F',
          500: '#ffd500',
          600: '#DBB300',
          700: '#B79300',
          800: '#937300',
          900: '#937300',
        },
        danger: {
          50: '#FFEFE5',
          100: '#FFE5D6',
          200: '#FFC5AD',
          300: '#FF9F84',
          400: '#FF7A66',
          500: '#ff3d33',
          600: '#DB252B',
          700: '#B7192C',
          800: '#93102A',
          900: '#7A092A',
        },
        success: {
          50: '#EAFDE7',
          100: '#DAFCD6',
          200: '#AFF9AE',
          300: '#83EE8C',
          400: '#61DD78',
          500: '#32c75c',
          600: '#24AB57',
          700: '#198F51',
          800: '#0F7349',
          900: '#095F43',
        },
      },
    },
  },
  focus: {
    default: {
      outlineWidth: '3px',
    },
  },
  fontFamily: {
    body: 'SF Pro Text, var(--gh-fontFamily-fallback)',
  },

  components: {
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          borderRadius: '6px',
          boxShadow: '0 1px 0 0 rgba(27, 31, 35, 0.04)',
          transition: '80ms cubic-bezier(0.33, 1, 0.68, 1)',
          transitionProperty: 'color,background-color,box-shadow,border-color',
          ...(ownerState.size === 'md' && {
            fontWeight: 600,
            minHeight: '32px',
            fontSize: '14px',
            '--Button-paddingInline': '1rem',
          }),
          ...(ownerState.color === 'success' &&
            ownerState.variant === 'solid' && {
              '--gh-palette-focusVisible': 'rgba(46, 164, 79, 0.4)',
              border: '1px solid rgba(27, 31, 36, 0.15)',
              '&:active': {
                boxShadow: 'inset 0px 1px 0px rgba(20, 70, 32, 0.2)',
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
    JoySheet: {},
  },
});

export default function ProsePage() {
  return (
    <CssVarsProvider defaultMode="system" theme={newTheme}>
      <CssBaseline />
      <GlobalStyles
        styles={`
          body {
            background-size: cover;
          }
        `}
      />
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          px: 5,
        }}
      >
        <Sheet variant="outlined" sx={{ display: 'flex', p: 4, gap: 2, mt: 10 }}>
          <Button variant="outlined" color="neutral" sx={{ alignSelf: 1 }}>
            Button
          </Button>
          <Button variant="solid" color="success" sx={{ alignSelf: 1 }}>
            Button
          </Button>
        </Sheet>
      </Box>
    </CssVarsProvider>
  );
}
