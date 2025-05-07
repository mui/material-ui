import * as React from 'react';
import Badge from '@mui/joy/Badge';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

export default function BadgeSizes() {
  return (
    <Box sx={{ display: 'flex', gap: 4 }}>
      <Badge badgeContent={10} size="sm">
        <Typography sx={{ fontSize: 'xl' }}>💌</Typography>
      </Badge>
      <Badge badgeContent={20} size="md">
        <Typography sx={{ fontSize: 'xl' }}>💌</Typography>
      </Badge>
      <Badge badgeContent={30} size="lg">
        <Typography sx={{ fontSize: 'xl' }}>💌</Typography>
      </Badge>
    </Box>
  );
}
