import * as React from 'react';
import Box from '@mui/joy/Box';
import Drawer from '@mui/joy/Drawer';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Button from '@mui/joy/Button';
import List from '@mui/joy/List';
import Divider from '@mui/joy/Divider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';

type Size = 'sm' | 'md' | 'lg';

export default function DrawerSize() {
  const [state, setState] = React.useState({
    sm: false,
    md: false,
    lg: false,
  });

  const toggleDrawer =
    (size: Size, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [size]: open });
    };

  const list = (size: Size) => (
    <Box
      role="presentation"
      onClick={toggleDrawer(size, false)}
      onKeyDown={toggleDrawer(size, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text) => (
          <ListItem key={text}>
            <ListItemButton>{text}</ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text) => (
          <ListItem key={text}>
            <ListItemButton>{text}</ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <React.Fragment>
      <ButtonGroup variant="outlined">
        {(['sm', 'md', 'lg'] as const).map((size) => (
          <Button key={size} onClick={toggleDrawer(size, true)}>
            {size}
          </Button>
        ))}
      </ButtonGroup>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Drawer
          key={size}
          size={size}
          open={state[size]}
          onClose={toggleDrawer(size, false)}
        >
          {list(size)}
        </Drawer>
      ))}
    </React.Fragment>
  );
}
