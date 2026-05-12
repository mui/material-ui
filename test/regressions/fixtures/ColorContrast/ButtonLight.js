import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const VARIANTS = ['text', 'outlined', 'contained'];
const COLORS = ['primary', 'secondary', 'success', 'error', 'info', 'warning'];

const theme = createTheme({ palette: { mode: 'light' } });

export default function ButtonLight() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', p: 2 }}>
        <Stack spacing={1}>
          {VARIANTS.map((variant) => (
            <Stack key={variant} direction="row" spacing={1}>
              {COLORS.map((color) => (
                <Button
                  key={color}
                  variant={variant}
                  color={color}
                  data-variant={variant}
                  data-color={color}
                >
                  {color} {variant}
                </Button>
              ))}
            </Stack>
          ))}
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
