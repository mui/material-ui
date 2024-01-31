import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
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
  const [mode, setMode] = React.useState('dark');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  const ToggleCustomTheme = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100dvw',
          position: 'fixed',
          bottom: 24,
        }}
      >
        <ToggleButtonGroup
          color="primary"
          value={showCustomTheme}
          exclusive
          onChange={toggleCustomTheme}
          aria-label="Platform"
          sx={{
            backgroundColor: 'background.default',
            '& .Mui-selected': {
              pointerEvents: 'none',
            },
          }}
        >
          <ToggleButton value={true}>
            <AutoAwesomeRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
            Custom theme
          </ToggleButton>
          <ToggleButton value={false}>
            <BlockRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
            Default design
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    );
  };

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Hero
        showCustomTheme={showCustomTheme}
        toggleCustomTheme={toggleCustomTheme}
      />
      <Box sx={{ bgcolor: 'background.default' }}>
        <LogoCollection />
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </Box>
      <ToggleCustomTheme />
    </ThemeProvider>
  );
}
