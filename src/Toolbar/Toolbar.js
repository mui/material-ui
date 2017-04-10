// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';

export const styleSheet = createStyleSheet('MuiToolbar', (theme) => {
  return {
    root: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      height: 56,
    },
    gutters: theme.mixins.gutters({}),
    [theme.breakpoints.up('sm')]: {
      root: {
        height: 64,
      },
    },
  };
});

export default function Toolbar(props, context) {
  const {
    children,
    className: classNameProp,
    disableGutters,
    ...other
  } = props;

  const classes = context.styleManager.render(styleSheet);
  const className = classNames(classes.root, {
    [classes.gutters]: !disableGutters,
  }, classNameProp);

  return (
    <div className={className} {...other} >
      {children}
    </div>
  );
}

Toolbar.propTypes = {
  /**
   * Can be a `ToolbarGroup` to render a group of related items.
   */
  children: PropTypes.node,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  /**
   * If `true`, disables gutter padding.
   */
  disableGutters: PropTypes.bool,
};

Toolbar.defaultProps = {
  disableGutters: false,
};

Toolbar.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
