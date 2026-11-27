import * as React from 'react';
import Button from '@mui/material/Button';
import OpenInNew from '@mui/icons-material/OpenInNew';
import Menu from '@mui/material/Unstable_Menu2';
import MenuPopup from '@mui/material/Unstable_Menu2Popup';
import MenuTrigger from '@mui/material/Unstable_Menu2Trigger';
import MenuLinkItem from '@mui/material/Unstable_Menu2LinkItem';
import MenuSeparator from '@mui/material/Unstable_Menu2Separator';

export default function LinkItemsMenu2() {
  return (
    // @focus-start @padding 2
    <Menu>
      <MenuTrigger render={<Button>Help</Button>} />
      <MenuPopup>
        <MenuLinkItem href="/material-ui/getting-started/">
          Getting started
        </MenuLinkItem>
        <MenuLinkItem href="/material-ui/react-menu/">
          Menu documentation
        </MenuLinkItem>
        <MenuSeparator />
        <MenuLinkItem
          href="https://github.com/mui/material-ui"
          target="_blank"
          rel="noopener"
          endAdornment={<OpenInNew fontSize="small" />}
        >
          GitHub repository
        </MenuLinkItem>
      </MenuPopup>
    </Menu>
    // @focus-end
  );
}
