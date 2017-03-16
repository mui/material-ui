// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import transitions from 'material-ui/styles/transitions';
import { darkWhite, pink, fullGrey } from 'material-ui/styles/colors';

export const styleSheet = createStyleSheet('SnackbarContent', (theme) => {
  const { typography } = theme;
  return {
    root: {
      borderRadius: 2,
      backgroundColor: fullGrey,
      padding: '0px 24px ',
      lineHeight: '48px',
      overflow: 'visible',
      width: '100%',
    },
    content: {
      fontSize: typography.fontSize,
      fontFamily: typography.fontSize,
      color: darkWhite,
      opacity: 1,
    },
    action: {
      float: 'right',
      lineHeight: '48px',
      color: pink.A200,
    },
    '@media (min-width: 760px) and (max-width:2000px )': {
      root: {
        minWidth: 288,
        maxWidth: 568,
        width: 50,
      },
    },
  };
});

export default function SnackbarContent(props, context) {
  const {
      action,
      message,
      open,
      ...other // eslint-disable-line no-unused-vars
  } = props;

  const transitionStyle = {
    transition: open ?
        transitions.create('opacity', {
          duration: transitions.duration.complex,
          delay: transitions.duration.shortest,
          easing: transitions.easing.easeOut,
        }) : transitions.create('opacity', {
          duration: transitions.duration.standard,
          delay: 0,
          easing: transitions.easing.easeOut,
        }),
  };
  const classes = context.styleManager.render(styleSheet);

  return (
    <div
      className={classes.root}
    >
      <div className={classes.content} style={transitionStyle}>
        <span>{message}</span>
        <div className={classes.action} >
          {action}
        </div>
      </div>
    </div>
  );
}
SnackbarContent.propTypes = {

  action: PropTypes.node,
  /**
   * The message to be displayed.
   *
   * (Note: If the message is an element or array,
   *  and the `Snackbar` may re-render while it is still open,
   *  ensure that the same object remains as the `message` property
   *  if you want to avoid the `Snackbar` hiding and
   *  showing again)
   */
  message: PropTypes.node,
  /**
   * @ignore
   * Controls whether the `Snackbar` is opened or not.
   */
  open: PropTypes.bool,
};

SnackbarContent.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
