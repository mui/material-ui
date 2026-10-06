import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Unstable_Menu2';
import MenuCheckboxItem from '@mui/material/Unstable_Menu2CheckboxItem';

export default function CheckboxMenu2() {
  const [shown, setShown] = React.useState({
    ruler: true,
    outline: false,
    grid: false,
  });

  const toggle = (key: keyof typeof shown) => (checked: boolean) => {
    setShown((current) => ({ ...current, [key]: checked }));
  };

  return (
    <Menu trigger={<Button>View</Button>}>
      <MenuCheckboxItem checked={shown.ruler} onCheckedChange={toggle('ruler')}>
        Ruler
      </MenuCheckboxItem>
      <MenuCheckboxItem checked={shown.outline} onCheckedChange={toggle('outline')}>
        Outline
      </MenuCheckboxItem>
      <MenuCheckboxItem checked={shown.grid} onCheckedChange={toggle('grid')}>
        Grid
      </MenuCheckboxItem>
    </Menu>
  );
}
