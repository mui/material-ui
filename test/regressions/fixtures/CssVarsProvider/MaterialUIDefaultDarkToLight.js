import * as React from 'react';
import { CssVarsProvider, extendTheme, useColorScheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';

function LightMode() {
  const { setMode } = useColorScheme();
  React.useEffect(() => {
    setMode('light');
  }, [setMode]);
  return null;
}

const theme = extendTheme({ defaultColorScheme: 'dark', colorSchemeSelector: '.mode-%s' });

export default function MaterialUIDefaultDark() {
  return (
    <CssVarsProvider theme={theme}>
      <LightMode />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(256px, 1fr))',
          gridAutoRows: 'minmax(160px, auto)',
          gap: 2,
          '& > div': {
            placeSelf: 'center',
          },
        }}
      >
        <AppBar position="static" color="secondary" elevation={12}>
          <Toolbar>The color should be secondary.</Toolbar>
        </AppBar>
        <Box sx={{ bgcolor: '#121212', p: 4 }}>
          <Paper elevation={24} sx={{ bgcolor: '#121212', p: 2, color: '#fff' }}>
            You <em>should not</em> see overlay.
          </Paper>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
