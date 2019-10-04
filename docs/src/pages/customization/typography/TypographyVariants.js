import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const theme = createMuiTheme({
  typography: {
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      fontStyle: 'italic',
    },
  },
});

export default function TypographyVariants() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Typography variant="subtitle1">subtitle</Typography>
        <Typography>body1</Typography>
        <Button>Button</Button>
      </div>
    </ThemeProvider>
  );
}
