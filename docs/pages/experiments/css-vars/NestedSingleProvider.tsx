import * as React from 'react';
import {
  generateCssThemeVars,
  Experimental_CssVarsProvider as CssVarsProvider,
} from '@mui/material/styles';
import BrandingCssVarsProvider from 'docs/src/BrandingCssVarsProvider';
import AppHeader from 'docs/src/layouts/AppHeader';
import GlobalStyles from '@mui/material/GlobalStyles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

function MiniApp() {
  // if theme input is not provided, the output theme is the default theme.
  const { styles, theme } = generateCssThemeVars({
    rootSelector: '.demo',
    colorSchemeSelector: (key) => `[data-mui-color-scheme="${key}"] .demo`,
  });
  return (
    <CssVarsProvider theme={theme}>
      <GlobalStyles styles={styles} />
      <Stack direction="row" spacing={2}>
        <Button variant="outlined">Outlined</Button>
        <Button variant="contained">Contained</Button>
      </Stack>
    </CssVarsProvider>
  );
}

export default function NestedSingleProvider() {
  return (
    <BrandingCssVarsProvider>
      <AppHeader />
      <Container sx={{ my: 3 }}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h2">Button</Typography>
              <Typography>
                This is a demo that shows how to create nested CSS variables scope.
              </Typography>
            </Box>
          </Box>
          <Box className="demo" sx={{ mt: 2, borderRadius: 1, bgcolor: 'background.paper', p: 2 }}>
            <MiniApp />
          </Box>
        </Paper>
      </Container>
    </BrandingCssVarsProvider>
  );
}
