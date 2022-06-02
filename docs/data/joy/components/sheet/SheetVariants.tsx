import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import * as React from 'react';

export default function SheetElevations() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        '& > div': {
          m: 2,
          width: 128,
          height: 128,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    >
      <Sheet variant="plain">Plain</Sheet>
      <Sheet variant="solid">Solid</Sheet>
      <Sheet variant="outlined">Outlined</Sheet>
      <Sheet variant="soft">Soft</Sheet>
    </Box>
  );
}
