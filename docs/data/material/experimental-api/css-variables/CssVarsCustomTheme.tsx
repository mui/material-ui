import * as React from 'react';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  useColorScheme,
  experimental_extendTheme,
} from '@mui/material/styles';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { teal, deepOrange, orange, cyan } from '@mui/material/colors';

function ColorSchemePicker() {
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
        } else {
          setMode('light');
        }
      }}
    >
      {mode === 'light' ? <Moon /> : <Sun />}
    </Button>
  );
}

const theme = experimental_extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: deepOrange,
      },
    },
    dark: {
      palette: {
        primary: cyan,
        secondary: orange,
      },
    },
  },
});

const useEnhancedEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

export default function Page() {
  // the `node` is used for attaching CSS variables to this demo, you might not need it in your application.
  const [node, setNode] = React.useState<null | HTMLElement>(null);
  useEnhancedEffect(() => {
    setNode(document.getElementById('css-vars-custom-theme') as null | HTMLElement);
  }, []);
  return (
    <div id="css-vars-custom-theme">
      <CssVarsProvider
        theme={theme}
        colorSchemeNode={node || null}
        colorSchemeSelector="#css-vars-custom-theme"
        colorSchemeStorageKey="custom-theme-color-scheme"
        modeStorageKey="custom-theme-mode"
      >
        <Box bgcolor="background.paper" sx={{ p: 1 }}>
          <Box sx={{ py: 2, mx: 'auto' }}>
            <Box sx={{ pb: 4 }}>
              <ColorSchemePicker />
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
          </Box>
        </Box>
      </CssVarsProvider>
    </div>
  );
}
