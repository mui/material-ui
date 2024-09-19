import * as React from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DefaultPropsProvider from '@mui/material/DefaultPropsProvider';
import Button from '@mui/material/Button';
import md2Slots from '@mui/material/md2';
import md3Slots from '@mui/material/md3';

const theme = createTheme();

export default function MD3() {
  return (
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
        <Button variant='elevated'>Button</Button>
      </div>
      <div>
        <DefaultPropsProvider value={md2Slots}>
          <Button>Button</Button>
        </DefaultPropsProvider>
      </div>
      <div>
        <DefaultPropsProvider value={md3Slots}>
          <Button >Button</Button>
        </DefaultPropsProvider>
      </div>
    </Box>
  );
}
