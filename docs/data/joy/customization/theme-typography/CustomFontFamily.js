import * as React from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';

const customTheme = extendTheme({
  fontFamily: {
    body: 'SF Pro Text',
  },
  cssVarPrefix: 'font',
});

export default function CustomFontFamily() {
  return (
    <CssVarsProvider theme={customTheme}>
      <CssBaseline />
      <Typography>Hello I am SF Pro Text</Typography>
    </CssVarsProvider>
  );
}
