import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';

const VARIANTS = ['text', 'outlined'];
const COLORS = ['standard', 'primary', 'secondary'];

const theme = createTheme({ palette: { mode: 'dark' } });

export default function PaginationColorContrastDark() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', p: 2 }}>
        <Stack spacing={2}>
          {VARIANTS.map((variant) => (
            <Stack key={variant} direction="row" spacing={2} flexWrap="wrap">
              {COLORS.map((color) => (
                <div key={color} data-variant={variant} data-color={color}>
                  <Pagination count={3} page={2} variant={variant} color={color} />
                </div>
              ))}
            </Stack>
          ))}
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
