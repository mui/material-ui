import * as React from 'react';
import Chip from '@mui/joy/Chip';

export default function LinkChip() {
  return (
    <Chip slotProps={{ action: { component: 'a', href: '#as-link' } }}>
      Anchor chip
    </Chip>
  );
}
