// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from 'material-ui/List';

const styleSheet = createStyleSheet('InsetList', (theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
}));

function InsetList(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <List className={classes.root}>
      <ListItem button>
        <ListItemIcon>
          <span className="material-icons">star</span>
        </ListItemIcon>
        <ListItemText inset primary="Chelsea Otakan" />
      </ListItem>
      <ListItem button>
        <ListItemText inset primary="Eric Hoffman" />
      </ListItem>
    </List>
  );
}

InsetList.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};

export default InsetList;
