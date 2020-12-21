import * as React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const theme = createMuiTheme({
  typography: {
    poster: {
      color: 'red',
    },
    // Disable v3 variant
    h3: undefined,
  },
});

declare module '@material-ui/core/styles/createTypography' {
  interface Typography {
    poster: React.CSSProperties;
  }

  // allow configuration using `createMuiTheme`
  interface TypographyOptions {
    poster?: React.CSSProperties;
  }
}

declare module '@material-ui/core/Typography/Typography' {
  interface TypographyPropsVariantOverrides {
    poster: true;
    h3: false;
  }
}

export default function FontSizeTheme() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ '& > *': { display: 'block' } }}>
        {/* A new variant */}
        <Typography variant="poster">poster</Typography>
        {/* @ts-expect-error Variant h3 is no longer supported*/}
        <Typography variant="h3">h3</Typography>
      </Box>
    </ThemeProvider>
  );
}
