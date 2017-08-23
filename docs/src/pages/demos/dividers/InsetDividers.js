import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import FolderIcon from 'material-ui-icons/Folder';
import ImageIcon from 'material-ui-icons/Image';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '360px',
    background: theme.palette.background.paper,
  },
});

function InsetDividers(props) {
  const classes = props.classes;
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

InsetDividers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InsetDividers);
