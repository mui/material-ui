import * as React from 'react';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

export default function VerticalDividerMiddle() {
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: 'fit-content',
          border: (theme) => `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
          bgcolor: 'background.paper',
          color: 'text.secondary',
          '& svg': {
            m: 1.5,
          },
          '& hr': {
            mx: 0.5,
          },
        }}
      >
        <Divider orientation="vertical" variant="middle" flexItem />
      </Box>
    </div>
  );
}
