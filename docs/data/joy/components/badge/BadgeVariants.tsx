import * as React from 'react';
import Badge from '@mui/joy/Badge';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

export default function BadgeVariants() {
  return (
    <Box sx={{ display: 'flex', gap: 4 }}>
      <Badge badgeContent={1} variant="solid">
        <Typography sx={{ fontSize: 'xl' }}>💌</Typography>
      </Badge>
      <Badge badgeContent={2} variant="soft">
        <Typography sx={{ fontSize: 'xl' }}>💌</Typography>
      </Badge>
      <Badge badgeContent={3} variant="outlined">
        <Typography sx={{ fontSize: 'xl' }}>💌</Typography>
      </Badge>
      <Badge badgeContent={4} variant="plain">
        <Typography sx={{ fontSize: 'xl' }}>💌</Typography>
      </Badge>
    </Box>
  );
}
