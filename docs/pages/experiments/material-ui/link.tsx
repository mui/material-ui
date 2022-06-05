import * as React from 'react';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  useColorScheme,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';

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
          <Box>
            <Link href="./#" underline="always">
              Link
            </Link>
          </Box>
          <Box>
            <Link href="./#" color="inherit" underline="always">
              {'color="inherit"'}
            </Link>
          </Box>
          <Box>
            <Link href="./#" color="secondary" underline="always">
              {'color="secondary"'}
            </Link>
          </Box>
          <Box>
            <Link href="./#" color="error" underline="always">
              {'color="error"'}
            </Link>
          </Box>
          <Box>
            <Link href="./#" color="textPrimary" underline="always">
              {'color="textPrimary"'}
            </Link>
          </Box>
          <Box>
            <Link href="./#" color="textSecondary" underline="always">
              {'color="textSecondary"'}
            </Link>
          </Box>
          <Box>
            <Link href="./#" color="#123abc" underline="always">
              {'color="#123abc"'}
            </Link>
          </Box>
          <Box>
            <Link href="./#" color="#123" underline="always">
              {'color="#123"'}
            </Link>
          </Box>
          <Box>
            <Link href="./#" color="rgb(255, 0, 255)" underline="always">
              {'color="rgb(255, 0, 255)"'}
            </Link>
          </Box>
          <Box>
            <Link href="./#" color="rgba(255, 0, 255, 0.8)" underline="always">
              {'color="rgba(255, 0, 255, 0.8)"'}
            </Link>
          </Box>
        </Box>
      </Container>
    </CssVarsProvider>
  );
}
