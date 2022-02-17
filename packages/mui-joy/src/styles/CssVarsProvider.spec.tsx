import * as React from 'react';
import { CssVarsProvider, PaletteScale, PaletteVariant } from '@mui/joy/styles';

declare module '@mui/joy/styles' {
  interface ColorSchemeOverrides {
    trueDark: true;
  }

  interface Palette {
    secondary: PaletteScale & PaletteVariant;
  }
}

function App() {
  return <CssVarsProvider />;
}

function App2() {
  // theme can be empty
  return <CssVarsProvider theme={{}} />;
}

function App3() {
  // theme can be empty
  return (
    <CssVarsProvider
      theme={{
        colorSchemes: {
          // `trueDark` is extended
          trueDark: {
            palette: {
              primary: {
                '500': '',
              },
            },
          },
        },
      }}
    />
  );
}

function App4() {
  // theme can be empty
  return (
    <CssVarsProvider
      theme={{
        colorSchemes: {
          // @ts-expect-error `yellow` is not listed in ExtendedColorSchemes
          yellow: {},
        },
      }}
    />
  );
}

function App5() {
  // theme can be empty
  return (
    <CssVarsProvider
      theme={{
        colorSchemes: {
          light: {
            palette: {
              secondary: {
                primary: {
                  '500': '',
                },
              },
            },
          },
        },
      }}
    />
  );
}
