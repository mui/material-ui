import * as React from 'react';
import Badge from '@mui/joy/Badge';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

export default function BadgeColors() {
  return (
    <Box sx={{ display: 'flex', gap: 4 }}>
      <Badge badgeContent={'P'} color="primary">
        <Typography fontSize="xl">💌</Typography>
      </Badge>
      <Badge badgeContent={'N'} color="neutral">
        <Typography fontSize="xl">💌</Typography>
      </Badge>
      <Badge badgeContent={'D'} color="danger">
        <Typography fontSize="xl">💌</Typography>
      </Badge>
      <Badge badgeContent={'I'} color="info">
        <Typography fontSize="xl">💌</Typography>
      </Badge>
      <Badge badgeContent={'S'} color="success">
        <Typography fontSize="xl">💌</Typography>
      </Badge>
      <Badge badgeContent={'W'} color="warning">
        <Typography fontSize="xl">💌</Typography>
      </Badge>
    </Box>
  );
}
