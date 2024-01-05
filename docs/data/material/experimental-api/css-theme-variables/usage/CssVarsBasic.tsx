import * as React from 'react';
import {
  experimental_extendTheme as extendTheme,
  Experimental_CssVarsProvider as CssVarsProvider,
} from '@mui/material/styles';
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
