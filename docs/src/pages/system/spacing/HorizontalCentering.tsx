import * as React from 'react';
import Box from '@material-ui/core/Box';

export default function HorizontalCentering() {
  return (
    <div>
      <Box
        sx={{
          mx: 'auto',
          bgcolor: 'primary.main',
          color: '#fff',
          width: 200,
          p: 1,
          m: 1,
          borderRadius: 1,
          textAlign: 'center',
        }}
      >
        Centered element
      </Box>
    </div>
  );
}
