import * as React from 'react';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Home from '@mui/icons-material/Home';
import Person from '@mui/icons-material/Person';

export default function HorizontalList() {
  return (
    <List row sx={{ bgcolor: 'background.surface', maxWidth: 343 }}>
      <ListItem>
        <ListItemButton aria-label="Home">
          <Home />
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>Products</ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>Blog</ListItemButton>
      </ListItem>
      <ListItem sx={{ marginInlineStart: 'auto' }}>
        <ListItemButton aria-label="Profile">
          <Person />
        </ListItemButton>
      </ListItem>
    </List>
  );
}
