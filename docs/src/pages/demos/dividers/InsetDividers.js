import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

function InsetDividers(props) {
  const { classes } = props;
  return (
    <List className={classes.root}>
      <ListItem>
        <Avatar>
          <ImageIcon />
        </Avatar>
        <ListItemText primary="Photos" secondary="Jan 9, 2014" />
      </ListItem>
      <li>
        <Divider variant="inset" />
      </li>
      <ListItem>
        <Avatar>
          <WorkIcon />
        </Avatar>
        <ListItemText primary="Work" secondary="Jan 7, 2014" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <Avatar>
          <BeachAccessIcon />
        </Avatar>
        <ListItemText primary="Vacation" secondary="July 20, 2014" />
      </ListItem>
    </List>
  );
}

InsetDividers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InsetDividers);
