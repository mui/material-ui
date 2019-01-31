import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Breadcrumb from '@material-ui/lab/Breadcrumb';
import Link from '@material-ui/core/Link';

const styles = theme => ({
  root: {
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  paper: {
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
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Breadcrumbs arial-label="Breadcrumb">
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
      <br />
      <Paper className={classes.paper}>
        <Breadcrumbs arial-label="Breadcrumb">
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
          <Breadcrumb color="textPrimary">
            <Link
              color="inherit"
              href="/lab/about/breadcrumbs"
              onClick={handleClick}
              aria-current="page"
            >
              Breadcrumb
            </Link>
          </Breadcrumb>
        </Breadcrumbs>
      </Paper>
    </div>
  );
}

SimpleBreadcrumbs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleBreadcrumbs);
