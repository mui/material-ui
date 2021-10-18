import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export default function ColorAppBarOnDark() {
  return (
    <ThemeProvider
      theme={createTheme({
        components: {
          MuiAppBar: {
            defaultProps: {
              enableColorOnDark: true,
            },
          },
        },
      })}
    >
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              MUI
            </Typography>
            <IconButton size="large" aria-label="search" color="inherit">
              <SearchIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="display more actions"
              edge="end"
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
