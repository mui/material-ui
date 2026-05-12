import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

const COLORS = ['primary', 'secondary', 'error', 'info', 'success', 'warning'];

const theme = createTheme({ palette: { mode: 'light' } });

export default function CircularProgressLight() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', p: 2 }}>
        <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
          {COLORS.map((color) => (
            <div key={color} data-color={color}>
              <CircularProgress
                color={color}
                variant="determinate"
                value={75}
                aria-label={`${color} progress`}
              />
            </div>
          ))}
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
