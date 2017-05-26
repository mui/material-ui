// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';

export const styleSheet = createStyleSheet('MuiToolbar', theme => ({
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
}));

function Toolbar(props) {
  const { children, classes, className: classNameProp, disableGutters, ...other } = props;

  const className = classNames(
    classes.root,
    {
      [classes.gutters]: !disableGutters,
    },
    classNameProp,
  );

  return (
    <div className={className} {...other}>
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
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
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

export default withStyles(styleSheet)(Toolbar);
