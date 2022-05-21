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
import { Typography } from '@mui/material';

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

export default function CssVarsTemplate() {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <Container sx={{ my: 5 }}>
        <Box sx={{ pb: 2 }}>
          <ColorSchemePicker />
        </Box>
        <Box>
          <Typography mt={2} variant="h1">
            Hello World.
          </Typography>
          <Typography mt={2} variant="h2">
            Hello World.
          </Typography>
          <Typography mt={2} variant="h3">
            Hello World.
          </Typography>
          <Typography mt={2} variant="h4">
            Hello World.
          </Typography>
          <Typography mt={2} variant="h5">
            Hello World.
          </Typography>
          <Typography mt={2} variant="h6">
            Hello World.
          </Typography>
          <Typography mt={2} variant="subtitle1">
            Hello World.
          </Typography>
          <Typography mt={2} variant="subtitle2">
            Hello World.
          </Typography>
          <Typography mt={2} variant="body1">
            Hello World.
          </Typography>
          <Typography mt={2} variant="body2">
            Hello World.
          </Typography>
        </Box>
      </Container>
    </CssVarsProvider>
  );
}
