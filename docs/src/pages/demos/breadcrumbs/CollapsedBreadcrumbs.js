/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const styles = theme => ({
  root: {
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  paper: {
    padding: theme.spacing(1, 2),
  },
});

function handleClick(event) {
  event.preventDefault();
  alert('You clicked a breadcrumb.'); // eslint-disable-line no-alert
}

function CollapsedBreadcrumbs(props) {
  const { classes } = props;

  return (
    <Paper className={classes.paper}>
      <Breadcrumbs maxItems={2} aria-label="Breadcrumb">
        <Link color="inherit" href="#" onClick={handleClick}>
          Home
        </Link>
        <Link color="inherit" href="#" onClick={handleClick}>
          Catalog
        </Link>
        <Link color="inherit" href="#" onClick={handleClick}>
          Accessories
        </Link>
        <Link color="inherit" href="#" onClick={handleClick}>
          New Collection
        </Link>
        <Typography color="textPrimary">Belts</Typography>
      </Breadcrumbs>
    </Paper>
  );
}

CollapsedBreadcrumbs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CollapsedBreadcrumbs);
