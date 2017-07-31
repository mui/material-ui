// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styleSheet = createStyleSheet({
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
});

function OverridesClasses(props) {
  return (
    <Button
      classes={{
        root: props.classes.root, // className, e.g. `OverridesClasses-root-X`
        label: props.classes.label, // className, e.g. `OverridesClasses-label-X`
      }}
    >
      {props.children ? props.children : 'classes'}
    </Button>
  );
}

OverridesClasses.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(OverridesClasses);
