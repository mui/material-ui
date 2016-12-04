// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
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

/**
 * FormGroup wraps controls such as Checkbox and Switch.  It provides compact row layout and FormLabel
 * awareness.  Upon focusing on one of the child controls, it will propagate `focused` to the label.
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
