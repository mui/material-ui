import * as React from 'react';
import Badge from '@mui/joy/Badge';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

export default function BadgeVariants() {
  return (
    <Box sx={{ display: 'flex', gap: 4 }}>
      <Badge badgeContent={1} variant="solid">
        <Typography fontSize="xl">💌</Typography>
      </Badge>
      <Badge badgeContent={2} variant="soft">
        <Typography fontSize="xl">💌</Typography>
      </Badge>
      <Badge badgeContent={3} variant="outlined">
        <Typography fontSize="xl">💌</Typography>
      </Badge>
      <Badge badgeContent={4} variant="plain">
        <Typography fontSize="xl">💌</Typography>
      </Badge>
    </Box>
  );
}
