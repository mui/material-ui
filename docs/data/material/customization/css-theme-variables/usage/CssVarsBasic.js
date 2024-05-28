import * as React from 'react';
import { extendTheme, CssVarsProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

const theme = extendTheme({
  cssVarPrefix: 'md-demo',
});

export default function CssVarsBasic() {
  return (
    <CssVarsProvider theme={theme}>
      <Button variant="contained">Hello world</Button>
    </CssVarsProvider>
  );
}
