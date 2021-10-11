import * as React from 'react';
import { OverridableStringUnion } from '@mui/types';
import { unstable_createCssVarsProvider as createCssVarsProvider } from '@mui/system';

// Test design system layer

type DSMode = 'light' | 'dark';

interface Palette {
  primary: {
    500: string;
  };
}

interface DSTheme {
  palette: Record<DSMode, Palette>;
  fontSize: {
    md: string;
  };
}

const ThemeContext = React.createContext<DSTheme | undefined>(undefined);

createCssVarsProvider<DSTheme, DSMode>(ThemeContext, {
  theme: {
    fontSize: {
      md: '1rem',
    },
    // @ts-expect-error 'dark' is missing
    palette: {
      light: {
        primary: {
          500: '#007FFF',
        },
      },
    },
  },
});

createCssVarsProvider<DSTheme, DSMode>(
  ThemeContext,
  // @ts-expect-error 'defaultMode' is missing
  {
    theme: {
      fontSize: {
        md: '1rem',
      },
      palette: {
        light: {
          primary: {
            500: '#007FFF',
          },
        },
        dark: {
          primary: {
            500: '#007FFF',
          },
        },
      },
    },
  },
);

createCssVarsProvider<DSTheme, DSMode>(ThemeContext, {
  theme: {
    fontSize: {
      md: '1rem',
    },
    // @ts-expect-error `lineHeight` is not in DSTheme
    lineHeight: {},
    palette: {
      light: {
        primary: {
          500: '#007FFF',
        },
      },
      dark: {
        primary: {
          500: '#007FFF',
        },
      },
    },
  },
  // @ts-expect-error `yellow` is not in DSMode
  defaultMode: 'yellow',
});

createCssVarsProvider<DSTheme, DSMode>(ThemeContext, {
  theme: {
    fontSize: {
      md: '1rem',
    },
    palette: {
      light: {
        primary: {
          500: '#007FFF',
        },
      },
      dark: {
        primary: {
          // @ts-expect-error `main` is not in Palette
          main: '#007FFF',
        },
      },
    },
  },
  defaultMode: 'dark',
});

// ==============================
// Test application layer

interface JoyModeOverrides {}

type JoyExtendedMode = OverridableStringUnion<never, JoyModeOverrides>;

type JoyMode = 'light' | 'dark';

interface JoyPalette {
  primary: {
    main: string;
  };
}

interface JoyTheme {
  palette: Record<JoyMode | JoyExtendedMode, JoyPalette>;
  fontSize: string;
  fontFamily: string;
}

const ThemeContext2 = React.createContext<JoyTheme | undefined>(undefined);

interface JoyModeOverrides {
  white: true;
}

const { CssVarsProvider } = createCssVarsProvider<JoyTheme, JoyMode, JoyExtendedMode>(
  ThemeContext2,
  {
    theme: {
      fontSize: '1rem',
      fontFamily: 'IBM Plex Sans',
      palette: {
        light: {
          primary: {
            main: '#007FFF',
          },
        },
        dark: {
          primary: {
            main: '#007FFF',
          },
        },
      },
    },
    defaultMode: 'light',
  },
);

function App() {
  return (
    <CssVarsProvider
      theme={{
        // @ts-expect-error `white` is missing
        palette: {},
      }}
    />
  );
}

function App2() {
  return (
    <CssVarsProvider
      theme={{
        // @ts-expect-error `lineHeight` is not in theme
        lineHeight: 1,
        palette: {
          white: {
            primary: {
              main: '#ff5252',
            },
          },
        },
      }}
      // @ts-expect-error `yellow` is not in
      defaultMode="yellow"
    />
  );
}

// =========================

interface Joy2ModeOverrides {}

type Joy2ExtendedMode = OverridableStringUnion<never, Joy2ModeOverrides>;

type Joy2Mode = 'light' | 'dark';

interface Joy2Palette {
  primary: {
    main: string;
  };
}

interface Joy2Theme {
  palette: Record<Joy2Mode | Joy2ExtendedMode, Joy2Palette>;
  fontSize: string;
  fontFamily: string;
}

const ThemeContext3 = React.createContext<Joy2Theme | undefined>(undefined);

interface Joy2ModeOverrides {
  comfort: true;
  trueDark: true;
}

const { CssVarsProvider: CssVarsProvider2, useMode } = createCssVarsProvider<
  Joy2Theme,
  Joy2Mode,
  Joy2ExtendedMode
>(ThemeContext3, {
  theme: {
    fontSize: '1rem',
    fontFamily: 'IBM Plex Sans',
    palette: {
      light: {
        primary: {
          main: '#007FFF',
        },
      },
      dark: {
        primary: {
          main: '#007FFF',
        },
      },
    },
  },
  defaultMode: 'light',
});

function Content() {
  const { setMode } = useMode();
  React.useEffect(() => {
    // @ts-expect-error 'yellow' is not typed in JoyExtendedMode
    setMode('yellow');

    setMode('comfort');
  }, [setMode]);
  return null;
}

function App3() {
  return (
    <CssVarsProvider2
      theme={{
        // @ts-expect-error `comfort` and `trueDark` are missing
        palette: {},
      }}
    />
  );
}

function App4() {
  return (
    <CssVarsProvider2
      theme={{
        palette: {
          comfort: {
            primary: {
              main: '',
            },
          },
          // @ts-expect-error Palette structure is not completed
          trueDark: {},
        },
      }}
    />
  );
}
