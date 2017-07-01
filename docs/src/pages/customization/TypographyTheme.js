// @flow

import React from 'react';
import { MuiThemeProvider, createMuiTheme, createTypography } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

let theme = createMuiTheme();
const typography = createTypography(theme.palette, {
  // System font
  fontFamily:
    '-apple-system,system-ui,BlinkMacSystemFont,' +
    '"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
});

theme = {
  ...theme,
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
