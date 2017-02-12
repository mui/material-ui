// @flow weak

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import Modal from '../internal/Modal';
import customPropTypes from '../utils/customPropTypes';
import Slide from '../transitions/Slide';
import Paper from '../Paper';
import { durations } from '../styles/transitions';

function getSlideDirection(anchor) {
  if (anchor === 'left') {
    return 'right';
  } else if (anchor === 'right') {
    return 'left';
  } else if (anchor === 'top') {
    return 'down';
  } else if (anchor === 'bottom') {
    return 'up';
  }

  return 'left';
}

export const styleSheet = createStyleSheet('MuiDrawer', (theme) => {
  return {
    paper: {
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      flex: '1 0 auto',
      position: 'fixed',
      top: 0,
      zIndex: theme.zIndex.navDrawer,
      willChange: 'transform',
      '&:focus': {
        outline: 'none',
      },
      WebkitOverflowScrolling: 'touch', // Add iOS momentum scrolling.
    },
    docked: {
      flex: '0 0 auto',
      '& $paper': {
        borderRight: `1px solid ${theme.palette.text.divider}`,
      },
    },
    modal: {
    },
  };
});

/**
 * This is a drawer.
 */
export default class Drawer extends Component {
  static propTypes = {
    /**
     * Side, which will `Drawer` appears from.
     */
    anchor: PropTypes.oneOf(['left', 'top', 'right', 'bottom']),
    /**
     * The contents of the `Drawer`.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * If set to true, the drawer will dock itself
     * and will no longer slide in with an overlay.
     */
    docked: PropTypes.bool,
    /**
     * The elevation of the `Drawer`.
     */
    elevation: PropTypes.number,
    /**
     * Customizes duration of enter animation (ms)
     */
    enterTransitionDuration: PropTypes.number,
    /**
     * Customizes duration of leave animation (ms)
     */
    leaveTransitionDuration: PropTypes.number,
    /**
     * Callback fired when the internal modal requests to be closed.
     */
    onRequestClose: PropTypes.func,
    /**
     * If true, the `Drawer` is open.
     */
    open: PropTypes.bool,
    /**
     * The CSS class name of the paper element.
     */
    paperClassName: PropTypes.string,
  };

  static defaultProps = {
    docked: false,
    enterTransitionDuration: durations.enteringScreen,
    leaveTransitionDuration: durations.leavingScreen,
    open: false,
    elevation: 16,
  };

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  render() {
    const {
      anchor: anchorProp,
      children,
      className,
      docked,
      enterTransitionDuration,
      leaveTransitionDuration,
      open,
      paperClassName,
      elevation,
      ...other
    } = this.props;

    const { theme: { dir }, render } = this.context.styleManager;
    const classes = render(styleSheet);
    const rtl = dir === 'rtl';
    const anchor = anchorProp || (rtl ? 'right' : 'left');
    const slideDirection = getSlideDirection(anchor);

    const drawer = (
      <Slide
        in={open}
        direction={slideDirection}
        enterTransitionDuration={enterTransitionDuration}
        leaveTransitionDuration={leaveTransitionDuration}
        transitionAppear
      >
        <Paper
          elevation={docked ? 0 : elevation}
          rounded={false}
          className={classNames(classes.paper, paperClassName)}
        >
          {children}
        </Paper>
      </Slide>
    );

    const containerProps = {
      className: classNames(classes.modal, className),
      ...other,
    };

    if (docked) {
      return (
        <div className={classNames(classes.docked, className)}>
          {drawer}
        </div>
      );
    }

    return (
      <Modal
        backdropTransitionDuration={open ? enterTransitionDuration : leaveTransitionDuration}
        {...containerProps}
        show={open}
      >
        {drawer}
      </Modal>
    );
  }
}
