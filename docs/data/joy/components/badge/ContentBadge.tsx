import * as React from 'react';
import Box from '@mui/joy/Box';
import Badge from '@mui/joy/Badge';
import Typography from '@mui/joy/Typography';

export default function SimpleBadge() {
  return (
    <Box sx={{ display: 'flex', gap: 3 }}>
      <Badge badgeContent={4}>
        <Typography fontSize="xl">🛍</Typography>
      </Badge>
      <Badge badgeContent="❕">
        <Typography fontSize="xl">🔔</Typography>
      </Badge>
    </Box>
  );
}
