import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Button from '@mui/joy/Button';

export default function Joy() {
  return (
    <CssVarsProvider>
      <div style={{ display: 'grid', gap: 16 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button size="small" disabled>
            Button
          </Button>
          <Button size="small" variant="contained" disabled>
            Button
          </Button>
          <Button size="small" variant="outlined" disabled>
            Button
          </Button>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <Button>Button</Button>
          <Button variant="contained">Button</Button>
          <Button variant="outlined">Button</Button>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <Button size="large">Button</Button>
          <Button size="large" variant="contained">
            Button
          </Button>
          <Button size="large" variant="outlined">
            Button
          </Button>
        </div>
      </div>
    </CssVarsProvider>
  );
}
