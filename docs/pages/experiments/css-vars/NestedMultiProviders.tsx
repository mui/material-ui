import * as React from 'react';
import {
  generateCssThemeVars,
  Experimental_NestedCssVarsProvider as NestedCssVarsProvider,
  experimental_extendTheme as extendTheme,
} from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import BrandingCssVarsProvider from 'docs/src/BrandingCssVarsProvider';
import AppHeader from 'docs/src/layouts/AppHeader';
import GlobalStyles from '@mui/material/GlobalStyles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const customTheme = extendTheme({
  cssVarPrefix: 'mini',
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: pink[500],
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: pink[300],
        },
      },
    },
  },
});

export default function NestedMultiProviders() {
  const { styles, theme: miniAppTheme } = generateCssThemeVars({
    theme: customTheme,
    rootSelector: '.demo',
    colorSchemeSelector: (key) => `[data-mui-color-scheme="${key}"] .demo`,
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
            <NestedCssVarsProvider theme={miniAppTheme}>
              <Stack direction="row" spacing={2}>
                <Button variant="outlined">Outlined</Button>
                <Button variant="contained">Contained</Button>
              </Stack>
            </NestedCssVarsProvider>
          </Box>
        </Paper>

        <Paper variant="outlined" sx={{ p: 2, mt: 3 }}>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h2">Text Field</Typography>
              <Typography>
                This is a demo that shows how to create nested CSS variables scope.
              </Typography>
            </Box>
          </Box>
          <Box className="demo" sx={{ mt: 2, borderRadius: 1, bgcolor: 'background.paper', p: 2 }}>
            <NestedCssVarsProvider theme={miniAppTheme}>
              <Stack direction="row" spacing={2}>
                <TextField variant="outlined" placeholder="Outlined" label="Label" />
                <TextField variant="filled" placeholder="Filled" label="Label" />
              </Stack>
            </NestedCssVarsProvider>
          </Box>
        </Paper>
      </Container>
    </BrandingCssVarsProvider>
  );
}
