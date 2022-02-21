import * as React from 'react';
import {
  CssVarsProvider,
  useColorScheme,
  createTheme,
  ThemeInput,
  alpha,
  darken,
} from '@mui/material/styles';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { teal, deepOrange, orange, cyan } from '@mui/material/colors';

const ColorSchemePicker = ({ modeChanged }: { modeChanged: (mode: 'light' | 'dark') => void }) => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outlined"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
          modeChanged('dark');
        } else {
          setMode('light');
          modeChanged('light');
        }
      }}
    >
      {mode === 'light' ? <Moon /> : <Sun />}
    </Button>
  );
};

const defaultTheme = createTheme({
  palette: {
    primary: teal,
    secondary: deepOrange,
  },
});

const darkTheme = createTheme({
  palette: {
    primary: cyan,
    secondary: orange,
  },
});

const themeWithColorSchemes = {
  ...defaultTheme,
  colorSchemes: {
    light: {
      palette: {
        primary: defaultTheme.palette.primary,
        secondary: defaultTheme.palette.secondary,
      },
    },
    dark: {
      palette: {
        primary: defaultTheme.palette.primary,
        secondary: defaultTheme.palette.secondary,
      },
    },
  },
};

const darkThemeWithColorSchemes = {
  ...darkTheme,
  colorSchemes: {
    light: {
      palette: {
        primary: defaultTheme.palette.primary,
        secondary: defaultTheme.palette.secondary,
      },
    },
    dark: {
      palette: {
        primary: darkTheme.palette.primary,
        secondary: darkTheme.palette.secondary,
      },
    },
  },
};

export default function Page() {
  const [theme, setTheme] = React.useState<ThemeInput>(themeWithColorSchemes);

  const modeChanged = (newMode: 'light' | 'dark') => {
    setTheme(newMode === 'dark' ? darkThemeWithColorSchemes : themeWithColorSchemes);
  };

  return (
    <CssVarsProvider theme={theme}>
      <Box sx={{ py: 5, maxWidth: { md: 1152, xl: 1536 }, mx: 'auto' }}>
        <Box sx={{ pb: 4 }}>
          <ColorSchemePicker modeChanged={modeChanged} />
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 1 }}>
          <Button variant="contained">Text</Button>
          <Button variant="outlined">Text</Button>
          <Button>Text</Button>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 1 }}>
          <Button color="secondary" variant="contained">
            Text
          </Button>
          <Button color="secondary" variant="outlined">
            Text
          </Button>
          <Button color="secondary">Text</Button>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 1 }}>
          <Button color="error" variant="contained">
            Text
          </Button>
          <Button color="error" variant="outlined">
            Text
          </Button>
          <Button color="error">Text</Button>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 1 }}>
          <Button color="info" variant="contained">
            Text
          </Button>
          <Button color="info" variant="outlined">
            Text
          </Button>
          <Button color="info">Text</Button>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 1 }}>
          <Button color="warning" variant="contained">
            Text
          </Button>
          <Button color="warning" variant="outlined">
            Text
          </Button>
          <Button color="warning">Text</Button>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 1 }}>
          <Button color="success" variant="contained">
            Text
          </Button>
          <Button color="success" variant="outlined">
            Text
          </Button>
          <Button color="success">Text</Button>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 1 }}>
          <Button
            sx={{
              '--md-palette-primary-main': '#FF0000',
              ':hover': { backgroundColor: darken('#FF0000', 0.2) },
            }}
            variant="contained"
          >
            Text
          </Button>
          <Button
            sx={(theme) => ({
              '--md-palette-primary-main': '#FF0000',
              border: `1px solid ${alpha('#FF0000', 0.5)}`,
              '&:hover': {
                backgroundColor: alpha('#FF0000', theme.palette.action.hoverOpacity),
              },
            })}
            variant="outlined"
          >
            Text
          </Button>
          <Button
            sx={(theme) => ({
              '--md-palette-primary-main': '#FF0000',
              '&:hover': {
                backgroundColor: alpha('#FF0000', theme.palette.action.hoverOpacity),
              },
            })}
          >
            Text
          </Button>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
