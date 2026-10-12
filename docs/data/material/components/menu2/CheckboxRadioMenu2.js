import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Unstable_Menu2';
import MenuCheckboxItem from '@mui/material/Unstable_Menu2CheckboxItem';
import MenuRadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import MenuRadioItem from '@mui/material/Unstable_Menu2RadioItem';

export default function CheckboxRadioMenu2() {
  const [ruler, setRuler] = React.useState(true);
  const [outline, setOutline] = React.useState(false);
  const [grid, setGrid] = React.useState(false);
  const [zoom, setZoom] = React.useState('fit');

  return (
    <Stack direction="row" spacing={2} useFlexGap>
      <Menu trigger={<Button>View</Button>}>
        <MenuCheckboxItem checked={ruler} onCheckedChange={setRuler}>
          Ruler
        </MenuCheckboxItem>
        <MenuCheckboxItem checked={outline} onCheckedChange={setOutline}>
          Outline
        </MenuCheckboxItem>
        <MenuCheckboxItem checked={grid} onCheckedChange={setGrid}>
          Grid
        </MenuCheckboxItem>
      </Menu>
      <Menu trigger={<Button>Zoom</Button>}>
        <MenuRadioGroup value={zoom} onValueChange={setZoom}>
          <MenuRadioItem value="50">50%</MenuRadioItem>
          <MenuRadioItem value="100">100%</MenuRadioItem>
          <MenuRadioItem value="200">200%</MenuRadioItem>
          <MenuRadioItem value="fit">Fit to window</MenuRadioItem>
        </MenuRadioGroup>
      </Menu>
    </Stack>
  );
}
