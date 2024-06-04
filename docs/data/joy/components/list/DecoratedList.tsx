import * as React from 'react';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';

export default function DecoratedList() {
  return (
    <div>
      <Typography
        id="decorated-list-demo"
        level="body-xs"
        sx={{ textTransform: 'uppercase', fontWeight: 'lg', mb: 1 }}
      >
        Ingredients
      </Typography>
      <List aria-labelledby="decorated-list-demo">
        <ListItem>
          <ListItemDecorator>🧅</ListItemDecorator> 1 red onion
        </ListItem>
        <ListItem>
          <ListItemDecorator>🍤</ListItemDecorator> 2 Shrimps
        </ListItem>
        <ListItem>
          <ListItemDecorator>🥓</ListItemDecorator> 120g bacon
        </ListItem>
      </List>
    </div>
  );
}
