import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';

export default function VariantColorJoy() {
  return (
    <CssVarsProvider>
      <Box sx={{ p: 2, bgcolor: 'red' }}>
        <AspectRatio sx={{ borderRadius: 'xl', minWidth: 200 }} />
      </Box>
    </CssVarsProvider>
  );
}
