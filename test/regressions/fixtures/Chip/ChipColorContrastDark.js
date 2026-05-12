import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

const VARIANTS = ['filled', 'outlined'];
const COLORS = ['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning'];

const theme = createTheme({ palette: { mode: 'dark' } });

export default function ChipColorContrastDark() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', color: 'text.primary', p: 2 }}>
        <Stack spacing={1}>
          {VARIANTS.map((variant) => (
            <Stack key={variant} direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
              {COLORS.map((color) => (
                <div key={color} data-variant={variant} data-color={color}>
                  <Chip variant={variant} color={color} label={`${color} ${variant}`} />
                </div>
              ))}
            </Stack>
          ))}
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
