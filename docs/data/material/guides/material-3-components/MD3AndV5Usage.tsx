import * as React from 'react';
import MD2Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MD3Button from '@mui/material-next/Button';
import { CssVarsProvider, extendTheme } from '@mui/material-next/styles';
import { Stack } from '@mui/system';

const md2Theme = createTheme();
const md3Theme = extendTheme();

export default function MD3AndV5Usage() {
  return (
    <ThemeProvider theme={md2Theme}>
      <Stack spacing={2} direction="row">
        <MD2Button variant="contained">MD2 Button</MD2Button>
        <CssVarsProvider theme={md3Theme}>
          <MD3Button variant="filled">MD3 Button</MD3Button>
        </CssVarsProvider>
      </Stack>
    </ThemeProvider>
  );
}
