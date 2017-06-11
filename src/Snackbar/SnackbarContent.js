// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';
import Paper from '../Paper';
import Typography from '../Typography';

export const styleSheet = createStyleSheet('MuiSnackbarContent', theme => {
  const type = theme.palette.type === 'light' ? 'dark' : 'light';
  const backgroundColor = theme.palette.shades[type].background.default;

  return {
    root: {
      pointerEvents: 'initial',
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.getContrastText(backgroundColor),
      backgroundColor,
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      padding: `6px ${theme.spacing.unit * 3}px`,
      [theme.breakpoints.up('md')]: {
        minWidth: 288,
        maxWidth: 568,
        borderRadius: 2,
      },
      [theme.breakpoints.down('md')]: {
        flexGrow: 1,
      },
    },
    message: {
      padding: `${theme.spacing.unit}px 0`,
    },
    action: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 'auto',
      paddingLeft: theme.spacing.unit * 3,
      marginRight: -theme.spacing.unit,
    },
  };
});

function SnackbarContent(props) {
  const { action, classes, className, disableTypography, message, ...other } = props;

  return (
    <Paper
      role="alertdialog"
      square
      elevation={6}
      className={classNames(classes.root, className)}
      {...other}
    >
      {disableTypography
        ? message
        : <Typography color="inherit" className={classes.message}>
            {message}
          </Typography>}
      {action
        ? <div className={classes.action}>
            {action}
          </div>
        : null}
    </Paper>
  );
}

SnackbarContent.propTypes = {
  /**
   * The action to display.
   */
  action: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the message won't be wrapped by a typography component.
   * For instance, that can be usefull to can render an h4 instead of a
   */
  disableTypography: PropTypes.bool,
  /**
   * The message to display.
   */
  message: PropTypes.node.isRequired,
};

SnackbarContent.defaultProps = {
  disableTypography: false,
};

export default withStyles(styleSheet)(SnackbarContent);
