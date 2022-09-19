import * as React from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AlarmIcon from '@mui/icons-material/Alarm';

export default function IconButtonColors() {
  return (
    <Stack direction="row" spacing={1}>
      <IconButton aria-label="delete" style={{ color: 'red' }}>
        <DeleteIcon />
      </IconButton>
      <IconButton aria-label="alarm" style={{ color: '#1A086C' }}>
        <AlarmIcon />
      </IconButton>
    </Stack>
  );
}
