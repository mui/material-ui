import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const theme = createMuiTheme({
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
  typography: { useNextVariants: true },
});

function OverridesProperties() {
  return (
    <MuiThemeProvider theme={theme}>
      <Button>Overrides properties</Button>
    </MuiThemeProvider>
  );
}

export default OverridesProperties;
