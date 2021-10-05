import * as React from 'react';
import { OverridableStringUnion } from '@mui/types';
import createCssVarsProvider from './createCssVarsProvider';

// Test design system layer

interface DSBaseTokens {
  fontSize: {
    md: string;
  };
}

interface DSColorSchemeTokens {
  palette: {
    primary: {
      500: string;
    };
  };
}

interface DSTheme extends DSBaseTokens, DSColorSchemeTokens {
  vars: DSBaseTokens & DSColorSchemeTokens;
}

const ThemeContext = React.createContext<DSTheme | undefined>(undefined);

createCssVarsProvider<DSBaseTokens, DSColorSchemeTokens, 'light' | 'dark', never, DSTheme>(
  ThemeContext,
  {
    baseTheme: {
      fontSize: {
        md: '1rem',
      },
    },
    // @ts-expect-error 'dark' is missing
    colorSchemes: {
      light: {
        palette: {
          primary: {
            500: '#007FFF',
          },
        },
      },
    },
    defaultColorScheme: 'light',
  },
);

createCssVarsProvider<DSBaseTokens, DSColorSchemeTokens, 'light' | 'dark', never, DSTheme>(
  ThemeContext,
  {
    baseTheme: {
      fontSize: {
        md: '1rem',
      },
      // @ts-expect-error lineHeight is not defined in BaseTokens
      lineHeight: {
        md: 1,
      },
    },
    colorSchemes: {
      light: {
        palette: {
          primary: {
            500: '#007FFF',
          },
        },
      },
      dark: {
        palette: {
          primary: {
            // @ts-expect-error '500' is missing
            main: '#007FFF',
          },
        },
      },
    },
    // @ts-expect-error 'yellow' is not defined as design system color scheme
    defaultColorScheme: 'yellow',
  },
);

// ==============================
// Test application layer

interface JoyColorSchemeOverrides {}

type JoyExtendedColorScheme = OverridableStringUnion<never, JoyColorSchemeOverrides>;

interface JoyBaseTokens {
  fontSize: string;
}

interface JoyColorSchemeTokens {
  palette: {
    primary: {
      main: string;
    };
  };
}

interface JoyTheme extends JoyBaseTokens, JoyColorSchemeTokens {
  vars: JoyBaseTokens & JoyColorSchemeTokens;
}

const ThemeContext2 = React.createContext<JoyTheme | undefined>(undefined);

const { CssVarsProvider, useColorScheme } = createCssVarsProvider<
  JoyBaseTokens,
  JoyColorSchemeTokens,
  'light' | 'dark',
  JoyExtendedColorScheme,
  JoyTheme
>(ThemeContext2, {
  // @ts-expect-error 'white' is missing because JoyBaseTokens is extending below
  baseTheme: {
    fontSize: '1rem',
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#007FFF',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#007FFF',
        },
      },
    },
  },
  defaultColorScheme: 'light',
});

interface JoyColorSchemeOverrides {
  comfort: true;
  trueDark: true;
}

interface JoyBaseTokens {
  white: string;
}

function Content() {
  const { setColorScheme } = useColorScheme();
  React.useEffect(() => {
    // @ts-expect-error 'yellow' is not typed in JoyExtendedColorScheme
    setColorScheme('yellow');
  }, [setColorScheme]);
  return null;
}

function App() {
  return (
    <CssVarsProvider
      baseTheme={{
        white: '#ffffff',
        // @ts-expect-error lineHeight is not typed in JoyBaseTokens
        lineHeight: 1,
      }}
      // @ts-expect-error 'trueDark' is missing
      colorSchemes={{
        dark: {
          palette: {
            primary: {
              main: '#ff5252',
            },
          },
        },
      }}
    />
  );
}
