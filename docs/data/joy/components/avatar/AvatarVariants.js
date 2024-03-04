import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';

export default function AvatarVariants() {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Avatar variant="solid" />
      <Avatar variant="soft" />
      <Avatar variant="outlined" />
      <Avatar variant="plain" />
    </Box>
  );
}
