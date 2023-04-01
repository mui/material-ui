import * as React from 'react';
import MuiDivider from '@mui/material/Divider';

export default function Divider() {
  return (
    <MuiDivider
      sx={{
        mt: 5,
        borderBottomWidth: 2,
        borderBottomStyle: 'dashed',
        borderBottomColor: 'divider',
      }}
    />
  );
}
