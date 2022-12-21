import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import AspectRatio from '@mui/joy/AspectRatio';

export default function VariantColorJoy() {
  return (
    <CssVarsProvider>
      <AspectRatio sx={{ borderRadius: 'xl' }} />
    </CssVarsProvider>
  );
}
