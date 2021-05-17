import * as React from 'react';
import Box from '@material-ui/core/Box';

export default function ValueAsFunction() {
  return (
    <div>
      <Box
        sx={{
          p: 1,
          border: 1,
          borderColor: (theme) => theme.palette.primary.main,
        }}
      >
        Border color with theme value.
      </Box>
    </div>
  );
}
