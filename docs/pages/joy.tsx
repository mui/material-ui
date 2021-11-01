import * as React from 'react';
import { CssVarsProvider, styled, useColorScheme } from '@mui/joy/styles';
import { GlobalStyles } from '@mui/styled-engine';

declare module '@mui/joy/styles' {
  interface ColorSchemeOverrides {
    dark: true;
    lightGreen: true;
    darkGreen: true;
    // lightRed: true;
    // darkRed: true;
  }
  interface Palette {
    bgcolor: React.CSSProperties['backgroundColor'];
    text: React.CSSProperties['color'];
  }
}

const Button = styled('button', {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean; color?: string }>(({ theme, active }) => ({
  border: 0,
  fontSize: theme.vars.fontSize.md,
  height: 40,
  borderRadius: 40,
  padding: '0.25rem 1rem',
  ...(active && {
    color: '#fff',
    backgroundColor: theme.vars.palette.brand[500],
  }),
}));

const Button2 = styled('button', {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean; color?: string }>(({ theme, active }) => ({
  fontSize: theme.vars.fontSize.md,
  height: 40,
  borderRadius: 40,
  padding: '0.25rem 1rem',
  border: '1px solid',
  backgroundColor: 'transparent',
  color: theme.vars.palette.text,
  opacity: 0.4,
  ...(active && {
    borderColor: theme.vars.palette.text,
    opacity: 1,
  }),
}));

const Toggle = () => {
  const [mounted, setMounted] = React.useState(false);
  const { mode, setMode, colorScheme, setColorScheme } = useColorScheme();

  // When mounted on client, now we can show the UI
  React.useEffect(() => setMounted(true), []);
  if (!mounted) {
    return null;
  }
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <div>
        <p style={{ color: 'var(--joy-palette-text)' }}>MODE</p>
        <div style={{ display: 'flex', gap: 16 }}>
          <Button2
            active={mode === 'system'}
            onClick={() => {
              setMode('system');
            }}
          >
            System
          </Button2>
          <Button2
            active={mode === 'day'}
            onClick={() => {
              setMode('day');
            }}
          >
            Day
          </Button2>
          <Button2
            active={mode === 'night'}
            onClick={() => {
              setMode('night');
            }}
          >
            Night
          </Button2>
        </div>
      </div>

      <div style={{ width: 1, backgroundColor: 'var(--joy-palette-text)', margin: '0 0.5rem' }} />

      <div>
        <p style={{ color: 'var(--joy-palette-text)' }}>COLOR SCHEME</p>
        <div style={{ display: 'flex', gap: 16 }}>
          <Button
            active={colorScheme === 'light' || colorScheme === 'dark'}
            onClick={() => {
              setColorScheme({
                day: 'light',
                night: 'dark',
              });
            }}
          >
            Default
          </Button>
          <Button
            active={colorScheme === 'lightGreen' || colorScheme === 'darkGreen'}
            onClick={() => {
              setColorScheme({
                day: 'lightGreen',
                night: 'darkGreen',
              });
            }}
          >
            Green
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function Joy() {
  return (
    <CssVarsProvider
      defaultMode="system"
      defaultColorScheme={{
        day: 'lightGreen',
        night: 'darkGreen',
      }}
      theme={{
        colorSchemes: {
          light: {
            palette: {
              bgcolor: 'var(--joy-palette-brand-100)',
              text: 'var(--joy-palette-brand-900)',
            },
          },
          dark: {
            palette: {
              brand: {
                50: '#E2EDF8',
                100: '#CEE0F3',
                200: '#91B9E3',
                300: '#5090D3',
                400: '#265D97',
                500: '#1E4976',
                600: '#173A5E',
                700: '#132F4C', // contrast 13.64:1
                800: '#001E3C',
                900: '#0A1929',
              },
              bgcolor: 'var(--joy-palette-brand-900)',
              text: 'var(--joy-palette-brand-50)',
            },
          },
          lightGreen: {
            palette: {
              brand: {
                50: '#E9FBF0',
                100: '#C6F6D9',
                200: '#9AEFBC',
                300: '#6AE79C',
                400: '#3EE07F',
                500: '#21CC66',
                600: '#1DB45A',
                700: '#1AA251',
                800: '#178D46',
                900: '#0F5C2E',
              },
              bgcolor: 'var(--joy-palette-brand-100)',
              text: 'var(--joy-palette-brand-900)',
            },
          },
          darkGreen: {
            palette: {
              brand: {
                50: '#F3FCF5',
                100: '#D2F6E1',
                200: '#7BE9BB',
                300: '#00DA9C',
                400: '#00C094',
                500: '#00A389',
                600: '#00867B',
                700: '#00706E',
                800: '#00585E',
                900: '#00464F',
              },
              bgcolor: 'var(--joy-palette-brand-900)',
              text: 'var(--joy-palette-brand-100)',
            },
          },
        },
      }}
    >
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: 'var(--joy-palette-bgcolor)',
          },
        }}
      />
      <Toggle />
    </CssVarsProvider>
  );
}
