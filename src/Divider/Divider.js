// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'stylishly/lib/styleSheet';
import classNames from 'classnames';

export const styleSheet = createStyleSheet('Divider', (theme) => {
  const { palette } = theme;

  return {
    root: {
      height: 1,
      margin: '0 -1px 0 0',
      border: 'none',
      backgroundColor: palette.text.divider,
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
    ...other,
  } = props;
  const classes = context.styleManager.render(styleSheet, { group: 'mui' });
  const className = classNames(classes.root, {
    [classes.absolute]: absolute,
  }, classNameProp);

  return (
    <hr className={className} {...other} />
  );
}

Divider.propTypes = {
  absolute: PropTypes.bool,
  className: PropTypes.string,
};

Divider.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
