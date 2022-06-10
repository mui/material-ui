import * as React from 'react';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';

export default function StickyList() {
  return (
    <List sx={{ maxWidth: 200, bgcolor: 'background.surface' }}>
      <ListItem nested>
        <ListItem component="div">
          <Typography
            id="nested-list-demo-1"
            level="body3"
            textTransform="uppercase"
            fontWeight="lg"
          >
            Category 1
          </Typography>
        </ListItem>
        <List aria-labelledby="nested-list-demo-1">
          <ListItem>Subitem 1</ListItem>
          <ListItem>Subitem 2</ListItem>
        </List>
      </ListItem>
      <ListItem nested>
        <ListItem component="div">
          <Typography
            id="nested-list-demo-2"
            level="body3"
            textTransform="uppercase"
            fontWeight="lg"
          >
            Category 2
          </Typography>
        </ListItem>
        <List aria-labelledby="nested-list-demo-2">
          <ListItem>Subitem 1</ListItem>
          <ListItem>Subitem 2</ListItem>
        </List>
      </ListItem>
    </List>
  );
}
