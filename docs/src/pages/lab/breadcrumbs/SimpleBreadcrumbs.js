import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Breadcrumb from '@material-ui/lab/Breadcrumb';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit,
  },
});

function handleClick() {
  alert('You clicked a Breadcrumb.'); // eslint-disable-line no-alert
}

function SimpleBreadcrumbs(props) {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <Breadcrumbs>
        <Breadcrumb label="Material-UI" onClick={handleClick} />
        <Breadcrumb label="Component Demos" onClick={handleClick} />
        <Breadcrumb label="Breadcrumb" active />
      </Breadcrumbs>
    </Paper>
  );
}

SimpleBreadcrumbs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleBreadcrumbs);
