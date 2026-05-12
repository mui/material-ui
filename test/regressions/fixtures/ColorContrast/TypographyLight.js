import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const COLORS = ['primary', 'secondary', 'error', 'info', 'success', 'warning'];

const theme = createTheme({ palette: { mode: 'light' } });

export default function TypographyLight() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', p: 2 }}>
        <Stack spacing={1}>
          {COLORS.map((color) => (
            <div key={color} data-color={color}>
              <Typography color={color}>{color} typography text</Typography>
            </div>
          ))}
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
