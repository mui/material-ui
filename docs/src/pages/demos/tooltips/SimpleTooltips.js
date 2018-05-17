import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit * 2,
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
});

function SimpleTooltips(props) {
  const { classes } = props;
  return (
    <div>
      <Tooltip id="tooltip-icon" title="Delete">
        <IconButton aria-label="Delete">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Tooltip id="tooltip-fab" title="Add">
        <Button variant="fab" color="primary" aria-label="Add" className={classes.fab}>
          <AddIcon />
        </Button>
      </Tooltip>
      <br />
      <br />
      <Tooltip title="FAB 'position: absolute;'">
        <Button variant="fab" color="secondary" className={classes.absolute}>
          <AddIcon />
        </Button>
      </Tooltip>
    </div>
  );
}

SimpleTooltips.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTooltips);
