// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';
import Paper from '../Paper';

export const styleSheet = createStyleSheet('MuiAppBar', (theme) => {
  return {
    appBar: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: theme.zIndex.appBar,
    },
    primary: {
      backgroundColor: theme.palette.primary[500],
      color: theme.palette.getContrastText(theme.palette.primary[500]),
    },
    accent: {
      backgroundColor: theme.palette.accent.A200,
      color: theme.palette.getContrastText(theme.palette.accent.A200),
    },
  };
});

export default class AppBar extends Component {
  static propTypes = {
    /**
     * If `true`, the AppBar will use the theme's accent color.
     */
    accent: PropTypes.bool,
    /**
     * The content of the component.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
  };

  static defaultProps = {
    accent: false,
  };

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  render() {
    const {
      accent,
      children,
      className: classNameProp,
      ...other
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet);

    const className = classNames({
      [classes.appBar]: true,
      [classes.primary]: !accent,
      [classes.accent]: accent,
    }, classNameProp);

    return (
      <Paper
        square
        elevation={4}
        className={className}
        {...other}
      >
        {children}
      </Paper>
    );
  }
}
