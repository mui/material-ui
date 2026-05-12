import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

const COLORS = ['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning'];

// AppBar extends Paper; in dark mode Paper sets `--Paper-overlay` to a
// degenerate linear-gradient for the elevation tint, which trips axe's
// color-contrast `bgGradient` guard. Suppress it so the probe can measure
// the bar's fg/bg. (`enableColorOnDark` is set per AppBar below — without
// it, palette colors fall back to a dark surface in dark mode.)
const theme = createTheme({
  palette: { mode: 'dark' },
  components: {
    MuiAppBar: { styleOverrides: { root: { backgroundImage: 'none' } } },
  },
});

export default function AppBarDark() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', color: 'text.primary', p: 2 }}>
        <Stack spacing={2}>
          {COLORS.map((color) => (
            <div key={color} data-color={color}>
              <AppBar position="static" color={color} enableColorOnDark>
                <Toolbar>{color} appbar</Toolbar>
              </AppBar>
            </div>
          ))}
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
