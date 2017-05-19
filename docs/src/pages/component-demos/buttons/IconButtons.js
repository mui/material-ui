// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import AddShoppingCartIcon from 'material-ui-icons/AddShoppingCart';

const styleSheet = createStyleSheet('IconButtons', (theme) => ({
  button: {
    margin: theme.spacing.unit,
  },
}));

function IconButtons(props) {
  const classes = props.classes;
  return (
    <div>
      <IconButton className={classes.button}>
        <DeleteIcon />
      </IconButton>
      <IconButton className={classes.button} disabled>
        <DeleteIcon />
      </IconButton>
      <IconButton accent className={classes.button}>
        <Icon>alarm</Icon>
      </IconButton>
      <IconButton contrast className={classes.button}>
        <AddShoppingCartIcon />
      </IconButton>
    </div>
  );
}

IconButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(IconButtons);
