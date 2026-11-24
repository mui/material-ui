import * as React from 'react';
import OTPField from '@mui/material/OTPField';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/FormControl' {
  interface FormControlPropsSizeOverrides {
    compact: true;
  }
}

<OTPField size="compact" />;
createTheme({
  components: {
    MuiOTPField: {
      defaultProps: { size: 'compact' },
      styleOverrides: {
        input: ({ ownerState }) => ({ width: ownerState.size === 'compact' ? 32 : 48 }),
      },
    },
  },
});
