import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';

export default function BasicAvatars() {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Avatar />
      <Avatar>JG</Avatar>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
    </Box>
  );
}
