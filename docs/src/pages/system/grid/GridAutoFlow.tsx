import * as React from 'react';
import Box from '@material-ui/core/Box';

export default function GridAutoFlow() {
  return (
    <div style={{ width: '100%' }}>
      <Box
        sx={{
          display: 'grid',
          gridAutoFlow: 'row',
          gridTemplateColumns: '60px 60px 60px 60px 60px',
          gridTemplateRows: '30px 30px',
        }}
      >
        <Box sx={{ gridColumn: '1', gridRow: '1 / 3', border: 1 }} />
        <Box sx={{ border: 1 }} />
        <Box sx={{ border: 1 }} />
        <Box sx={{ border: 1 }} />
        <Box sx={{ gridColumn: '5', gridRow: '1 / 3', border: 1 }} />
      </Box>
    </div>
  );
}
