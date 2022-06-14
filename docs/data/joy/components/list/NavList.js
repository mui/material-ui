import * as React from 'react';
import List from '@mui/joy/List';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import Sheet from '@mui/joy/Sheet';
import Videocam from '@mui/icons-material/Videocam';
import Image from '@mui/icons-material/Image';

export default function NavList() {
  return (
    <Sheet variant="outlined" sx={{ borderRadius: 'sm', width: 240 }}>
      <List component="nav">
        <ListItemButton>
          <ListItemDecorator>
            <Image />
          </ListItemDecorator>
          Add another image
        </ListItemButton>
        <ListItemButton>
          <ListItemDecorator>
            <Videocam />
          </ListItemDecorator>
          Add another video
        </ListItemButton>
      </List>
    </Sheet>
  );
}
