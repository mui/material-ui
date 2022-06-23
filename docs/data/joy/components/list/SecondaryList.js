import * as React from 'react';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import IconButton from '@mui/joy/IconButton';
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';

export default function SecondaryList() {
  return (
    <List sx={{ maxWidth: 300 }}>
      <ListItem
        startAction={
          <IconButton aria-label="Add" size="sm" variant="plain" color="neutral">
            <Add />
          </IconButton>
        }
      >
        <ListItemButton>Item 1</ListItemButton>
      </ListItem>
      <ListItem
        endAction={
          <IconButton aria-label="Delete" size="sm" color="danger">
            <Delete />
          </IconButton>
        }
      >
        <ListItemButton>Item 2</ListItemButton>
      </ListItem>
    </List>
  );
}
