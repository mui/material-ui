import * as React from 'react';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItemButton from '@mui/joy/ListItemButton';
import Sheet from '@mui/joy/Sheet';

export default function StickyList() {
  return (
    <Sheet
      variant="outlined"
      sx={{ width: 320, maxHeight: 300, overflow: 'auto', borderRadius: 'sm' }}
    >
      <List>
        {[...Array(5)].map((_, categoryIndex) => (
          <ListItem nested key={categoryIndex}>
            <ListSubheader sticky>Category {categoryIndex + 1}</ListSubheader>
            <List>
              {[...Array(10)].map((__, index) => (
                <ListItem key={index}>
                  <ListItemButton>Subitem {index + 1}</ListItemButton>
                </ListItem>
              ))}
            </List>
          </ListItem>
        ))}
      </List>
    </Sheet>
  );
}
