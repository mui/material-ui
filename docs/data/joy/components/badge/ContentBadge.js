import * as React from 'react';
import Box from '@mui/joy/Box';
import Badge from '@mui/joy/Badge';
import Typography from '@mui/joy/Typography';
import Warning from '@mui/icons-material/Warning';

export default function ContentBadge() {
  return (
    <Box sx={{ display: 'flex', gap: 3 }}>
      <Badge badgeContent={4}>
        <Typography sx={{ fontSize: 'xl' }}>🛍</Typography>
      </Badge>
      <Badge badgeContent="❕">
        <Typography sx={{ fontSize: 'xl' }}>🔔</Typography>
      </Badge>
      <Badge variant="plain" color="danger" badgeContent={<Warning />}>
        <Typography sx={{ fontSize: 'xl' }}>🪫</Typography>
      </Badge>
    </Box>
  );
}
