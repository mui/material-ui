import * as React from 'react';
import Badge from '@mui/joy/Badge';
import Typography from '@mui/joy/Typography';

export default function SimpleBadge() {
  return (
    <Badge>
      <Typography sx={{ fontSize: 'xl' }}>🛒</Typography>
    </Badge>
  );
}
