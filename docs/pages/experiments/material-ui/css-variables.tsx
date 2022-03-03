import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/material/styles';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const ColorSchemePicker = () => {
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
};

export default function Page() {
  return (
    <CssVarsProvider
      theme={{
        colorSchemes: {
          light: {
            palette: {
              primary: {
                mainChannel: '25 117 210',
              },
              secondary: {
                mainChannel: '156 39 176',
              },
              error: {
                mainChannel: '211 47 47',
              },
              info: {
                mainChannel: '2 136 209',
              },
              success: {
                mainChannel: '46 125 50',
              },
              warning: {
                mainChannel: '237 108 2',
              },
            },
          },
          dark: {
            palette: {
              primary: {
                mainChannel: '144 202 249',
              },
              secondary: {
                mainChannel: '206 147 216',
              },
              error: {
                mainChannel: '244 67 54',
              },
              info: {
                mainChannel: '41 182 246',
              },
              success: {
                mainChannel: '102 187 106',
              },
              warning: {
                mainChannel: '255 167 38',
              },
            },
          },
        },
        opacity: {
          active: 0.54,
          hover: 0.04,
          selected: 0.08,
          disabled: 0.26,
          focus: 0.12,
        },
      }}
    >
      <Box sx={{ py: 5, maxWidth: { md: 1152, xl: 1536 }, mx: 'auto' }}>
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
    </CssVarsProvider>
  );
}
