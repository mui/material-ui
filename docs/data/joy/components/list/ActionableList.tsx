import * as React from 'react';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import OpenInNew from '@mui/icons-material/OpenInNew';
import Info from '@mui/icons-material/Info';

export default function ActionableList() {
  return (
    <List sx={{ maxWidth: 320 }}>
      <ListItem>
        <ListItemButton onClick={() => alert('You clicked')}>
          <ListItemDecorator>
            <Info />
          </ListItemDecorator>
          Clickable item
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton component="a" href="#actionable">
          <ListItemDecorator>
            <OpenInNew />
          </ListItemDecorator>
          Open a new tab
        </ListItemButton>
      </ListItem>
    </List>
  );
}
