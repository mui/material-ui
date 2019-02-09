import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import GrainIcon from '@material-ui/icons/Grain';

const styles = theme => ({
  root: {
    padding: theme.spacing(1, 2),
  },
  link: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(0.5),
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
      <Breadcrumbs arial-label="Breadcrumb">
        <Link color="inherit" href="/" onClick={handleClick} className={classes.link}>
          <HomeIcon className={classes.icon} />
          Material-UI
        </Link>
        <Link
          color="inherit"
          href="/getting-started/installation/"
          onClick={handleClick}
          className={classes.link}
        >
          <WhatshotIcon className={classes.icon} />
          Core
        </Link>
        <Typography color="textPrimary" className={classes.link}>
          <GrainIcon className={classes.icon} />
          Breadcrumb
        </Typography>
      </Breadcrumbs>
    </Paper>
  );
}

IconBreadcrumbs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconBreadcrumbs);
