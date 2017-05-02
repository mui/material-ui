// @flow weak

import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import StarIcon from 'material-ui-icons/Star';

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
          <StarIcon />
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
  styleManager: customPropTypes.muiRequired,
};

export default InsetList;
