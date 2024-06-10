import * as React from 'react';

import { createTheme, ThemeProvider, alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import getDashboardTheme from './theme/getDashboardTheme';
import ToggleCustomTheme from './internals/components/ToggleCustomTheme';
import Copyright from './internals/components/Copyright';
import Navbar from './components/Navbar';
import Header from './components/Header';
import MainGrid from './components/MainGrid';
import SideMenu from './components/SideMenu';

export default function Dashboard() {
  const [mode, setMode] = React.useState('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const dashboardTheme = createTheme(getDashboardTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  return (
    <ThemeProvider theme={showCustomTheme ? dashboardTheme : defaultTheme}>
      <CssBaseline />
      <Box
        sx={(theme) => ({
          display: 'flex',
          backgroundColor: alpha(theme.palette.background.paper, 0.4),
          height: '100vh',
          overflow: 'auto',
        })}
      >
        <SideMenu />
        <Navbar mode={mode} toggleColorMode={toggleColorMode} />
        {/* Main content */}
        <Stack
          component="main"
          sx={{
            flexGrow: 1,
            mx: 3,
            py: 8,
            alignItems: 'center',
          }}
        >
          <Stack spacing={2} sx={{ maxWidth: { sm: '100%', md: '1700px' } }}>
            <Header />
            <MainGrid />
            <Copyright sx={{ my: 4 }} />
          </Stack>
        </Stack>
        <ToggleCustomTheme
          showCustomTheme={showCustomTheme}
          toggleCustomTheme={toggleCustomTheme}
        />
      </Box>
    </ThemeProvider>
  );
}
