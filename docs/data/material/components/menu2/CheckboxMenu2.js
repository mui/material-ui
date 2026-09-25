import * as React from 'react';
import Button from '@mui/material/Button';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2CheckboxItem from '@mui/material/Unstable_Menu2CheckboxItem';

export default function CheckboxMenu2() {
  const [shown, setShown] = React.useState({
    ruler: true,
    outline: false,
    grid: false,
  });

  const toggle = (key) => (event, checked) => {
    setShown((current) => ({ ...current, [key]: checked }));
  };

  return (
    <Menu2 trigger={<Button>View</Button>}>
      <Menu2CheckboxItem checked={shown.ruler} onChange={toggle('ruler')}>
        Ruler
      </Menu2CheckboxItem>
      <Menu2CheckboxItem checked={shown.outline} onChange={toggle('outline')}>
        Outline
      </Menu2CheckboxItem>
      <Menu2CheckboxItem checked={shown.grid} onChange={toggle('grid')}>
        Grid
      </Menu2CheckboxItem>
    </Menu2>
  );
}
