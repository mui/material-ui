import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function EnableColorOnDarkAppBar() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          flexGrow: 1,
          m: '-24px',
          p: '24px',
          bgcolor: 'background.default',
          borderRadius: { sm: '10px' },
        }}
      >
        <AppBar position="static" enableColorOnDark sx={{ mb: theme.spacing(2) }}>
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            enableColorOnDark
          </Toolbar>
        </AppBar>
        <AppBar color="primary" position="static">
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            default
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
