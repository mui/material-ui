import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

export default function ChipLtr() {
  return (
    <Box sx={{ width: 500 }}>
      <Stack direction="row" spacing={1}>
        <Chip avatar={<Avatar>M</Avatar>} label="Avatar" />
        <Chip
          avatar={<Avatar>N</Avatar>}
          label="Avatar"
          variant="outlined"
        />
      </Stack>
    </Box>
  );
}
