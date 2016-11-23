// @flow weak

import React, { PropTypes, Children } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';

export const styleSheet = createStyleSheet('CheckboxGroup', () => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'row',
    },
    label: {
      marginRight: 16,
    },
  };
});

/**
 * Primary purpose of the CheckboxGroup is to display checkboxes in a compact row layout to conform with
 *  the spec goal of preserving space.
 *
 *  @see https://material.google.com/components/selection-controls.html#selection-controls-checkbox
 */
export default function CheckboxGroup(props, context) {
  const { className, children } = props;
  const classes = context.styleManager.render(styleSheet);
  return (
    <div className={classNames(classes.root, className)}>
      {Children.map(children, (child) =>
        React.cloneElement(child, { labelClassName: classNames(classes.label, child.props.labelClassName) }),
      )}
    </div>
  );
}

CheckboxGroup.propTypes = {
  children: PropTypes.node,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
};

CheckboxGroup.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
