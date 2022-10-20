import * as React from 'react';
import Button from '@mui/material-next/Button';
import { extendTheme } from '@mui/material-next/styles';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';

const theme = extendTheme();

export default function MultilineButtonNext() {
  return (
    <CssVarsProvider theme={theme}>
      <Button variant="filled" style={{ width: 400 }}>
        {[
          'Contained buttons are rectangular-shaped buttons.',
          'They may be used inline.',
          'They lift and display ink reactions on press.',
        ].join(' ')}
      </Button>
    </CssVarsProvider>
  );
}
