import * as React from 'react';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import MenuList from '@mui/joy/MenuList';
import MenuItem from '@mui/joy/MenuItem';
import Typography from '@mui/joy/Typography';

export default function MenuListGroup() {
  return (
    <MenuList
      component="div"
      variant="outlined"
      size="sm"
      sx={{
        boxShadow: 'sm',
        flexGrow: 0,
        minWidth: 200,
        maxHeight: 240,
        overflow: 'auto',
      }}
    >
      {[...Array(5)].map((_, categoryIndex) => (
        <List key={categoryIndex}>
          <ListItem sticky>
            <Typography
              id={`sticky-list-demo-${categoryIndex}`}
              level="body-xs"
              sx={{ textTransform: 'uppercase', fontWeight: 'lg' }}
            >
              Category {categoryIndex + 1}
            </Typography>
          </ListItem>
          {[...Array(10)].map((__, index) => (
            <MenuItem key={index}>Action {index + 1}</MenuItem>
          ))}
        </List>
      ))}
    </MenuList>
  );
}
