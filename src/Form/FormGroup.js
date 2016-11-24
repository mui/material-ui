// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';

export const styleSheet = createStyleSheet('FormGroup', () => {
  return {
    root: {
      display: 'flex',
    },
    row: {
      flexDirection: 'row',
    },
  };
});

/**
 * Primary purpose of the FormGroup is to display form elements in a compact row layout to conform with
 *  the spec goal of preserving space.
 *
 *  @see https://material.google.com/components/selection-controls.html#selection-controls-checkbox
 */
export default function FormGroup(props, context) {
  const { className, children, row } = props;
  const classes = context.styleManager.render(styleSheet);
  const rootClassName = classNames(classes.root, {
    [classes.row]: row,
  }, className);

  return (
    <div className={rootClassName}>
      {children}
    </div>
  );
}

FormGroup.propTypes = {
  children: PropTypes.node,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  row: PropTypes.bool,
};

FormGroup.defaultProps = {
  row: true,
};

FormGroup.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
