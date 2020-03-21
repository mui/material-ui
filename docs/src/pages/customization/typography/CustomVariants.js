import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const theme = createMuiTheme({
  typography: {
    customVariants: {
      special1: {
        fontSize: 15,
        fontWeight: 600,
        fontStyle: 'italic',
        textTransform: 'uppercase',
      },
      special2: {
        fontSize: 12,
        fontWeight: 300,
        fontStyle: 'italic',
      },
    },
  },
  props: {
    MuiTypography: {
      variantMapping: {
        special1: 'h1',
        special2: 'span',
      },
    },
  },
});

export default function CustomVariants() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Typography variant="special1" color="primary">
          Custom Variant
        </Typography>
        <Typography variant="special2" color="primary">
          Custom Variant
        </Typography>
      </ThemeProvider>
    </div>
  );
}
