import * as React from 'react';
import Chip from '@mui/joy/Chip';

export default function ClickableChip() {
  return (
    <Chip componentsProps={{ action: { component: 'a', href: '#as-link' } }}>
      Anchor chip
    </Chip>
  );
}
