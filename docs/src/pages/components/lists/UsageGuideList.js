import * as React from 'react';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemButton from '@material-ui/core/ListItemButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

export default function UsageGuideList() {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List>
        <ListItem>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Simple text" />
          <ListItemSecondaryAction>
            <IconButton edge="end">
              <MoreVertIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem divider>
          <ListItemText
            inset
            primary="Inset primary text"
            secondary="Some description goes here."
          />
        </ListItem>
        <ListItemButton>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Button item with icon" />
          <KeyboardArrowRightIcon color="action" />
        </ListItemButton>
        <Divider variant="inset" component="li" />
        <ListItemButton>
          <ListItemText inset primary="Button + Secondary action" />
          <ListItemSecondaryAction>
            <IconButton edge="end">
              <MoreVertIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItemButton>
      </List>
    </Box>
  );
}
