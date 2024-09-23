import * as React from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DefaultPropsProvider from '@mui/material/DefaultPropsProvider';
import Button from '@mui/material/Button';
import md2Slots from '@mui/material/md2';
import md3Slots from '@mui/material/md3';
import ShoppingCart from '@mui/icons-material/ShoppingCart';

const theme = createTheme();

export default function MD3() {
  return (
    <ThemeProvider theme={() => theme}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
          placeItems: 'center',
          gap: 3,
          p: 3,
        }}
      >
        <div>
          <Button startIcon={<ShoppingCart />} variant="elevated">
            Button
          </Button>
        </div>
        <div>
          <DefaultPropsProvider value={md2Slots}>
            <Button startIcon={<ShoppingCart />}>Button</Button>
          </DefaultPropsProvider>
        </div>
        <div>
          <DefaultPropsProvider value={md3Slots}>
            <Button startIcon={<ShoppingCart />}>Button</Button>
          </DefaultPropsProvider>
        </div>
      </Box>
    </ThemeProvider>
  );
}
