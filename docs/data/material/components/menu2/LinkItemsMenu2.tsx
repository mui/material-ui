import * as React from 'react';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import OpenInNew from '@mui/icons-material/OpenInNew';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2LinkItem from '@mui/material/Unstable_Menu2LinkItem';
import Menu2Separator from '@mui/material/Unstable_Menu2Separator';

export default function LinkItemsMenu2() {
  return (
    <Menu2 trigger={<Button>Help</Button>}>
      <Menu2LinkItem href="/material-ui/getting-started/">
        Getting started
      </Menu2LinkItem>
      <Menu2LinkItem href="/material-ui/react-menu/">
        Menu documentation
      </Menu2LinkItem>
      <Menu2Separator />
      <Menu2LinkItem
        href="https://github.com/mui/material-ui"
        target="_blank"
        rel="noopener"
      >
        <ListItemText>GitHub repository</ListItemText>
        <ListItemIcon sx={{ minWidth: 'auto' }}>
          <OpenInNew fontSize="small" />
        </ListItemIcon>
      </Menu2LinkItem>
    </Menu2>
  );
}
