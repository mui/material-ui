// @flow weak

import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

function theme(outerTheme) {
  return createMuiTheme({
    typography: {
      fontFamily:
        '-apple-system,system-ui,BlinkMacSystemFont,' +
        '"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
      body1: {
        fontWeight: outerTheme.typography.fontWeightMedium,
      },
      button: {
        fontStyle: 'italic',
      },
    },
  });
}

function TypographyTheme() {
  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <Typography type="body1">{'body1'}</Typography>
        <Button>{'Button'}</Button>
      </div>
    </MuiThemeProvider>
  );
}

export default TypographyTheme;
