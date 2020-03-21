import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

type CustomVariant = 'special1' | 'special2';

// You need to specify custom variant names via module augmentation
declare module '@material-ui/core/styles/createTypography' {
  interface CustomVariants extends Record<CustomVariant, TypographyStyle> {}
  interface CustomVariantsOptions extends Record<CustomVariant, TypographyStyleOptions> {}
}

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
