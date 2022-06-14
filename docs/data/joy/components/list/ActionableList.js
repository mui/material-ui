import * as React from 'react';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import Sheet from '@mui/joy/Sheet';
import OpenInNew from '@mui/icons-material/OpenInNew';
import Info from '@mui/icons-material/Info';

export default function ActionableList() {
  return (
    <Sheet variant="outlined" sx={{ width: 240, borderRadius: 'sm' }}>
      <List>
        <ListItem>
          <ListItemButton onClick={() => alert('You clicked')}>
            <ListItemDecorator>
              <Info />
            </ListItemDecorator>
            Clickable item
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton component="a" href="#actionable" target="_blank">
            <ListItemDecorator>
              <OpenInNew />
            </ListItemDecorator>
            Open a new tab
          </ListItemButton>
        </ListItem>
      </List>
    </Sheet>
  );
}
