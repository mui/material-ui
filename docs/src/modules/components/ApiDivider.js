import * as React from 'react';
import MuiDivider from '@mui/material/Divider';

export default function Divider() {
  return (
    <MuiDivider
      sx={{
        mt: 5,
        borderBottomWidth: 2,
        borderBottomStyle: 'dashed',
        borderBottomColor: (theme) =>
          theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[300],
      }}
    />
  );
}
