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

function MoreBreadcrumbs(props) {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <Breadcrumbs maxItems={2}>
        <Breadcrumb label="Home" onClick={handleClick} />
        <Breadcrumb label="Catalog" onClick={handleClick} />
        <Breadcrumb label="Accessories" onClick={handleClick} />
        <Breadcrumb label="New Collection" onClick={handleClick} />
        <Breadcrumb label="Belts" active />
      </Breadcrumbs>
    </Paper>
  );
}

MoreBreadcrumbs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MoreBreadcrumbs);
