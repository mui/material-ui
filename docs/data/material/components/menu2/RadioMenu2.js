import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Unstable_Menu2';
import MenuRadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import MenuRadioItem from '@mui/material/Unstable_Menu2RadioItem';

export default function RadioMenu2() {
  const [zoom, setZoom] = React.useState('fit');

  return (
    <Menu trigger={<Button>Zoom</Button>}>
      <MenuRadioGroup value={zoom} onValueChange={setZoom}>
        <MenuRadioItem value="50">50%</MenuRadioItem>
        <MenuRadioItem value="100">100%</MenuRadioItem>
        <MenuRadioItem value="200">200%</MenuRadioItem>
        <MenuRadioItem value="fit">Fit to window</MenuRadioItem>
      </MenuRadioGroup>
    </Menu>
  );
}
