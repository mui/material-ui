/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';

const styles = {
  root: {
    width: 500,
  },
};

class PositionedTooltips extends React.Component {
  state = {
    placement: 'bottom',
  };

  handlePlacementChange = (event, placement) => {
    this.setState({ placement });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container justify="center">
          <Grid item>
            <Tooltip className={classes.fab} label="Add" placement="top-start">
              <Button>top-start</Button>
            </Tooltip>
            <Tooltip className={classes.fab} label="Add" placement="top">
              <Button>top</Button>
            </Tooltip>
            <Tooltip className={classes.fab} label="Add" placement="top-end">
              <Button>top-end</Button>
            </Tooltip>
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid item xs={6}>
            <Tooltip className={classes.fab} label="Add" placement="left-start">
              <Button>left-start</Button>
            </Tooltip>
            <br />
            <Tooltip className={classes.fab} label="Add" placement="left">
              <Button>left</Button>
            </Tooltip>
            <br />
            <Tooltip className={classes.fab} label="Add" placement="left-end">
              <Button>left-end</Button>
            </Tooltip>
          </Grid>
          <Grid item container xs={6} align="flex-end" direction="column" spacing={0}>
            <Grid item>
              <Tooltip className={classes.fab} label="Add" placement="right-start">
                <Button>right-start</Button>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip className={classes.fab} label="Add" placement="right">
                <Button>right</Button>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip className={classes.fab} label="Add" placement="right-end">
                <Button>right-end</Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid item>
            <Tooltip className={classes.fab} label="Add" placement="bottom-start">
              <Button>bottom-start</Button>
            </Tooltip>
            <Tooltip className={classes.fab} label="Add" placement="bottom">
              <Button>bottom</Button>
            </Tooltip>
            <Tooltip className={classes.fab} label="Add" placement="bottom-end">
              <Button>bottom-end</Button>
            </Tooltip>
          </Grid>
        </Grid>
      </div>
    );
  }
}

PositionedTooltips.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PositionedTooltips);
