import * as React from 'react';
import MuiDivider from '@mui/material/Divider';

export default function Divider() {
  return (
    <MuiDivider
      sx={{
        mt: 5,
        borderBottomWidth: 3,
        borderBottomStyle: 'double',
        borderBottomColor: 'rgb(200,200,200)',
      }}
    />
  );
}
