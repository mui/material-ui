import * as React from 'react';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  useColorScheme,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Slider from '@mui/material/Slider';
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

const marks = [
  {
    value: 0,
    label: '0°C',
  },
  {
    value: 20,
    label: '20°C',
  },
  {
    value: 37,
    label: '37°C',
  },
  {
    value: 100,
    label: '100°C',
  },
];

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
          <Box sx={{ width: 300 }}>
            <Slider
              aria-label="Temperature"
              defaultValue={30}
              valueLabelDisplay="auto"
              step={10}
              marks
              min={10}
              max={110}
            />
            <Slider defaultValue={30} step={10} marks min={10} max={110} disabled />
            <Slider defaultValue={30} step={10} marks min={10} max={110} color="secondary" />
          </Box>
          <Slider
            track="inverted"
            aria-labelledby="track-inverted-slider"
            defaultValue={30}
            marks={marks}
          />
          <Slider
            track="inverted"
            aria-labelledby="track-inverted-range-slider"
            defaultValue={[20, 37]}
            marks={marks}
          />
        </Box>
      </Container>
    </CssVarsProvider>
  );
}
