// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from 'material-ui/List';
import Divider from 'material-ui/Divider';

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
            <span className="material-icons">inbox</span>
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <span className="material-icons">drafts</span>
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
  styleManager: PropTypes.object.isRequired,
};

export default SimpleList;
