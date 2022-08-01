import * as React from 'react';
import { unstable_createCssVarsProvider as createCssVarsProvider } from '@mui/system';

const { CssVarsProvider } = createCssVarsProvider({
  theme: {
    colorSchemes: {
      light: {
        background: {
          default: 'red',
        },
      },
      dark: {
        background: {
          default: 'blue',
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
    <CssVarsProvider modeStorageKey="force-color-schemes">
      <div
        data-color-scheme="dark"
        style={{
          background: 'var(--background-default)',
          color: 'white',
          padding: '1rem',
        }}
      >
        Background should be blue.
        <div
          data-color-scheme="light"
          style={{
            background: 'var(--background-default)',
            height: 40,
            color: 'white',
            padding: '1rem',
          }}
        >
          Background should be red.
        </div>
      </div>
    </CssVarsProvider>
  );
}
