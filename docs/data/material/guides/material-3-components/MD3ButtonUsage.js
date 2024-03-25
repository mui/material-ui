import * as React from 'react';
import Button from '@mui/material-next/Button';
import { CssVarsProvider } from '@mui/material-next/styles';

export default function MD3ButtonUsage() {
  return (
    <CssVarsProvider>
      <Button variant="filled">Button</Button>
    </CssVarsProvider>
  );
}
