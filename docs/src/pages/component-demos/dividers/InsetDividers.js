// @flow weak

import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import FolderIcon from 'material-ui-icons/Folder';
import ImageIcon from 'material-ui-icons/Image';

const styleSheet = createStyleSheet('InsetDividers', (theme) => ({
  root: {
    width: '100%',
    maxWidth: '360px',
    background: theme.palette.background.paper,
  },
}));

export default function InsetDividers(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <List className={classes.root}>
      <ListItem button>
        <Avatar>
          <FolderIcon />
        </Avatar>
        <ListItemText primary="Work" secondary="Jan 28, 2014" />
      </ListItem>
      <Divider inset />
      <ListItem button>
        <Avatar>
          <ImageIcon />
        </Avatar>
        <ListItemText primary="Vacation" secondary="Jan 20, 2014" />
      </ListItem>
    </List>
  );
}

InsetDividers.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
