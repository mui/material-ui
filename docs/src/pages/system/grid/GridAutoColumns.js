import * as React from 'react';
import Box from '@material-ui/core/Box';

export default function GridAutoColumns() {
  return (
    <div style={{ width: '100%' }}>
      <Box sx={{ display: 'grid', p: 1, height: '60px', gridAutoColumns: '60px' }}>
        <Box sx={{ gridColumn: '1 / 2', gridRow: '2 / 3', border: 1 }} />
        <Box sx={{ gridColumn: '5 / 6', gridRow: '2 / 3', border: 1 }} />
      </Box>
    </div>
  );
}
