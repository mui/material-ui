import * as React from 'react';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  useColorScheme,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import { ButtonGroup } from '@mui/material';

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

export default function ButtonGroupCssVars() {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <Container sx={{ my: 5 }}>
        <Box sx={{ pb: 2 }}>
          <ColorSchemePicker />
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(256px, 1fr))',
            gridAutoRows: 'minmax(160px, auto)',
            gap: 2,
            '& > div': {
              placeSelf: 'center',
            },
          }}
        >
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 1 }}>
            <ButtonGroup variant="contained" color="inherit">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
            <ButtonGroup color="inherit">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
            <ButtonGroup variant="text" color="inherit">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 1 }}>
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
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 1 }}>
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
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 1 }}>
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
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 1 }}>
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
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 1 }}>
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
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 1 }}>
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
        </Box>
      </Container>
    </CssVarsProvider>
  );
}
