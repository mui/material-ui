import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function SelectedListItem() {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  function handleListItemClick(event, index) {
    setSelectedIndex(index);
  }

  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem
          button
          selected={selectedIndex === 0}
          onClick={event => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 1}
          onClick={event => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItem>
      </List>
      <Divider />
      <List component="nav">
        <ListItem
          button
          selected={selectedIndex === 2}
          onClick={event => handleListItemClick(event, 2)}
        >
          <ListItemText primary="Trash" />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 3}
          onClick={event => handleListItemClick(event, 3)}
        >
          <ListItemText primary="Spam" />
        </ListItem>
      </List>
    </div>
  );
}

export default SelectedListItem;
