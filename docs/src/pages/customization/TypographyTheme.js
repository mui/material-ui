// @flow weak

import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createTypography from 'material-ui/styles/typography';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

function theme(outerTheme) {
  const typography = createTypography(outerTheme.palette, {
    // System font
    fontFamily:
      '-apple-system,system-ui,BlinkMacSystemFont,' +
      '"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
  });

  return {
    ...outerTheme,
    typography: {
      ...typography,
      body1: {
        ...typography.body1,
        fontWeight: typography.fontWeightMedium,
      },
      button: {
        ...typography.button,
        fontStyle: 'italic',
      },
    },
  };
}

function TypographyTheme() {
  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <Typography type="body1">
          {'body1'}
        </Typography>
        <Button>
          {'Button'}
        </Button>
      </div>
    </MuiThemeProvider>
  );
}

export default TypographyTheme;
