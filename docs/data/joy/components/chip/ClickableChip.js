import CheckIcon from '@mui/icons-material/Check';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import * as React from 'react';

export default function ClickableChip() {
  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <Chip
        variant="outlined"
        color="neutral"
        size="lg"
        startDecorator={<Avatar size="sm" src={`/static/images/avatar/1.jpg`} />}
        endDecorator={<CheckIcon fontSize="md" />}
        onClick={() => alert('You clicked the Joy Chip!')}
      >
        Mark
      </Chip>
    </Box>
  );
}
