import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { createTheme } from '@material-ui/core/styles';

// Update the TextField's extendable props options
declare module '@material-ui/core/TextField' {
  interface TextFieldPropsColorOverrides {
    customPalette: true;
  }
  interface TextFieldPropsSizeOverrides {
    extraLarge: true;
  }
}
declare module '@material-ui/core/FormControl' {
  interface FormControlPropsColorOverrides {
    customPalette: true;
  }
  interface FormControlPropsSizeOverrides {
    extraLarge: true;
  }
}
declare module '@material-ui/core/InputBase' {
  interface InputBasePropsSizeOverrides {
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
const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      variants: [
        {
          props: { size: 'extraLarge' },
          style: {
            padding: '30px 15px',
            fontSize: 40,
          },
        },
      ],
    },
  },
  palette: {
    customPalette: {
      main: 'blue',
    },
  },
});

<TextField color="customPalette" size="extraLarge">
  Custom Color TextField
</TextField>;
<TextField variant="filled" size="extraLarge">
  Custom Size TextField
</TextField>;
