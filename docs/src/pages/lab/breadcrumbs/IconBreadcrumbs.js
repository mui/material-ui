import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Breadcrumb from '@material-ui/lab/Breadcrumb';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupIcon from '@material-ui/icons/Group';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit,
  },
});

function handleClick() {
  alert('You clicked a Breadcrumb.'); // eslint-disable-line no-alert
}

function IconBreadcrumbs(props) {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <Breadcrumbs>
        <Breadcrumb label="Home" icon={<HomeIcon />} onClick={handleClick} />
        <Breadcrumb label="Settings" icon={<SettingsIcon />} onClick={handleClick} />
        <Breadcrumb label="Users" icon={<GroupIcon />} active />
      </Breadcrumbs>
    </Paper>
  );
}

IconBreadcrumbs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconBreadcrumbs);
