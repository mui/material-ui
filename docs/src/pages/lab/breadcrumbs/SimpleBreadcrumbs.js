import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Breadcrumb from '@material-ui/lab/Breadcrumb';
import Link from '@material-ui/core/Link';

const styles = theme => ({
  root: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
});

function handleClick(event) {
  event.preventDefault();
  alert('You clicked a breadcrumb.'); // eslint-disable-line no-alert
}

function SimpleBreadcrumbs(props) {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <Breadcrumbs arial-label="Breadcrumb navigation">
        <Breadcrumb>
          <Link color="inherit" href="/" onClick={handleClick}>
            Material-UI
          </Link>
        </Breadcrumb>
        <Breadcrumb>
          <Link color="inherit" href="/lab/about/" onClick={handleClick}>
            Lab
          </Link>
        </Breadcrumb>
        <Breadcrumb color="textPrimary">Breadcrumb</Breadcrumb>
      </Breadcrumbs>
    </Paper>
  );
}

SimpleBreadcrumbs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleBreadcrumbs);
