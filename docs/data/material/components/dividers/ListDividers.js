import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};

export default function ListDividers() {
  return (
    <List sx={style} aria-label="mailbox folders">
      <ListItem>
        <ListItemText primary="Inbox" />
      </ListItem>
      <Divider component="li" light />
      <ListItem>
        <ListItemText primary="Drafts" />
      </ListItem>
      <Divider component="li" light />
      <ListItem>
        <ListItemText primary="Trash" />
      </ListItem>
      <Divider component="li" light />
      <ListItem>
        <ListItemText primary="Spam" />
      </ListItem>
    </List>
  );
}
