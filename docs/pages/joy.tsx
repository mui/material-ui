import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Button from '@mui/joy/Button';

export default function Joy() {
  return (
    <CssVarsProvider>
      <div style={{ display: 'flex', gap: 16 }}>
        <Button>Button</Button>
        <Button variant="contained">Button</Button>
        <Button variant="outlined">Button</Button>
      </div>
    </CssVarsProvider>
  );
}
