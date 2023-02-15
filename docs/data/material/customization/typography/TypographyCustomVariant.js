import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const theme = createTheme({
  typography: {
    // @ts-ignore
    poster: {
      fontSize: '4rem',
      color: 'indianred',
    },
    // Disable v3 variant
    h3: undefined,
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          // we have to provide the default variantMapping first because currently
          // custom entries will replace this whole object instead of being merged
          h1: 'h1',
          h2: 'h2',
          h3: 'h3',
          h4: 'h4',
          h5: 'h5',
          h6: 'h6',
          subtitle1: 'h6',
          subtitle2: 'h6',
          body1: 'p',
          body2: 'p',
          inherit: 'p',
          // @ts-ignore
          poster: 'h1', // map our new variant to render an <h1> by default
        },
      },
    },
  },
});

export default function TypographyCustomVariant() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ '& > *': { display: 'block' } }}>
        {/* @ts-ignore */}
        <Typography variant="poster">poster</Typography>
        <Typography variant="h3">h3</Typography>
      </Box>
    </ThemeProvider>
  );
}
