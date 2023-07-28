import * as React from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';

const customTheme = extendTheme({
  fontFamily: {
    body: 'SF Pro Text',
  },
  cssVarPrefix: 'joy',
});

function TypographySystem() {
  return (
    <Box>
      <Typography>smksmkms</Typography>
    </Box>
  );
}

export default function CustomFontFamily() {
  console.log(customTheme.vars.fontFamily);
  return (
    <CssVarsProvider theme={customTheme}>
      <CssBaseline />
      <TypographySystem />
    </CssVarsProvider>
  );
}
