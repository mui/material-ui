import * as React from 'react';
import Button from '@mui/joy/Button';
import { CssVarsProvider } from '@mui/joy/styles';

export default function ButtonUsage() {
  return (
    <CssVarsProvider>
      <Button variant="solid">Hello world</Button>{' '}
    </CssVarsProvider>
  );
}
