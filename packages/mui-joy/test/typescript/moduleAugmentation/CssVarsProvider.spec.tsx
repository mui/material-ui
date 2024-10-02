import * as React from 'react';
import { CSSObject } from '@mui/system';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';

// -----------------------------------
// Extending palette

declare module '@mui/joy/styles' {
  interface ColorSchemeOverrides {
    trueDark: true;
  }

  interface Palette {
    secondary: PaletteRange;
  }

  interface PaletteRange {
    1000: string;
  }

  interface PaletteRangeOverrides {
    100: false;
    120: true;
  }
}

function App() {
  return <CssVarsProvider />;
}

function App2() {
  // @ts-expect-error theme can't be empty
  return <CssVarsProvider theme={{}} />;
}

function App3() {
  return (
    <CssVarsProvider
      theme={extendTheme({
        colorSchemes: {
          // `trueDark` is extended
          trueDark: {
            palette: {
              primary: {
                500: '',
              },
            },
          },
        },
      })}
    />
  );
}

function App4() {
  return (
    <CssVarsProvider
      theme={extendTheme({
        colorSchemes: {
          // @ts-expect-error `yellow` is not listed in ExtendedColorSchemes
          yellow: {},
        },
      })}
    />
  );
}

function App5() {
  return (
    <CssVarsProvider
      theme={extendTheme({
        colorSchemes: {
          light: {
            palette: {
              primary: {
                1000: '#000',
              },
              secondary: {
                // @ts-expect-error `100` is removed
                100: '',
                120: '#ff5252',
              },
            },
          },
        },
      })}
    />
  );
}

// -----------------------------------
// Extending radius

declare module '@mui/joy/styles' {
  interface Radius {
    xl2: string;
  }
}

function App6() {
  return (
    <CssVarsProvider
      theme={extendTheme({
        radius: {
          xl2: '20px',
        },
      })}
    />
  );
}

// -----------------------------------
// Extending shadow

declare module '@mui/joy/styles' {
  interface Shadow {
    xl2: string;
  }
}

function App7() {
  return (
    <CssVarsProvider
      theme={extendTheme({
        shadow: {
          xl2: '0 0 20px 1px rgba(0,0,0,0.12)',
        },
      })}
    />
  );
}

// -----------------------------------
// Extending focus

declare module '@mui/joy/styles' {
  interface Focus {
    bordered: CSSObject;
  }
}

function App8() {
  return (
    <CssVarsProvider
      theme={extendTheme({
        focus: {
          bordered: {
            '&::after': {
              position: 'absolute',
              inset: '2px',
              outline: '1px solid',
              outlineColor: 'var(--token)',
            },
          },
        },
      })}
    />
  );
}

// -----------------------------------
// Extending typography

declare module '@mui/joy/styles' {
  interface TypographySystemOverrides {
    callout: true; // add new typography
    h1: false; // default the default
  }
}

function App9() {
  return (
    <React.Fragment>
      <CssVarsProvider
        theme={extendTheme({
          typography: {
            callout: {
              fontSize: '12px',
            },
          },
        })}
      />
      <CssVarsProvider
        theme={extendTheme({
          typography: {
            // @ts-expect-error 'h1' is removed
            h1: {
              fontSize: '12px',
            },
          },
        })}
      />
    </React.Fragment>
  );
}
