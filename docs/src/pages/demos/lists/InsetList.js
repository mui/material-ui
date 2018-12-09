import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

function InsetList(props) {
  const { classes } = props;
  return (
    <List component="nav" className={classes.root}>
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

InsetList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InsetList);
