// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import {
  List,
  ListItem,
  ListItemText,
} from 'material-ui/List';
import Divider from 'material-ui/Divider';

const styleSheet = createStyleSheet('ListDividers', (theme) => ({
  root: {
    width: '100%',
    maxWidth: '360px',
    background: theme.palette.background.paper,
  },
}));

export default function ListDividers(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <List className={classes.root}>
      <ListItem button>
        <ListItemText primary="Inbox" />
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemText primary="Drafts" />
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemText primary="Trash" />
      </ListItem>
    </List>
  );
}

ListDividers.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
