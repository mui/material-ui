import * as React from 'react';
import List from '@mui/joy/List';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import VideoCam from '@mui/icons-material/VideoCam';
import Image from '@mui/icons-material/Image';

export default function ActionableList() {
  return (
    <List component="nav" sx={{ bgcolor: 'background.surface', maxWidth: 240 }}>
      <ListItemButton>
        <ListItemDecorator>
          <Image />
        </ListItemDecorator>
        Add another image
      </ListItemButton>
      <ListItemButton>
        <ListItemDecorator>
          <VideoCam />
        </ListItemDecorator>
        Add another video
      </ListItemButton>
    </List>
  );
}
