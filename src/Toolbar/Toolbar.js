// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'stylishly/lib/styleSheet';
import ClassNames from 'classnames';

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
    className,
    gutters,
    ...other,
  } = props;

  const classes = context.styleManager.render(styleSheet, { group: 'mui' });
  const classNames = ClassNames(classes.root, {
    [classes.gutters]: gutters,
  }, className);

  return (
    <div className={classNames} {...other} >
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
