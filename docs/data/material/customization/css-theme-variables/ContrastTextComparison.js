import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

// Theme with JS color implementation
const jsTheme = createTheme({
  cssVariables: false,
});

// Theme with native color implementation
const nativeTheme = createTheme({
  cssVariables: {
    nativeColor: true,
  },
});

export default function ContrastTextComparison() {
  const [red, setRed] = React.useState(132);
  const [green, setGreen] = React.useState(150);
  const [blue, setBlue] = React.useState(200);

  const backgroundColor = `rgb(${red}, ${green}, ${blue})`;

  // Get contrast text using JS theme
  const jsContrastText = jsTheme.palette.getContrastText(backgroundColor);

  // Get contrast text using native theme
  const nativeContrastText = nativeTheme.palette.getContrastText(backgroundColor);

  return (
    <Box sx={{ p: 2, width: '100%' }}>
      <Box
        sx={{
          mb: 4,
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: 2,
          alignItems: 'center',
        }}
      >
        <Typography variant="body2">R: {red}</Typography>
        <Slider
          size="sm"
          value={red}
          onChange={(_, value) => setRed(value)}
          min={0}
          max={255}
          step={1}
          valueLabelDisplay="auto"
          color="error"
        />

        <Typography variant="body2">G: {green}</Typography>
        <Slider
          size="sm"
          value={green}
          onChange={(_, value) => setGreen(value)}
          min={0}
          max={255}
          step={1}
          valueLabelDisplay="auto"
          color="success"
        />

        <Typography variant="body2">B: {blue}</Typography>
        <Slider
          size="sm"
          value={blue}
          onChange={(_, value) => setBlue(value)}
          min={0}
          max={255}
          step={1}
          valueLabelDisplay="auto"
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 3,
          flexWrap: 'wrap',
          '& > div': {
            p: 2,
            width: '100%',
            height: 100,
            bgcolor: backgroundColor,
            fontSize: '1.25rem',
            fontWeight: 'medium',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
          },
        }}
      >
        {/* JS Implementation */}
        <Box sx={{ flex: 1 }}>
          <ThemeProvider theme={jsTheme}>
            <Box
              sx={{
                color: jsContrastText,
              }}
            >
              JS Implementation
            </Box>
          </ThemeProvider>
        </Box>

        {/* Native Implementation */}
        <Box sx={{ flex: 1 }}>
          <ThemeProvider theme={nativeTheme}>
            <Box
              sx={{
                color: nativeContrastText,
              }}
            >
              Native Color
            </Box>
          </ThemeProvider>
        </Box>
      </Box>
    </Box>
  );
}
