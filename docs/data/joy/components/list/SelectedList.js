import * as React from 'react';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import Home from '@mui/icons-material/Home';
import Apps from '@mui/icons-material/Apps';

export default function SelectedList() {
  return (
    <List
      sx={{
        bgcolor: 'background.body',
        borderRadius: 'sm',
        border: '1px solid',
        borderColor: 'neutral.outlinedBorder',
        overflow: 'auto',
        maxWidth: 240,
      }}
    >
      <ListItem>
        <ListItemButton selected>
          <ListItemDecorator>
            <Home />
          </ListItemDecorator>
          Home
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>
          <ListItemDecorator>
            <Apps />
          </ListItemDecorator>
          Apps
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>
          <ListItemDecorator />
          Settings
        </ListItemButton>
      </ListItem>
    </List>
  );
}
