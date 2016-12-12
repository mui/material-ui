// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import {
  List,
  ListItem,
  ListItemText,
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';

const styleSheet = createStyleSheet('InsetDividers', (theme) => ({
  root: {
    width: '100%',
    maxWidth: '360px',
    background: theme.palette.background.paper,
  },
}));

export default function FlatButtons(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <List className={classes.root}>
      <ListItem button>
        <Avatar icon={<span className="material-icons">folder</span>} />
        <ListItemText primary="Work" secondary="Jan 28, 2014" />
      </ListItem>
      <Divider inset />
      <ListItem button>
        <Avatar icon={<span className="material-icons">image</span>} />
        <ListItemText primary="Vacation" secondary="Jan 20, 2014" />
      </ListItem>
    </List>
  );
}

FlatButtons.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
