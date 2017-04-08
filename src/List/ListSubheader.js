// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';

export const styleSheet = createStyleSheet('MuiListSubheader', (theme) => {
  const { palette, typography } = theme;

  return {
    root: {
      boxSizing: 'border-box',
      lineHeight: '48px',
      paddingLeft: 16,
      color: palette.text.secondary,
      fontFamily: typography.fontFamily,
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
    ...other
  } = props;
  const classes = context.styleManager.render(styleSheet);
  const className = classNames(classes.root, {
    [classes.primary]: primary,
    [classes.inset]: inset,
  }, classNameProp);

  return (
    <div className={className} {...other}>
      {children}
    </div>
  );
}

ListSubheader.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  /**
   * If `true`, the List Subheader will be indented.
   */
  inset: PropTypes.bool,
  /**
   * If `true`, the List Subheader will have the theme primary color.
   */
  primary: PropTypes.bool,
};

ListSubheader.defaultProps = {
  inset: false,
  primary: false,
};

ListSubheader.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
