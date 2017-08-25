/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button';
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Tooltip from 'material-ui/Tooltip';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit * 2,
  },
  absolute: {
    position: 'absolute',
    bottom: 32,
    right: 32,
  },
});

class SimpleTooltips extends React.Component {
  state = {
    placement: 'bottom',
  };

  handlePlacementChange = (event, placement) => {
    this.setState({ placement });
  };

  render() {
    const classes = this.props.classes;
    return (
      <div>
        <Tooltip id="tooltip-icon" title="Delete" placement="bottom">
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip id="tooltip-fab" className={classes.fab} title="Add" placement="bottom">
          <Button fab color="primary" aria-label="Add">
            <AddIcon />
          </Button>
        </Tooltip>
        <br />
        <br />
        <Typography>{'The fab on the right is absolutly positionned:'}</Typography>
        <Tooltip placement="bottom" title="Position absolute">
          <Button fab color="accent" className={this.props.classes.absolute}>
            <AddIcon />
          </Button>
        </Tooltip>
      </div>
    );
  }
}

SimpleTooltips.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTooltips);
