import * as React from 'react';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  useColorScheme,
} from '@mui/material/styles';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

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
    <CssVarsProvider>
      <Box sx={{ py: 5, maxWidth: { md: 1152, xl: 1536 }, mx: 'auto' }}>
        <Box sx={{ pb: 4 }}>
          <ColorSchemePicker />
        </Box>
        <div>
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
        </div>
        <div>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 1 }}>
            <ButtonGroup variant="contained">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
            <ButtonGroup variant="text">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 1 }}>
            <ButtonGroup variant="contained" color="secondary">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
            <ButtonGroup color="secondary">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
            <ButtonGroup variant="text" color="secondary">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 1 }}>
            <ButtonGroup variant="contained" color="error">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
            <ButtonGroup color="error">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
            <ButtonGroup variant="text" color="error">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 1 }}>
            <ButtonGroup variant="contained" color="info">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
            <ButtonGroup color="info">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
            <ButtonGroup variant="text" color="info">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 1 }}>
            <ButtonGroup variant="contained" color="warning">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
            <ButtonGroup color="warning">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
            <ButtonGroup variant="text" color="warning">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 1 }}>
            <ButtonGroup variant="contained" color="success">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
            <ButtonGroup color="success">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
            <ButtonGroup variant="text" color="success">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Box>
        </div>
      </Box>
    </CssVarsProvider>
  );
}
