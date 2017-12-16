import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const fontWeightMedium = 500;
const theme = createMuiTheme({
  typography: {
    // Use the system font.
    fontFamily:
      '-apple-system,system-ui,BlinkMacSystemFont,' +
      '"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
    fontWeightMedium,
    body1: {
      fontWeight: fontWeightMedium,
    },
    button: {
      fontStyle: 'italic',
    },
  },
});

function TypographyTheme() {
  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <Typography>body1</Typography>
        <Button>Button</Button>
      </div>
    </MuiThemeProvider>
  );
}

export default TypographyTheme;
