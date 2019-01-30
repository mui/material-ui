import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Breadcrumb from '@material-ui/lab/Breadcrumb';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import GrainIcon from '@material-ui/icons/Grain';

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

function handleClick(event) {
  event.preventDefault();
  alert('You clicked a breadcrumb.'); // eslint-disable-line no-alert
}

function IconBreadcrumbs(props) {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <Breadcrumbs arial-label="Breadcrumb navigation">
        <Breadcrumb>
          <Link color="inherit" href="/" onClick={handleClick} className={classes.link}>
            <HomeIcon className={classes.icon} />
            Material-UI
          </Link>
        </Breadcrumb>
        <Breadcrumb>
          <Link color="inherit" href="/lab/about/" onClick={handleClick} className={classes.link}>
            <WhatshotIcon className={classes.icon} />
            Lab
          </Link>
        </Breadcrumb>
        <Breadcrumb color="textPrimary" className={classes.link}>
          <GrainIcon className={classes.icon} />
          Breadcrumb
        </Breadcrumb>
      </Breadcrumbs>
    </Paper>
  );
}

IconBreadcrumbs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconBreadcrumbs);
