import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function AutoGridNoWrap(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24} wrap="nowrap">
        <Grid item>
          <Paper className={classes.paper}>Fixed Column</Paper>
        </Grid>
        <Grid item xs noAutoMinWidth>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
      </Grid>
      <Grid container spacing={24} wrap="nowrap">
        <Grid item>
          <Paper className={classes.paper}>left</Paper>
        </Grid>
        <Grid item xs noAutoMinWidth>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.paper}>right</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

AutoGridNoWrap.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AutoGridNoWrap);
