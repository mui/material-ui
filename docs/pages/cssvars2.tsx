import * as React from 'react';
import { OverridableStringUnion } from '@mui/types';
import { unstable_createDesignSystem2 as createDesignSystem } from '@mui/system';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import BrandingProvider from 'docs/src/BrandingProvider';

interface JoyColorSchemeOverrides {}

type JoyExtendedColorScheme = OverridableStringUnion<never, JoyColorSchemeOverrides>;

interface JoyBaseTokens {
  fontSize: {
    md: string;
  };
  black: string;
  white: string;
}

interface JoyColorSchemeTokens {
  palette: {
    primary: {
      500: string;
    };
    success: {
      500: string;
    };
  };
  background: {
    app: string;
  };
}

interface JoyTheme extends JoyBaseTokens, JoyColorSchemeTokens {
  vars: JoyBaseTokens & JoyColorSchemeTokens;
}

const { ThemeProvider, styled, CssVarsProvider, useColorScheme } = createDesignSystem<
  JoyBaseTokens,
  JoyColorSchemeTokens,
  'light' | 'dark',
  JoyExtendedColorScheme,
  JoyTheme
>({
  baseTheme: {
    black: '#000',
    white: '#fff',
    fontSize: {
      md: '1rem',
    },
  },
  colorSchemes: {
    light: {
      background: {
        app: '#f9f9f9',
      },
      palette: {
        primary: {
          500: '#007FFF',
        },
        success: {
          500: '#1AA251',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          500: '#0059B2',
        },
        success: {
          500: '#178D46',
        },
      },
      background: {
        app: '#0A1929',
      },
    },
  },
  defaultColorScheme: 'light',
});

// =========================================================
// =========================================================

interface JoyColorSchemeOverrides {
  valentine: true;
  trueDark: true;
}

const Button = styled('button')(({ theme }) => ({
  padding: '8px 16px',
  border: 0,
  backgroundColor: theme.vars.palette.primary[500],
  color: '#fff',
  fontWeight: 500,
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  borderRadius: 4,
  cursor: 'pointer',
}));

const Select = styled('select', { name: 'JoySelect', slot: 'Root' })(({ theme: { vars } }) => ({
  fontSize: vars.fontSize.md,
  padding: '4px 8px 4px 2px',
  borderRadius: 4,
}));

const Toggle = () => {
  const [mounted, setMounted] = React.useState(false);
  const { allColorSchemes, colorScheme, setColorScheme } = useColorScheme();

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }
  return (
    <Select
      value={colorScheme}
      onChange={(event) => {
        setColorScheme(event.target.value as typeof allColorSchemes[number]);
      }}
    >
      {allColorSchemes.map((scheme) => (
        <option key={scheme} value={scheme}>
          {scheme}
        </option>
      ))}
    </Select>
  );
};

export default function CssVars2() {
  return (
    <BrandingProvider>
      <Box
        justifyContent="center"
        alignItems="center"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          bgcolor: 'var(--background-app)',
        }}
      >
        <Typography>@mui/material</Typography>
        <ToggleButtonGroup>
          <ToggleButton value="primary">It</ToggleButton>
          <ToggleButton value="success">works</ToggleButton>
        </ToggleButtonGroup>
        <br />
        <Typography sx={{ mb: 1 }}>Works without Provider</Typography>
        <Button>Default Button</Button>
        <br />
        <Typography sx={{ mb: 1 }}>with ThemeProvider</Typography>
        <ThemeProvider theme={{ palette: { primary: { 500: '#ff5252' } } }}>
          <Button>Themed Button</Button>
        </ThemeProvider>
        <br />
        <Typography sx={{ mb: 1 }}>Css Vars</Typography>
        <CssVarsProvider
          colorSchemes={{
            trueDark: {
              palette: {
                primary: {
                  500: '#3b3b3b',
                },
                success: {
                  500: '#318200',
                },
              },
              background: {
                app: '#000',
              },
            },
            valentine: {
              palette: {
                primary: {
                  500: '#ff0000',
                },
                success: {
                  500: '#dd00c1',
                },
              },
              background: {
                app: '#ffdeed',
              },
            },
          }}
        >
          <Toggle />
          <Button>Button with CssVars</Button>
        </CssVarsProvider>
      </Box>
    </BrandingProvider>
  );
}
