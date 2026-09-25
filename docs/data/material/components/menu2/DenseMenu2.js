import * as React from 'react';
import Button from '@mui/material/Button';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2Separator from '@mui/material/Unstable_Menu2Separator';

export default function DenseMenu2() {
  return (
    <Menu2 trigger={<Button>Options</Button>} slotProps={{ list: { dense: true } }}>
      <Menu2Item>Single</Menu2Item>
      <Menu2Item>1.15</Menu2Item>
      <Menu2Item>Double</Menu2Item>
      <Menu2Separator />
      <Menu2Item>Custom: 1.2</Menu2Item>
      <Menu2Item>Add space before paragraph</Menu2Item>
    </Menu2>
  );
}
