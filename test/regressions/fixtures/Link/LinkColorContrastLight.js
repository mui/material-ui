import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';

const COLORS = ['primary', 'secondary', 'error', 'info', 'success', 'warning'];

const theme = createTheme({ palette: { mode: 'light' } });

export default function LinkColorContrastLight() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', p: 2 }}>
        <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
          {COLORS.map((color) => (
            <div key={color} data-color={color}>
              <Link href="https://mui.com" color={color}>
                {color} link
              </Link>
            </div>
          ))}
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
