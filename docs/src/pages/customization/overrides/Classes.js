import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = {
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
  },
  label: {
    textTransform: 'capitalize',
  },
};

function Classes(props) {
  return (
    <Button
      classes={{
        root: props.classes.root, // class name, e.g. `classes-root-x`
        label: props.classes.label, // class name, e.g. `classes-label-x`
      }}
    >
      {props.children ? props.children : 'classes'}
    </Button>
  );
}

Classes.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Classes);
