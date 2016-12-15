// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import createHelper from 'recompose/createHelper';
import classNames from 'classnames';

export const styleSheet = createStyleSheet('FormGroup', () => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    row: {
      flexDirection: 'row',
    },
  };
});

const formGroup = (BaseComponent) => {
  function FormGroup(props, context) {
    const { className, row, ...other } = props;
    const classes = context.styleManager.render(styleSheet);
    const rootClassName = classNames(classes.root, {
      [classes.row]: row,
    }, className);

    return (
      <BaseComponent className={rootClassName} {...other} />
    );
  }

  FormGroup.propTypes = {
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * Display group of elements in a compact row.
     */
    row: PropTypes.bool,
  };

  FormGroup.defaultProps = {
    row: false,
  };

  FormGroup.contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  return FormGroup;
};

const createFormGroup = createHelper(formGroup, 'formGroup', true, true);

export { createFormGroup };

/**
 * FormGroup wraps controls such as Checkbox and Switch.  It provides compact row layout and FormLabel
 * awareness.  Upon focusing on one of the child controls, it will propagate `focused` to the label.
 */
export default createFormGroup('div');
