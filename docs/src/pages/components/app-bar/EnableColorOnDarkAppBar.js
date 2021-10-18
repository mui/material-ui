import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

export default function EnableColorOnDarkAppBar() {
  const [themeMode, setThemeMode] = React.useState('dark');
  const [enableColorOnDarkMode, setEnableColorOnDarkMode] = React.useState(true);

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: '#FF0000',
      },
    },
    components: {
      MuiAppBar: {
        defaultProps: {
          enableColorOnDark: enableColorOnDarkMode,
        },
      },
    },
  });

  const themeModeHandleChange = () => {
    setThemeMode(themeMode === 'dark' ? 'light' : 'dark');
  };

  const handleChange = () => {
    setEnableColorOnDarkMode(!enableColorOnDarkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={enableColorOnDarkMode}
                onChange={handleChange}
                aria-label="enable color on dark mode switch"
              />
            }
            label={
              enableColorOnDarkMode
                ? 'Disable Color on Dark'
                : 'Enable Color on Dark'
            }
          />
        </FormGroup>
        <AppBar
          color="primary"
          position="static"
          enableColorOnDark={enableColorOnDarkMode}
        >
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              MUI
            </Typography>
            <div>
              {theme.palette.mode} mode
              <IconButton
                sx={{ ml: 1 }}
                onClick={themeModeHandleChange}
                color="inherit"
              >
                {theme.palette.mode === 'dark' ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
