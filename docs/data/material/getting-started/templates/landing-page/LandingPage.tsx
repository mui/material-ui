import * as React from 'react';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme, ThemeOptions } from '@mui/material/styles';

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

const defaultTheme = createTheme({});

export default function LandingPage() {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const theme = createTheme(getLPTheme(mode));

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Hero />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 8, sm: 12 },
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
  );
}
