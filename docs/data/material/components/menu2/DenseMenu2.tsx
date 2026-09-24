import * as React from 'react';
import Button from '@mui/material/Button';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2Separator from '@mui/material/Unstable_Menu2Separator';

export default function DenseMenu2() {
  return (
    <Menu2 trigger={<Button>Options</Button>}>
      <Menu2Item dense>Single</Menu2Item>
      <Menu2Item dense>1.15</Menu2Item>
      <Menu2Item dense>Double</Menu2Item>
      <Menu2Separator />
      <Menu2Item dense>Custom: 1.2</Menu2Item>
      <Menu2Item dense>Add space before paragraph</Menu2Item>
    </Menu2>
  );
}
