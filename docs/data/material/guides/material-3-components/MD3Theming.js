import * as React from 'react';
import Button from '@mui/material-next/Button';
import { extendTheme, CssVarsProvider } from '@mui/material-next/styles';

const customTheme = extendTheme({
  ref: {
    palette: {
      primary: {
        0: '#000000',
        10: '#002020',
        20: '#003738',
        30: '#004F51',
        40: '#00696B',
        50: '#008587',
        60: '#00A1A3',
        70: '#00BEC1',
        80: '#2DDBDE',
        90: '#8FF3F4',
        95: '#B2FEFF',
        99: '#F1FFFF',
        100: '#FFFFFF',
      },
    },
  },
  // cssVarPrefix is only required if multiple themes coexist
  // on the same page like on this guide
  cssVarPrefix: 'turquoise-md3',
});

export default function MD3Theming() {
  return (
    <CssVarsProvider theme={customTheme}>
      <Button color="primary" variant="filled">
        Button
      </Button>
    </CssVarsProvider>
  );
}
