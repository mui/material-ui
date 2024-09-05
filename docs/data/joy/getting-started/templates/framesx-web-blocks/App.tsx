import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import CssBaseline from '@mui/joy/CssBaseline';
import IconButton from '@mui/joy/IconButton';

import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';

import framesxTheme from './theme';
import HeroLeft01 from './blocks/HeroLeft01';
import HeroLeft02 from './blocks/HeroLeft02';
import HeroLeft03 from './blocks/HeroLeft03';
import HeroLeft04 from './blocks/HeroLeft04';
import HeroLeft05 from './blocks/HeroLeft05';
import HeroLeft06 from './blocks/HeroLeft06';
import HeroLeft07 from './blocks/HeroLeft07';
import HeroLeft08 from './blocks/HeroLeft08';
import HeroLeft09 from './blocks/HeroLeft09';
import HeroLeft10 from './blocks/HeroLeft10';

function ColorSchemeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <IconButton
      data-screenshot="toggle-mode"
      size="lg"
      variant="soft"
      color="neutral"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
      sx={{
        position: 'fixed',
        zIndex: 999,
        top: '1rem',
        right: '1rem',
        borderRadius: '50%',
        boxShadow: 'sm',
      }}
    >
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

export default function TeamExample() {
  return (
    <CssVarsProvider disableTransitionOnChange theme={framesxTheme}>
      <CssBaseline />
      <ColorSchemeToggle />
      <Box
        sx={{
          height: '100vh',
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
          '& > div': {
            scrollSnapAlign: 'start',
          },
        }}
      >
        <HeroLeft01 />
        <HeroLeft02 />
        <HeroLeft03 />
        <HeroLeft04 />
        <HeroLeft05 />
        <HeroLeft06 />
        <HeroLeft07 />
        <HeroLeft08 />
        <HeroLeft09 />
        <HeroLeft10 />
      </Box>
    </CssVarsProvider>
  );
}
