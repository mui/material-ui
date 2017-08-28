// @flow

import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import Paper from '../Paper';
import Typography from '../Typography';

export const styles = (theme: Object) => {
  const type = theme.palette.type === 'light' ? 'dark' : 'light';
  const backgroundColor = theme.palette.shades[type].background.default;

  return {
    root: {
      pointerEvents: 'initial',
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
};

type DefaultProps = {
  classes: Object,
};

export type Props = {
  /**
   * The action to display.
   */
  action?: Node,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * The message to display.
   */
  message: Node,
};

type AllProps = DefaultProps & Props;

function SnackbarContent(props: AllProps) {
  const { action, classes, className, message, ...other } = props;

  return (
    <Paper
      component={Typography}
      headlineMapping={{
        body1: 'div',
      }}
      role="alertdialog"
      square
      elevation={6}
      className={classNames(classes.root, className)}
      {...other}
    >
      <div className={classes.message}>{message}</div>
      {action ? <div className={classes.action}>{action}</div> : null}
    </Paper>
  );
}

export default withStyles(styles, { name: 'MuiSnackbarContent' })(SnackbarContent);
