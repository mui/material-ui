import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

interface SimpleBreadcrumbsProps extends WithStyles<typeof styles> {}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    paper: {
      padding: theme.spacing(1, 2),
    },
  });

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
  alert('You clicked a breadcrumb.'); // eslint-disable-line no-alert
}

function SimpleBreadcrumbs(props: SimpleBreadcrumbsProps) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        <Breadcrumbs aria-label="Breadcrumb">
          <Link color="inherit" href="/" onClick={handleClick}>
            Material-UI
          </Link>
          <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
            Core
          </Link>
          <Typography color="textPrimary">Breadcrumb</Typography>
        </Breadcrumbs>
      </Paper>
      <br />
      <Paper elevation={0} className={classes.paper}>
        <Breadcrumbs aria-label="Breadcrumb">
          <Link color="inherit" href="/" onClick={handleClick}>
            Material-UI
          </Link>
          <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
            Core
          </Link>
          <Link
            color="textPrimary"
            href="/demos/breadcrumbs/"
            onClick={handleClick}
            aria-current="page"
          >
            Breadcrumb
          </Link>
        </Breadcrumbs>
      </Paper>
    </div>
  );
}

SimpleBreadcrumbs.propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(SimpleBreadcrumbs);
