import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme } from '@material-ui/core/styles';

// Update the TextField's extendable props options
declare module '@material-ui/core/TextField' {
  interface TextFieldPropsColorOverrides {
    customPalette: true;
  }
  interface TextFieldPropsSizeOverrides {
    extraLarge: true;
  }
}

declare module '@material-ui/core/styles' {
  interface Palette {
    customPalette: Palette['primary'];
  }
  interface PaletteOptions {
    customPalette: PaletteOptions['primary'];
  }
}

// theme typings should work as expected
const theme = createMuiTheme({
  palette: {
    customPalette: {
      light: '#e38585',
      main: '#fa0505',
      dark: '#480404',
      contrastText: '#fff',
    },
  },
});

<TextField color="customPalette" size="extraLarge">
  Custom
</TextField>;
