import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';

const COLORS = ['primary', 'secondary', 'error', 'info', 'success', 'warning'];

const theme = createTheme({ palette: { mode: 'dark' } });

export default function SliderColorContrastDark() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', p: 2 }}>
        <Stack spacing={3} sx={{ maxWidth: 320 }}>
          {COLORS.map((color) => (
            <div key={color} data-color={color}>
              <Slider color={color} defaultValue={50} aria-label={`${color} slider`} />
            </div>
          ))}
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
