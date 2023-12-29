import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

export default function DividerVariants() {
  return (
    <List
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}
    >
      <ListItem>
        <ListItemText primary="Photos" secondary="Full width variant below" />
      </ListItem>
      <Divider variant="fullWidth" component="li" />
      <ListItem>
        <ListItemText primary="Work" secondary="Middle variant below" />
      </ListItem>
      <Divider variant="middle" component="li" />
      <ListItem>
        <ListItemText primary="Vacation" secondary="Inset variant below" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemText primary="Websites" />
      </ListItem>
    </List>
  );
}
