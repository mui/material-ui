import * as React from 'react';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';

export default function BasicList() {
  return (
    <div>
      <Typography
        id="basic-list-demo"
        level="body-xs"
        sx={{ textTransform: 'uppercase', fontWeight: 'lg' }}
      >
        Ingredients
      </Typography>
      <List aria-labelledby="basic-list-demo">
        <ListItem>1 red onion</ListItem>
        <ListItem>2 red peppers</ListItem>
        <ListItem>120g bacon</ListItem>
      </List>
    </div>
  );
}
