import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import FAB from '@material-ui/core/FAB';
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
      <Tooltip title="Delete">
        <IconButton aria-label="Delete">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Add">
        <FAB color="primary" className={classes.fab}>
          <AddIcon />
        </FAB>
      </Tooltip>
      <Tooltip title="Add">
        <FAB color="secondary" className={classes.absolute}>
          <AddIcon />
        </FAB>
      </Tooltip>
    </div>
  );
}

SimpleTooltips.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTooltips);
