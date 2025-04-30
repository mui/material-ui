import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import MenuIcon from '@mui/icons-material/Menu';
import Snackbar from '@mui/material/Snackbar';

const theme = createTheme({
  colorSpace: 'oklch',
  cssVariables: true,
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: 'oklch(81% 0.50 78)',
          light: 'oklch(70% 0.50 78)',
          dark: 'oklch(49% 0.50 78)',
          contrastText: '#fff',
        },
        info: {
          main: 'oklch(81% 0.50 78)',
          light: 'oklch(70% 0.50 78)',
          dark: 'oklch(49% 0.50 78)',
          contrastText: '#fff',
        },
      },
    },
    dark: true,
  },
});

export default function ColorMix() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 2,
          p: 2,
        }}
      >
        <AppBar position="static" color="default">
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>

        <Fab>
          <MenuIcon />
        </Fab>

        <Snackbar open autoHideDuration={6000} message="Note archived" />

        <Stack spacing={2}>
          <Button variant="outlined">Text</Button>
          <Button variant="contained">Text</Button>
          <Button variant="text">Text</Button>
        </Stack>

        <Stack spacing={2}>
          <Alert severity="info" variant="filled">
            This is an info alert — check it out!
          </Alert>
          <Alert severity="success">This is a success alert — check it out!</Alert>
          <Alert severity="warning">This is a warning alert — check it out!</Alert>
          <Alert severity="error">This is an error alert — check it out!</Alert>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
