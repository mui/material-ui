// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';

export const styleSheet = createStyleSheet('Divider', (theme) => {
  const { palette } = theme;

  return {
    root: {
      height: 1,
      margin: '0 -1px 0 0',
      border: 'none',
    },
    default: {
      backgroundColor: palette.text.divider,
    },
    inset: {
      marginLeft: 72,
    },
    light: {
      backgroundColor: palette.text.lightDivider,
    },
    absolute: {
      margin: 0,
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
    },
  };
});

export default function Divider(props, context) {
  const {
    absolute,
    className: classNameProp,
    inset,
    light,
    ...other
  } = props;
  const classes = context.styleManager.render(styleSheet);
  const className = classNames(classes.root, {
    [classes.absolute]: absolute,
    [classes.inset]: inset,
    [light ? classes.light : classes.default]: true,
  }, classNameProp);

  return (
    <hr className={className} {...other} />
  );
}

Divider.propTypes = {
  absolute: PropTypes.bool,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  /**
   * If true, the `Divider` will be indented.
   */
  inset: PropTypes.bool,
  light: PropTypes.bool,
};

Divider.defaultProps = {
  absolute: false,
  inset: false,
  light: false,
};

Divider.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
