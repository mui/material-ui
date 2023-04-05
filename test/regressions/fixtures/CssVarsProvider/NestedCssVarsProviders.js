import * as React from 'react';
import {
  unstable_createCssVarsProvider as createCssVarsProvider,
  unstable_createCssVarsTheme as createCssVarsTheme,
} from '@mui/system';

const { CssVarsProvider } = createCssVarsProvider({
  theme: createCssVarsTheme({
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
  }),
  defaultColorScheme: {
    light: 'light',
    dark: 'dark',
  },
});

const nestedTheme = createCssVarsTheme({
  cssVarPrefix: 'nested',
  colorSchemes: {
    light: {
      background: {
        default: 'yellow',
      },
    },
    dark: {
      background: {
        default: 'tomato',
      },
    },
  },
});

export default function NestedCssVarsProviders() {
  return (
    <CssVarsProvider>
      <div
        data-color-scheme="light"
        style={{
          background: 'var(--background-default)',
          color: 'white',
          padding: '1rem',
        }}
      >
        Background should be red.
        <CssVarsProvider theme={nestedTheme}>
          <div
            style={{
              background: 'var(--nested-background-default)',
              height: 40,
              color: '#000',
              padding: '1rem',
            }}
          >
            Background should be yellow.
          </div>
        </CssVarsProvider>
      </div>
      <div
        data-color-scheme="dark"
        style={{
          background: 'var(--background-default)',
          color: 'white',
          padding: '1rem',
        }}
      >
        Background should be blue.
        <CssVarsProvider theme={nestedTheme} disableStyleSheetGeneration>
          <div
            style={{
              background: 'var(--nested-background-default)',
              height: 40,
              color: '#000',
              padding: '1rem',
            }}
          >
            Background should be tomato.
          </div>
        </CssVarsProvider>
      </div>
    </CssVarsProvider>
  );
}
