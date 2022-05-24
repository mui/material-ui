import CheckIcon from '@mui/icons-material/Check';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';
import * as React from 'react';

export default function ClickableChip() {
  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <Chip disabled onClick={() => {}} endDecorator={<ChipDelete />}>
        Sam
      </Chip>
      <Chip variant="soft" onClick={() => alert('hey')}>
        Daisy
      </Chip>
      <Chip
        variant="outlined"
        color="neutral"
        size="lg"
        startDecorator={<Avatar size="sm" src={`/static/images/avatar/1.jpg`} />}
        endDecorator={<CheckIcon fontSize="md" sx={{ mr: 0.25 }} />}
        onClick={() => alert('hey')}
        sx={{ '--Chip-radius': '8px' }}
      >
        Mark
      </Chip>
    </Box>
  );
}
