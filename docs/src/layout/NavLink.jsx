import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, withStyles } from 'material-ui';
import { NavLink } from 'react-router-dom';

const Link = ({ children, classes, ...props }) => (
  <ListItem
    button
    component={NavLink}
    className={classes.navLink}
    activeClassName={classes.selected}
    {...props}
  >
    {children}
  </ListItem>
);

Link.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object,
};

Link.defaultProps = {
  classes: {},
};

const styles = theme => ({
  navLink: {
    ...theme.typography.body1,
    paddingTop: 8,
    paddingBottom: 8,
  },
  selected: {
    color: theme.palette.primary.main,
    fontWeight: 500,
  },
});

export default withStyles(styles)(Link);
