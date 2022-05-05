import * as React from 'react';
import { unstable_createCssVarsProvider as createCssVarsProvider } from '@mui/system';

const { CssVarsProvider } = createCssVarsProvider({
  theme: {
    colorSchemes: {
      light: {
        background: {
          default: '#e5e5e5',
        },
      },
      dark: {
        background: {
          default: '#000',
        },
      },
    },
  },
  defaultColorScheme: {
    light: 'light',
    dark: 'dark',
  },
});

export default function DarkModeSpecificity() {
  return (
    <CssVarsProvider
      defaultMode="dark"
      theme={{
        colorSchemes: {
          dark: {
            background: {
              default: '#121212',
            },
          },
        },
      }}
    >
      <div
        style={{ background: 'var(--palette-background-default)', color: '#888', padding: '1rem' }}
      >
        Background should be #121212.
      </div>
    </CssVarsProvider>
  );
}
