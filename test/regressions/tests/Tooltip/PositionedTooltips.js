import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';

const styles = {
  root: {
    width: 400,
    height: 400,
    padding: 60,
  },
};

// Used /docs/src/pages/demos/tooltips/PositionedTooltips.js as inspiration.
function PositionedTooltips(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid item>
          <Tooltip open className={classes.fab} title="Add" placement="top-start">
            <Button>top-start</Button>
          </Tooltip>
          <Tooltip open className={classes.fab} title="Add" placement="top">
            <Button>top</Button>
          </Tooltip>
          <Tooltip open className={classes.fab} title="Add" placement="top-end">
            <Button>top-end</Button>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item xs={6}>
          <Tooltip open className={classes.fab} title="Add" placement="left-start">
            <Button>left-start</Button>
          </Tooltip>
          <br />
          <Tooltip open className={classes.fab} title="Add" placement="left">
            <Button>left</Button>
          </Tooltip>
          <br />
          <Tooltip open className={classes.fab} title="Add" placement="left-end">
            <Button>left-end</Button>
          </Tooltip>
        </Grid>
        <Grid item container xs={6} alignItems="flex-end" direction="column" spacing={0}>
          <Grid item>
            <Tooltip open className={classes.fab} title="Add" placement="right-start">
              <Button>right-start</Button>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip open className={classes.fab} title="Add" placement="right">
              <Button>right</Button>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip open className={classes.fab} title="Add" placement="right-end">
              <Button>right-end</Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item>
          <Tooltip open className={classes.fab} title="Add" placement="bottom-start">
            <Button>bottom-start</Button>
          </Tooltip>
          <Tooltip open className={classes.fab} title="Add" placement="bottom">
            <Button>bottom</Button>
          </Tooltip>
          <Tooltip open className={classes.fab} title="Add" placement="bottom-end">
            <Button>bottom-end</Button>
          </Tooltip>
        </Grid>
      </Grid>
    </div>
  );
}

PositionedTooltips.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PositionedTooltips);
