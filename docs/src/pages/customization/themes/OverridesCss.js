import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Button from 'material-ui/Button';

const theme = createMuiTheme({
  overrides: {
    // Name of the component ⚛️ / style shee
    MuiButton: {
      // Name of the rule
      root: {
        // Some CSS
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
      },
    },
  },
});

function OverridesCss() {
  return (
    <MuiThemeProvider theme={theme}>
      <Button>Overrides CSS</Button>
    </MuiThemeProvider>
  );
}

export default OverridesCss;
