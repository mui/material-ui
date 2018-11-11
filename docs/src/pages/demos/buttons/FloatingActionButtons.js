import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FAB from '@material-ui/core/FAB';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

function FloatingActionButtons(props) {
  const { classes } = props;
  return (
    <div>
      <FAB color="primary" aria-label="Add" className={classes.fab}>
        <AddIcon />
      </FAB>
      <FAB color="secondary" aria-label="Edit" className={classes.fab}>
        <Icon>edit_icon</Icon>
      </FAB>
      <FAB variant="extended" aria-label="Delete" className={classes.fab}>
        <NavigationIcon className={classes.extendedIcon} />
        Extended
      </FAB>
      <FAB disabled aria-label="Delete" className={classes.fab}>
        <DeleteIcon />
      </FAB>
    </div>
  );
}

FloatingActionButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FloatingActionButtons);
