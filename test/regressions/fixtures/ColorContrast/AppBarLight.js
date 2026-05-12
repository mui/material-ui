import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

const COLORS = ['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning'];

const theme = createTheme({ palette: { mode: 'light' } });

export default function AppBarLight() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', p: 2 }}>
        <Stack spacing={2}>
          {COLORS.map((color) => (
            <div key={color} data-color={color}>
              <AppBar position="static" color={color}>
                <Toolbar>{color} appbar</Toolbar>
              </AppBar>
            </div>
          ))}
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
