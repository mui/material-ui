import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';

export default function CircularProgressFlexItem() {
  return (
    <CssVarsProvider>
      <Box sx={{ display: 'flex', width: 200, gap: 2 }}>
        <CircularProgress determinate value={50} />
        <Typography>Hello World, this is a very long sentence.</Typography>
      </Box>
    </CssVarsProvider>
  );
}
