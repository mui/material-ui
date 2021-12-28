import * as React from 'react';
import Box from '@mui/material/Box';

export default function WhiteSpace() {
  return (
    <div style={{ width: 200 }}>
      <Box
        component="div"
        sx={{
          whiteSpace: 'nowrap',
          overflowX: 'auto',
          my: 2,
          p: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        }}
      >
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
      </Box>
      <Box
        component="div"
        sx={{
          whiteSpace: 'normal',
          my: 2,
          p: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        }}
      >
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
      </Box>
    </div>
  );
}
