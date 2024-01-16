import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';

import AppAppBar from './components/AppAppBar';
import Hero from './components/Hero';
import LogoCollection from './components/LogoCollection';
import Highlights from './components/Highlights';
import Pricing from './components/Pricing';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

import getLPTheme from './getLPTheme';

interface ColorMode {
  mode: 'light' | 'dark';
  toggleColorMode: () => void;
}

export const ColorModeContext = React.createContext<ColorMode | undefined>(
  undefined,
);

export default function LandingPage() {
  const [colorMode, setColorMode] = React.useState<ColorMode>({
    mode: 'light',
    toggleColorMode: () => {
      setColorMode((prevMode) => ({
        mode: prevMode.mode === 'light' ? 'dark' : 'light',
        toggleColorMode: prevMode.toggleColorMode,
      }));
    },
  });

  const theme = React.useMemo(
    () => createTheme(getLPTheme(colorMode.mode)),
    [colorMode.mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppAppBar />
        <Hero />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 8, sm: 16 },
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
          <Footer />
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
