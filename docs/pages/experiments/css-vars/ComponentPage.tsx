import * as React from 'react';
import {
  useCssThemeVars,
  Experimental_NestedCssVarsProvider as NestedCssVarsProvider,
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

export default function ComponentPage() {
  const { styles, theme } = useCssThemeVars({
    selector: {
      root: '.demo',
      colorScheme: (key) => `[data-mui-color-scheme="${key}"] .demo`,
    },
  });
  return (
    <BrandingCssVarsProvider>
      <GlobalStyles styles={styles} />
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
            <NestedCssVarsProvider theme={theme}>
              <Stack direction="row" spacing={2}>
                <Button variant="outlined">Outlined</Button>
                <Button variant="contained">Contained</Button>
              </Stack>
            </NestedCssVarsProvider>
          </Box>
        </Paper>
      </Container>
    </BrandingCssVarsProvider>
  );
}
