// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';
import Paper from '../Paper';

export const styleSheet = createStyleSheet('MuiAppBar', (theme) => ({
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
}));

function AppBar(props) {
  const {
    accent,
    children,
    classes,
    className: classNameProp,
    ...other
  } = props;

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

AppBar.propTypes = {
  /**
   * If `true`, the AppBar will use the theme's accent color.
   */
  accent: PropTypes.bool,
  /**
   * The content of the component.
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
};

AppBar.defaultProps = {
  accent: false,
};

export default withStyles(styleSheet)(AppBar);
