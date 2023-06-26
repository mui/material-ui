/* eslint-disable react/no-unescaped-entities */
import * as React from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import CssBaseline from '@mui/joy/CssBaseline';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Sheet from '@mui/joy/Sheet';

const theme = extendTheme({
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
  components: {
    JoySheet: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
        },
      },
    },
  },
});

export default function ProsePage() {
  return (
    <CssVarsProvider defaultMode="system" theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={`
          body {
            background: url(https://images.unsplash.com/photo-1534214526114-0ea4d47b04f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80);
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
        <Button>Button</Button>
        <Sheet sx={{ width: 200, height: 200 }}>Hey</Sheet>
      </Box>
    </CssVarsProvider>
  );
}
