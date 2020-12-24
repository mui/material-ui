import * as React from 'react';
import Box from '@material-ui/core/Box';

export default function Display() {
  return (
    <div style={{ width: '100%' }}>
      <Box
        sx={{
          display: 'grid',
          gap: '10px',
          gridTemplateRows: '25% 80px auto',
          gridTemplateColumns: '40px 50px auto 50px 40px',
        }}
      >
        <Box sx={{ border: 1 }} />
        <Box sx={{ border: 1 }} />
        <Box sx={{ border: 1, p: 1 }} />
        <Box sx={{ border: 1 }} />
        <Box sx={{ border: 1 }} />
        <Box sx={{ border: 1, p: 1 }} />
        <Box sx={{ border: 1 }} />
        <Box sx={{ border: 1 }} />
        <Box sx={{ border: 1, p: 1 }} />
        <Box sx={{ border: 1 }} />
        <Box sx={{ border: 1 }} />
        <Box sx={{ border: 1, p: 1 }} />
        <Box sx={{ border: 1 }} />
        <Box sx={{ border: 1 }} />
        <Box sx={{ border: 1, p: 1 }} />
      </Box>
    </div>
  );
}
