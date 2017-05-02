// @flow weak

import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import InboxIcon from 'material-ui-icons/Inbox';
import DraftsIcon from 'material-ui-icons/Drafts';

const styleSheet = createStyleSheet('SimpleList', (theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
}));

function SimpleList(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div className={classes.root}>
      <List>
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemText primary="Trash" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Spam" />
        </ListItem>
      </List>
    </div>
  );
}

SimpleList.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

export default SimpleList;
