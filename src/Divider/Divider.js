// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';

export const styleSheet = createStyleSheet('MuiDivider', (theme) => {
  return {
    root: {
      height: 1,
      margin: 0, // Reset browser default style.
      border: 'none',
    },
    default: {
      backgroundColor: theme.palette.text.divider,
    },
    inset: {
      marginLeft: 72,
    },
    light: {
      backgroundColor: theme.palette.text.lightDivider,
    },
    absolute: {
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
   * If `true`, the divider will be indented.
   */
  inset: PropTypes.bool,
  /**
   * If `true`, the divider will have a lighter color.
   */
  light: PropTypes.bool,
};

Divider.defaultProps = {
  absolute: false,
  inset: false,
  light: false,
};

Divider.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
