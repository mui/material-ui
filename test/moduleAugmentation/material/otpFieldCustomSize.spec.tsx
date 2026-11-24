import * as React from 'react';
import OTPField from '@mui/material/OTPField';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/OTPField' {
  interface OTPFieldPropsColorOverrides {
    brand: true;
  }
  interface OTPFieldPropsSizeOverrides {
    compact: true;
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    brand: Palette['primary'];
  }
  interface PaletteOptions {
    brand?: PaletteOptions['primary'];
  }
}

<OTPField color="brand" size="compact" />;
createTheme({
  palette: { brand: { main: '#2456ad' } },
  components: {
    MuiOTPField: {
      defaultProps: { color: 'brand', size: 'compact' },
      styleOverrides: {
        input: ({ ownerState }) => ({ width: ownerState.size === 'compact' ? 32 : 48 }),
      },
    },
  },
});
