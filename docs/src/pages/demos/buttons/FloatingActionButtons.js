// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import ModeEditIcon from 'material-ui-icons/ModeEdit';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

function FloatingActionButtons(props) {
  const classes = props.classes;
  return (
    <div>
      <Button fab color="primary" aria-label="add" className={classes.button}>
        <AddIcon />
      </Button>
      <Button fab color="accent" aria-label="edit" className={classes.button}>
        <ModeEditIcon />
      </Button>
    </div>
  );
}

FloatingActionButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FloatingActionButtons);
