import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Theme, WithStyles, createStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const styles = (theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(2),
    },
    absolute: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(3),
    },
  });

function SimpleTooltips(props: WithStyles<typeof styles>) {
  const { classes } = props;
  return (
    <div>
      <Tooltip title="Delete">
        <IconButton aria-label="Delete">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Add" aria-label="Add">
        <Fab color="primary" className={classes.fab}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="Add" aria-label="Add">
        <Fab color="secondary" className={classes.absolute}>
          <AddIcon />
        </Fab>
      </Tooltip>
    </div>
  );
}

SimpleTooltips.propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(SimpleTooltips);
