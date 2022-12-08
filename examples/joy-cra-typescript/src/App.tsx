import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Button from '@mui/joy/Button';

export default function App() {
  return (
    <CssVarsProvider>
      <Button>Button</Button>
    </CssVarsProvider>
  );
}
