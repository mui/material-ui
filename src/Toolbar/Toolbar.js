// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'stylishly/lib/styleSheet';
import classNames from 'classnames';

export const styleSheet = createStyleSheet('Toolbar', (theme) => {
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
    gutters,
    ...other,
  } = props;

  const classes = context.styleManager.render(styleSheet, { group: 'mui' });
  const className = classNames(classes.root, {
    [classes.gutters]: gutters,
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
   * The css class name of the root element.
   */
  className: PropTypes.string,
  /**
   * If set to true, enables gutter padding
   */
  gutters: PropTypes.bool,
};

Toolbar.defaultProps = {
  gutters: true,
};

Toolbar.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
