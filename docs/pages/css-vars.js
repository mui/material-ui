import * as React from 'react';
import { createTheme, styled, alpha } from '@mui/material/styles';
import CssVarsProvider, { useModeToggle } from '@mui/system/CssVars';
import GlobalStyles from '@mui/material/GlobalStyles';
import SliderUnstyled from '@mui/core/SliderUnstyled';
import Box from '@mui/material/Box';
import NoSsr from '@mui/material/NoSsr';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import PauseRounded from '@mui/icons-material/PauseRounded';

const primary = {
  50: '#eff6ff',
  100: '#dbeafe',
  200: '#bfdbfe',
  300: '#93c5fd',
  400: '#60a5fa',
  500: '#3b82f6',
  600: '#2563eb',
  700: '#1d4ed8',
  800: '#1e40af',
  900: '#1e3a8a',
};
const neutral = {
  50: '#f9fafb',
  100: '#f3f4f6',
  200: '#e5e7eb',
  300: '#d1d5db',
  400: '#9ca3af',
  500: '#6b7280',
  600: '#4b5563',
  700: '#374151',
  800: '#1f2937',
  900: '#111827',
};
const primaryAlpha = {
  500: alpha(primary[500], 0.4),
};

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary,
    primaryAlpha,
    neutral,
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary,
    primaryAlpha,
    neutral,
  },
});

function ModeToggle() {
  const { mode, setMode } = useModeToggle();
  return (
    <Box sx={{ position: 'fixed', top: 40, left: 40 }}>
      <NoSsr>
        <FormControlLabel
          label={mode === 'dark' ? 'Turn on the light' : 'Switch to dark mode'}
          control={<Checkbox />}
          checked={mode === 'dark'}
          onChange={(event) => {
            setMode(event.target.checked ? 'dark' : 'light');
          }}
          sx={{ color: (theme) => theme.alias.textMain }}
        />
      </NoSsr>
    </Box>
  );
}

const StyledSlider = styled(SliderUnstyled)(
  ({ theme }) => `
  color: ${theme.alias.surfacePrimary};
  height: 4px;
  width: 100%;
  padding: 13px 0;
  display: inline-block;
  position: relative;
  cursor: pointer;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;
  opacity: 0.75;
  &:hover {
    opacity: 1;
  }

  & .MuiSlider-rail {
    display: block;
    position: absolute;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background-color: currentColor;
    opacity: 0.38;
  }

  & .MuiSlider-track {
    display: block;
    position: absolute;
    height: 4px;
    border-radius: 2px;
    background-color: currentColor;
  }

  & .MuiSlider-thumb {
    position: absolute;
    width: 14px;
    height: 14px;
    margin-left: -6px;
    margin-top: -5px;
    box-sizing: border-box;
    border-radius: 50%;
    outline: 0;
    border: 2px solid currentColor;
    background-color: ${theme.alias.surface};

    // cause className recalculation
    :hover,
    &.Mui-focusVisible {
      box-shadow: 0 0 0 0.25rem ${alpha(
        theme.palette.mode === 'light' ? '#1976d2' : '#90caf9',
        0.15,
      )};
    }

    &.Mui-active {
      box-shadow: 0 0 0 0.25rem ${theme.alias.surfacePrimaryAlpha};
    }
  }
`,
);

const Card = styled('div')(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(1),
  backgroundColor: theme.alias.surface,
  borderRadius: '10px',
  border: '1px solid',
  borderColor: theme.alias.border,
}));

export default function CssVars() {
  const [paused, setPaused] = React.useState(true);
  return (
    <CssVarsProvider
      theme={lightTheme}
      paletteSchemes={{
        light: lightTheme.palette,
        dark: darkTheme.palette,
      }}
      alias={{
        background: {
          light: 'var(--palette-neutral-50)',
          dark: 'var(--palette-neutral-900)',
        },
        surface: {
          light: 'var(--palette-neutral-100)',
          dark: 'var(--palette-neutral-800)',
        },
        surfacePrimary: {
          light: 'var(--palette-primary-500)',
          dark: 'var(--palette-primary-400)',
        },
        surfacePrimaryAlpha: {
          light: 'var(--palette-primaryAlpha-500)',
          dark: 'var(--palette-primaryAlpha-500)',
        },
        border: {
          light: 'var(--palette-neutral-200)',
          dark: 'var(--palette-neutral-600)',
        },
        textMain: {
          light: 'var(--palette-neutral-900)',
          dark: 'var(--palette-neutral-50)',
        },
        textSupport: {
          light: 'var(--palette-neutral-500)',
          dark: 'var(--palette-neutral-300)',
        },
      }}
    >
      <GlobalStyles
        styles={{
          body: {
            margin: 0,
            padding: 0,
          },
        }}
      />
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: (theme) => theme.alias.background,
        }}
      >
        <ModeToggle />
        <Stack spacing={3}>
          <Card>
            <img
              alt="Beside Myself album cover"
              style={{ borderRadius: 5 }}
              src="/static/images/cards/basement-beside-myself.jpeg"
              width="124"
              height="124"
            />
            <Box sx={{ alignSelf: 'center', mx: 2 }}>
              <Box sx={{ fontWeight: 500, color: (theme) => theme.alias.textMain }}>
                Ultraviolet
              </Box>
              <Box sx={{ color: (theme) => theme.alias.textSupport }}>Basement • Beside Myself</Box>
              <Box
                sx={{
                  mt: 2,
                  display: 'flex',
                  color: (theme) => theme.alias.textSupport,
                }}
              >
                <Box aria-label="fast rewind">
                  <FastRewindRounded />
                </Box>
                <Box
                  aria-label={paused ? 'play' : 'pause'}
                  sx={{ mx: 2 }}
                  onClick={() => setPaused((val) => !val)}
                >
                  {paused ? <PlayArrowRounded /> : <PauseRounded />}
                </Box>
                <Box aria-label="fast forward">
                  <FastForwardRounded />
                </Box>
              </Box>
            </Box>
          </Card>
          <StyledSlider defaultValue={10} />
        </Stack>
      </Box>
    </CssVarsProvider>
  );
}
