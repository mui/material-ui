// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';

const styleSheet = createStyleSheet('ListDividers', theme => ({
  root: {
    width: '100%',
    maxWidth: '360px',
    background: theme.palette.background.paper,
  },
}));

function ListDividers(props) {
  const classes = props.classes;
  return (
    <List className={classes.root}>
      <ListItem button>
        <ListItemText primary="Inbox" />
      </ListItem>
      <Divider light />
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

ListDividers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(ListDividers);
