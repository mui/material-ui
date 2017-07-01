// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FolderIcon from 'material-ui-icons/Folder';

const styleSheet = createStyleSheet('FolderList', theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
}));

function FolderList(props) {
  const classes = props.classes;
  return (
    <div className={classes.root}>
      <List>
        <ListItem button>
          <Avatar>
            <FolderIcon />
          </Avatar>
          <ListItemText primary="Photos" secondary="Jan 9, 2016" />
        </ListItem>
        <ListItem button>
          <Avatar>
            <FolderIcon />
          </Avatar>
          <ListItemText primary="Work" secondary="Jan 7, 2016" />
        </ListItem>
      </List>
    </div>
  );
}

FolderList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(FolderList);
