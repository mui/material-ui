// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';

export const styleSheet = createStyleSheet('LabelBase', (theme) => {
  const focusColor = theme.palette.accent.A200;
  return {
    root: {
      color: theme.palette.text.secondary,
      lineHeight: 1,
    },
    focused: {
      color: focusColor,
    },
    error: {
      color: theme.palette.error[500],
    },
  };
});

export default function LabelBase(props, context) {
  const {
    children,
    className: classNameProp,
    error,
    focused,
    required,
    ...other
  } = props;
  const classes = context.styleManager.render(styleSheet);

  const className = classNames(classes.root, {
    [classes.focused]: focused,
    [classes.error]: error,
  }, classNameProp);

  const asteriskClassName = classNames({
    [classes.error]: error,
  });

  return (
    <label className={className} {...other}>
      {children}
      {required && (
        <span className={asteriskClassName} data-mui-test="LabelBaseAsterisk">
          {'\u2009*'}
        </span>
      )}
    </label>
  );
}

LabelBase.propTypes = {
  /**
   * The contents of the `LabelBase`.
   */
  children: PropTypes.node,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  /**
   * Whether the label should be displayed in an error state.
   */
  error: PropTypes.bool,
  /**
   * Whether the input of this label is focused.
   */
  focused: PropTypes.bool,
  /**
   * Whether this label should indicate that the input.
   * is required.
   */
  required: PropTypes.bool,
};

LabelBase.defaultProps = {
  focused: false,
  required: false,
  error: false,
};

LabelBase.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
