import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

const styles = {
  root: {
    width: 500,
  },
};

function PositionedTooltips(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid item>
          <Tooltip id="tooltip-top-start" title="Add" placement="top-start">
            <Button variant="text">top-start</Button>
          </Tooltip>
          <Tooltip id="tooltip-top" title="Add" placement="top">
            <Button variant="text">top</Button>
          </Tooltip>
          <Tooltip id="tooltip-top-end" title="Add" placement="top-end">
            <Button variant="text">top-end</Button>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item xs={6}>
          <Tooltip id="tooltip-left-start" title="Add" placement="left-start">
            <Button variant="text">left-start</Button>
          </Tooltip>
          <br />
          <Tooltip id="tooltip-left" title="Add" placement="left">
            <Button variant="text">left</Button>
          </Tooltip>
          <br />
          <Tooltip id="tooltip-left-end" title="Add" placement="left-end">
            <Button variant="text">left-end</Button>
          </Tooltip>
        </Grid>
        <Grid item container xs={6} alignItems="flex-end" direction="column" spacing={0}>
          <Grid item>
            <Tooltip id="tooltip-right-start" title="Add" placement="right-start">
              <Button variant="text">right-start</Button>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip id="tooltip-right" title="Add" placement="right">
              <Button variant="text">right</Button>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip id="tooltip-right-end" title="Add" placement="right-end">
              <Button variant="text">right-end</Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item>
          <Tooltip id="tooltip-bottom-start" title="Add" placement="bottom-start">
            <Button variant="text">bottom-start</Button>
          </Tooltip>
          <Tooltip id="tooltip-bottom" title="Add" placement="bottom">
            <Button variant="text">bottom</Button>
          </Tooltip>
          <Tooltip id="tooltip-bottom-end" title="Add" placement="bottom-end">
            <Button variant="text">bottom-end</Button>
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
