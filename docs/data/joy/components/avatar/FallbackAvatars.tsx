import * as React from 'react';
import Box from '@mui/joy/Box';
import Avatar from '@mui/joy/Avatar';

export default function FallbackAvatars() {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Avatar alt="Remy Sharp" src="/broken-image.jpg">
        BT
      </Avatar>
      <Avatar alt="Remy Sharp" src="/broken-image.jpg" />
      <Avatar src="/broken-image.jpg" />
    </Box>
  );
}
