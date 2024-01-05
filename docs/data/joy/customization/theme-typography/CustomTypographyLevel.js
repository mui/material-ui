import * as React from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';

const customTheme = extendTheme({
  typography: {
    h1: {
      // `--joy` is the default CSS variable prefix.
      // If you have a custom prefix, you have to use it instead.
      // For more details about the custom prefix, go to https://mui.com/joy-ui/customization/using-css-variables/#custom-prefix
      background:
        'linear-gradient(-30deg, var(--joy-palette-primary-700), var(--joy-palette-primary-400))',
      // `Webkit*` properties must come later.
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
  },
});

export default function CustomTypographyLevel() {
  return (
    <CssVarsProvider theme={customTheme}>
      <Box sx={(theme) => theme.typography.h1}>This is a gradient h1</Box>
    </CssVarsProvider>
  );
}
