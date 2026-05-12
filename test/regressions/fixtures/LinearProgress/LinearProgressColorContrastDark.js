import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

const COLORS = ['primary', 'secondary', 'error', 'info', 'success', 'warning'];

const theme = createTheme({ palette: { mode: 'dark' } });

export default function LinearProgressColorContrastDark() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', color: 'text.primary', p: 2 }}>
        <Stack spacing={2} sx={{ maxWidth: 320 }}>
          {COLORS.map((color) => (
            <div key={color} data-color={color}>
              <LinearProgress
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
