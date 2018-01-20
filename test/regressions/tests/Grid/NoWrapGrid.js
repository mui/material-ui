// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';

const styles = {
  root: {
    width: 400,
  },
  paper: {
    padding: 16,
  },
};

function NoWrapGrid(props) {
  const { classes } = props;
  const message = `Truncation should be conditionally applicable on this long line of text 
                    as this is a much longer line than what the container can support. `;
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap">
          <Grid item>
            <Avatar>W</Avatar>
          </Grid>
          <Grid item xs noAutoMinWidth>
            <Typography type="body1" noWrap>
              {message}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper className={classes.paper}>
        <Grid container wrap="nowrap">
          <Grid item>
            <Avatar>W</Avatar>
          </Grid>
          <Grid item xs>
            <Typography type="body1">{message}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

NoWrapGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NoWrapGrid);
