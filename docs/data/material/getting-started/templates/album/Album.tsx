import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { ThemeProvider } from '@mui/material/styles';
import Divider from '@mui/material/Divider';

import AppBar from './components/AppBar';
import Hero from './components/Hero';
import LogoCollection from './components/LogoCollection';
import Highlights from './components/Highlights';
import Pricing from './components/Pricing';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import { createContext, useState } from 'react';

import getAlbumTheme from './albumTheme';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

interface ColorMode {
  mode: 'light' | 'dark';
  toggleColorMode: () => void;
}

export const ColorModeContext = createContext<ColorMode | undefined>(undefined);

export default function Album() {
  const [colorMode, setColorMode] = useState<ColorMode>({
    mode: 'light',
    toggleColorMode: () => {
      setColorMode((prevMode) => ({
        mode: prevMode.mode === 'light' ? 'dark' : 'light',
        toggleColorMode: prevMode.toggleColorMode,
      }));
    },
  });

  const theme = React.useMemo(() => getAlbumTheme(colorMode.mode), [colorMode.mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar />
        <Hero />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            bgcolor: 'background.default',
          }}
        >
          <LogoCollection />
          <Features />
          <Divider />
          <Testimonials />
          <Highlights />
          <Pricing />
          <Divider />
          <FAQ />
          <Box
            sx={{
              bgcolor: 'background.paper',
              p: 6,
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
            component="footer"
          >
            <Typography variant="h6" align="center" gutterBottom>
              Footer
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
              component="p"
            >
              Something here to give the footer a purpose!
            </Typography>
            <Copyright />
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
