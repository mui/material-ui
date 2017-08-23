import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import AddShoppingCartIcon from 'material-ui-icons/AddShoppingCart';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

function IconButtons(props) {
  const classes = props.classes;
  return (
    <div>
      <IconButton className={classes.button} aria-label="Delete">
        <DeleteIcon />
      </IconButton>
      <IconButton className={classes.button} aria-label="Delete" disabled>
        <DeleteIcon />
      </IconButton>
      <IconButton color="accent" className={classes.button} aria-label="Add an alarm">
        <Icon>alarm</Icon>
      </IconButton>
      <IconButton color="contrast" className={classes.button} aria-label="Add to shopping cart">
        <AddShoppingCartIcon />
      </IconButton>
      <IconButton color="primary" className={classes.button} aria-label="Add to shopping cart">
        <AddShoppingCartIcon />
      </IconButton>
    </div>
  );
}

IconButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconButtons);
