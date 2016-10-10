// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';

export const styleSheet = createStyleSheet('ListSubheader', (theme) => {
  const { palette, typography } = theme;

  return {
    root: {
      boxSizing: 'border-box',
      lineHeight: '48px',
      paddingLeft: 16,
      width: '100%',
      color: palette.text.secondary,
      fontWeight: typography.fontWeightMedium,
      fontSize: typography.fontSize,
    },
    primary: {
      color: palette.primary[500],
    },
    inset: {
      paddingLeft: 72,
    },
  };
});

export default function ListSubheader(props, context) {
  const {
    className: classNameProp,
    primary,
    inset,
    children,
    ...other,
  } = props;
  const classes = context.styleManager.render(styleSheet);
  const className = classNames(classes.root, {
    [classes.primary]: primary,
    [classes.inset]: inset,
  }, classNameProp);

  return (
    <div className={className} {...other}>{children}</div>
  );
}

ListSubheader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  inset: PropTypes.bool,
  primary: PropTypes.bool,
};

ListSubheader.defaultProps = {
  inset: false,
};

ListSubheader.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
