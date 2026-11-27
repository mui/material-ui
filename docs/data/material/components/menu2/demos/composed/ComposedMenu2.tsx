import * as React from 'react';
import Button from '@mui/material/Button';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatClearIcon from '@mui/icons-material/FormatClear';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import Menu from '@mui/material/Unstable_Menu2';
import MenuPopup from '@mui/material/Unstable_Menu2Popup';
import MenuTrigger from '@mui/material/Unstable_Menu2Trigger';
import MenuSubmenuPopup from '@mui/material/Unstable_Menu2SubmenuPopup';
import MenuCheckboxItem from '@mui/material/Unstable_Menu2CheckboxItem';
import MenuItem from '@mui/material/Unstable_Menu2Item';
import MenuRadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import MenuRadioItem from '@mui/material/Unstable_Menu2RadioItem';
import MenuSeparator from '@mui/material/Unstable_Menu2Separator';
import MenuSubmenu from '@mui/material/Unstable_Menu2Submenu';
import MenuSubmenuTrigger from '@mui/material/Unstable_Menu2SubmenuTrigger';

export default function ComposedMenu2() {
  // @focus-start @padding 1
  const [bold, setBold] = React.useState(true);
  const [italic, setItalic] = React.useState(false);
  const [alignment, setAlignment] = React.useState('left');

  return (
    <Menu>
      <MenuTrigger render={<Button>Format</Button>} />
      <MenuPopup sx={{ width: 260 }}>
        <MenuCheckboxItem checked={bold} onCheckedChange={setBold} endAdornment="⌘B">
          Bold
        </MenuCheckboxItem>
        <MenuCheckboxItem
          checked={italic}
          onCheckedChange={setItalic}
          endAdornment="⌘I"
        >
          Italic
        </MenuCheckboxItem>
        <MenuSeparator />
        <MenuSubmenu>
          <MenuSubmenuTrigger
            startAdornment={<FormatAlignLeftIcon fontSize="small" />}
          >
            Align
          </MenuSubmenuTrigger>
          <MenuSubmenuPopup>
            <MenuRadioGroup value={alignment} onValueChange={setAlignment}>
              <MenuRadioItem value="left">Left</MenuRadioItem>
              <MenuRadioItem value="center">Center</MenuRadioItem>
              <MenuRadioItem value="right">Right</MenuRadioItem>
              <MenuRadioItem value="justify">Justify</MenuRadioItem>
            </MenuRadioGroup>
          </MenuSubmenuPopup>
        </MenuSubmenu>
        <MenuSeparator />
        <MenuItem
          startAdornment={<FormatClearIcon fontSize="small" />}
          endAdornment={'⌘\\'}
        >
          Clear formatting
        </MenuItem>
        <MenuItem disabled startAdornment={<FormatPaintIcon fontSize="small" />}>
          Paste format
        </MenuItem>
      </MenuPopup>
    </Menu>
  );
  // @focus-end
}
