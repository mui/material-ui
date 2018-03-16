import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, withStyles, ListSubheader } from 'material-ui';
import { withRouter, Link } from 'react-router-dom';

const NavigationMenu = ({ classes }) => (
  <List component="nav">
    <ListSubheader component="div"> Getting Started  </ListSubheader>
    <Link to="/installation" className={classes.navLink}>
      <ListItem button> Installation </ListItem>
    </Link>
    <Link to="/usage" className={classes.navLink}>
      <ListItem button> Usage </ListItem>
    </Link>

    <ListSubheader component="div"> Localization </ListSubheader>
    <Link to="/localization/date-fns" className={classes.navLink}>
      <ListItem button> Using date-fns </ListItem>
    </Link>

    <Link to="/localization/moment" className={classes.navLink}>
      <ListItem button> Using moment </ListItem>
    </Link>

    <ListSubheader component="div"> Components </ListSubheader>
    <Link to="/demo/datepicker" className={classes.navLink}>
      <ListItem button> Date Picker </ListItem>
    </Link>

    <Link to="/demo/timepicker" className={classes.navLink}>
      <ListItem button> Time Picker </ListItem>
    </Link>

    <Link to="/demo/datetimepicker" className={classes.navLink}>
      <ListItem button> Date & Time Picker </ListItem>
    </Link>
  </List>
);

NavigationMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  navLink: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    ...theme.typography.subheading,
    fontSize: '0.9rem',

    '&>*': {
      paddingTop: 8,
      paddingBottom: 8,
    },
  },
});

export default withStyles(styles)(withRouter(NavigationMenu));

