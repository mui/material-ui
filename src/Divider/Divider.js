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
}, { index: 5 });

export default function Divider(props, context) {
  const {
    absolute,
    className: classNameProp,
    light,
    ...other,
  } = props;
  const classes = context.styleManager.render(styleSheet);
  const className = classNames(classes.root, {
    [classes.absolute]: absolute,
    [light ? classes.light : classes.default]: true,
  }, classNameProp);

  return (
    <hr className={className} {...other} />
  );
}

Divider.propTypes = {
  absolute: PropTypes.bool,
  className: PropTypes.string,
  light: PropTypes.bool,
};

Divider.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
