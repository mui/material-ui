import * as React from 'react';
import Box from '@material-ui/core/Box';
import { Theme } from '@material-ui/core/styles';

export default function ValueAsFunction() {
  return (
    <div>
      <Box
        sx={{
          p: 1,
          border: 1,
          borderColor: (theme: Theme) => theme.palette.primary.main,
        }}
      >
        Border color with theme value.
      </Box>
    </div>
  );
}
