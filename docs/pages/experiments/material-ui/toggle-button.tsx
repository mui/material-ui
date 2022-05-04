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
import ToggleButton from '@mui/material/ToggleButton';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import AirlineSeatIndividualSuiteIcon from '@mui/icons-material/AirlineSeatIndividualSuite';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';

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
  const [selected, setSelected] = React.useState(true);
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
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gridAutoRows: 'minmax(160px, auto)',
            gap: 2,
            '& > div': {
              placeSelf: 'center',
            },
          }}
        >
          <Box>
            <ToggleButton value="sitting">
              <AirlineSeatReclineNormalIcon sx={{ fontSize: 40 }} />
            </ToggleButton>
          </Box>
          <Box>
            <ToggleButton
              value="lying"
              selected={selected}
              onChange={() => {
                setSelected(!selected);
              }}
            >
              <AirlineSeatReclineExtraIcon sx={{ fontSize: 40 }} />
            </ToggleButton>
          </Box>
          <Box>
            <ToggleButton value="sleeping" disabled>
              <AirlineSeatIndividualSuiteIcon sx={{ fontSize: 40 }} />
            </ToggleButton>
          </Box>
        </Box>
      </Container>
    </CssVarsProvider>
  );
}
