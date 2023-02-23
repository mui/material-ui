import * as React from 'react';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListDivider from '@mui/joy/ListDivider';
import ListItemButton from '@mui/joy/ListItemButton';

export default function Flexibility() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <List sx={{ maxWidth: 100, maxHeight: 100, overflow: 'scroll' }}>
        <ListItem>This is a very long text that should scale by its content.</ListItem>
        <ListItem>Item 2</ListItem>
        <ListItem>Item 3</ListItem>
        <ListItem>Item 4 </ListItem>
      </List>
      <List component="nav" sx={{ maxWidth: 100, maxHeight: 100, overflow: 'scroll' }}>
        <ListItemButton>This is a very long text that should scale by its content.</ListItemButton>
        <ListItemButton>Item 2</ListItemButton>
        <ListItemButton>Item 3</ListItemButton>
        <ListItemButton>Item 4 </ListItemButton>
      </List>
      <List sx={{ maxWidth: 100, maxHeight: 100, overflow: 'scroll' }}>
        <ListItem>
          <ListItemButton>
            This is a very long text that should scale by its content.
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>Item 2</ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>Item 3</ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>Item 4</ListItemButton>
        </ListItem>
      </List>
      <List role="menubar" orientation="horizontal">
        <ListItem role="none">
          <ListItemButton
            variant="solid"
            color="primary"
            role="menuitem"
            component="a"
            href="#horizontal-list"
            aria-label="Home"
          >
            Home
          </ListItemButton>
        </ListItem>
        <ListDivider />
        <ListItem role="none">
          <ListItemButton variant="soft" role="menuitem" component="a" href="#horizontal-list">
            Products
          </ListItemButton>
        </ListItem>
        <ListDivider />
        <ListItem role="none">
          <ListItemButton variant="soft" role="menuitem" component="a" href="#horizontal-list">
            Blog
          </ListItemButton>
        </ListItem>
        <ListItem role="none" sx={{ marginInlineStart: 'auto' }}>
          <ListItemButton
            variant="soft"
            role="menuitem"
            component="a"
            href="#horizontal-list"
            aria-label="Profile"
          >
            Account
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
