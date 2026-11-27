import * as React from 'react';
import Button from '@mui/material/Button';
import Cloud from '@mui/icons-material/Cloud';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Menu from '@mui/material/Unstable_Menu2';
import MenuPopup from '@mui/material/Unstable_Menu2Popup';
import MenuTrigger from '@mui/material/Unstable_Menu2Trigger';
import MenuItem from '@mui/material/Unstable_Menu2Item';
import MenuSeparator from '@mui/material/Unstable_Menu2Separator';

export default function IconMenu2() {
  return (
    // @focus-start @padding 2
    <Menu>
      <MenuTrigger render={<Button>Edit</Button>} />
      <MenuPopup sx={{ width: 320 }}>
        <MenuItem startAdornment={<ContentCut fontSize="small" />} endAdornment="⌘X">
          Cut
        </MenuItem>
        <MenuItem
          startAdornment={<ContentCopy fontSize="small" />}
          endAdornment="⌘C"
        >
          Copy
        </MenuItem>
        <MenuItem
          startAdornment={<ContentPaste fontSize="small" />}
          endAdornment="⌘V"
        >
          Paste
        </MenuItem>
        <MenuItem inset endAdornment="⇧⌘V">
          Paste as plain text
        </MenuItem>
        <MenuSeparator />
        <MenuItem startAdornment={<Cloud fontSize="small" />}>
          Web clipboard
        </MenuItem>
      </MenuPopup>
    </Menu>
    // @focus-end
  );
}
