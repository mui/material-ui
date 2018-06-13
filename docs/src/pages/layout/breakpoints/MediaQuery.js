import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit,
    [theme.breakpoints.down('sm')]: {
      backgroundColor: theme.palette.secondary.main,
    },
    [theme.breakpoints.up('md')]: {
      backgroundColor: theme.palette.primary.main,
    },
    [theme.breakpoints.up('lg')]: {
      backgroundColor: green[500],
    },
  },
});

function MediaQuery(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Typography variant="subheading">{'down(sm): red'}</Typography>
      <Typography variant="subheading">{'up(md): blue'}</Typography>
      <Typography variant="subheading">{'up(lg): green'}</Typography>
    </div>
  );
}

MediaQuery.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaQuery);
