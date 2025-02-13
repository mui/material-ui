import * as React from 'react';
import { CssVarsProvider, extendTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';

const theme = extendTheme({ colorSchemes: { dark: true }, colorSchemeSelector: '.mode-%s' });

export default function MaterialUIDefaultDark() {
  const [, rerender] = React.useState(false);
  React.useEffect(() => {
    // Trigger rerender to ensure that the UI does not change after the first render.
    // To catch bug like https://github.com/mui/material-ui/issues/36452
    rerender(true);
  }, []);
  return (
    <CssVarsProvider theme={theme}>
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
          <Toolbar>The color should be `palette.AppBar.darkBg`</Toolbar>
        </AppBar>
        <Box sx={{ bgcolor: '#121212', p: 4 }}>
          <Paper elevation={24} sx={{ bgcolor: '#121212', p: 2, color: '#fff' }}>
            You should see overlay.
          </Paper>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
