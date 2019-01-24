/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Breadcrumb from '@material-ui/lab/Breadcrumb';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupIcon from '@material-ui/icons/Group';

const styles = theme => ({
  root: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing.unit / 2,
    width: 20,
    height: 20,
  },
});

function handleClick() {
  alert('You clicked a Breadcrumb.'); // eslint-disable-line no-alert
}

function IconBreadcrumbs(props) {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <Breadcrumbs arial-label="Breadcrumb navigation">
        <Breadcrumb>
          <Link color="inherit" href="#" onClick={handleClick} className={classes.link}>
            <HomeIcon className={classes.icon} />
            Home
          </Link>
        </Breadcrumb>
        <Breadcrumb>
          <Link color="inherit" href="#" onClick={handleClick} className={classes.link}>
            <SettingsIcon className={classes.icon} />
            Settings
          </Link>
        </Breadcrumb>
        <Breadcrumb>
          <Link color="inherit" href="#" className={classes.link}>
            <GroupIcon className={classes.icon} />
            Users
          </Link>
        </Breadcrumb>
      </Breadcrumbs>
    </Paper>
  );
}

IconBreadcrumbs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconBreadcrumbs);
