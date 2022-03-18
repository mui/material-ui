import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function CheckboxList() {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem
        secondaryAction={
          <IconButton key="delete" aria-label="delete" edge="end">
            <DeleteIcon />
          </IconButton>
        }
        disablePadding
      >
        <ListItemButton role={undefined} dense>
          <ListItemText primary={`Item with a single action`} />
        </ListItemButton>
      </ListItem>
      <ListItem
        secondaryAction={[
          <IconButton key="edit" aria-label="edit">
            <EditIcon />
          </IconButton>,
          <IconButton key="delete" aria-label="delete" edge="end">
            <DeleteIcon />
          </IconButton>,
        ]}
        disablePadding
      >
        <ListItemButton role={undefined} dense>
          <ListItemText primary={`Items with a very long text will not overlapp`} />
        </ListItemButton>
      </ListItem>
    </List>
  );
}
