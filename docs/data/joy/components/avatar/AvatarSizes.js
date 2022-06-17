import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';

export default function AvatarSizes() {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" size="sm" />
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" size="md" />
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" size="lg" />
    </Box>
  );
}
