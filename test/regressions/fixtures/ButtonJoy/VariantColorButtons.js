import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';

export default function VariantColorJoy() {
  return (
    <CssVarsProvider>
      <Box sx={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(4, min-content)' }}>
        {['plain', 'outlined', 'soft', 'solid'].map((variant) => {
          return ['primary', 'neutral', 'danger', 'info', 'success', 'warning'].map((color) => (
            <Button key={`${variant}-${color}`} variant={variant} color={color}>
              {color}
            </Button>
          ));
        })}
      </Box>
    </CssVarsProvider>
  );
}
