import * as React from 'react';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import OpenInNew from '@mui/icons-material/OpenInNew';
import Menu from '@mui/material/Unstable_Menu2';
import MenuLinkItem from '@mui/material/Unstable_Menu2LinkItem';
import MenuSeparator from '@mui/material/Unstable_Menu2Separator';

export default function LinkItemsMenu2() {
  return (
    <Menu trigger={<Button>Help</Button>}>
      <MenuLinkItem href="/material-ui/getting-started/">
        Getting started
      </MenuLinkItem>
      <MenuLinkItem href="/material-ui/react-menu/">Menu documentation</MenuLinkItem>
      <MenuSeparator />
      <MenuLinkItem
        href="https://github.com/mui/material-ui"
        target="_blank"
        rel="noopener"
      >
        <ListItemText>GitHub repository</ListItemText>
        <ListItemIcon sx={{ minWidth: 'auto' }}>
          <OpenInNew fontSize="small" />
        </ListItemIcon>
      </MenuLinkItem>
    </Menu>
  );
}
