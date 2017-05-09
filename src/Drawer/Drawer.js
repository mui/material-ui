// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import Modal from '../internal/Modal';
import customPropTypes from '../utils/customPropTypes';
import Slide from '../transitions/Slide';
import Paper from '../Paper';
import { duration } from '../styles/transitions';

function getSlideDirection(anchor) {
  if (anchor === 'left') {
    return 'right';
  } else if (anchor === 'right') {
    return 'left';
  } else if (anchor === 'top') {
    return 'down';
  }
  // (anchor === 'bottom')
  return 'up';
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
    left: {
      left: 0,
      right: 'auto',
    },
    right: {
      left: 'auto',
      right: 0,
    },
    top: {
      top: 0,
      left: 0,
      bottom: 'auto',
      right: 0,
      height: 'auto',
      maxHeight: '100vh',
    },
    bottom: {
      top: 'auto',
      left: 0,
      bottom: 0,
      right: 0,
      height: 'auto',
      maxHeight: '100vh',
    },
    docked: {
      flex: '0 0 auto',
      overflowX: 'hidden',
      '& $paper': {
        borderRight: `1px solid ${theme.palette.text.divider}`,
        position: 'relative',
      },
    },
    // Using these classes on the container element instead of directly on
    // the Paper element to ensure higher specificity (so setting a custom width via
    // paperClassName doesn't override the widths for closed and mini states).
    // This also keeps the current className/paperClassName props intact.
    mini: {
      '& $paper': {
        width: 72,
        // Perfectly center icons by not including border in width.
        boxSizing: 'content-box',
      },
    },
    closed: {
      '& $paper': {
        width: 0,
        borderRight: 'none',
      },
    },
    widthTransition: {
      '& $paper': {
        // Hardcoding the width transition for Persistent and Mini variant types for now.
        // TODO: Add support for width transitions to Collapse component?
        // Or make this configurable in some other way?
        transition: theme.transitions.create('width',
          { duration: theme.transitions.duration.shorter }),
      },
    },
  };
});

/**
 * This is a drawer.
 */
export default class Drawer extends Component {
  static propTypes = {
    /**
     * Side from which the drawer will appear.
     */
    anchor: PropTypes.oneOf(['left', 'top', 'right', 'bottom']),
    /**
     * The contents of the drawer.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * The elevation of the drawer.
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
     * If `true`, the drawer is open.
     */
    open: PropTypes.bool,
    /**
     * The CSS class name of the paper element.
     */
    paperClassName: PropTypes.string,
    /**
     * The type of drawer.
     * See https://material.io/guidelines/patterns/navigation-drawer.html
     */
    type: PropTypes.oneOf(['permanent', 'persistent', 'mini', 'temporary']),
  };

  static defaultProps = {
    anchor: 'left',
    type: 'temporary', // Mobile first.
    enterTransitionDuration: duration.enteringScreen,
    leaveTransitionDuration: duration.leavingScreen,
    open: false,
    elevation: 16,
  };

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  render() {
    const {
      anchor: anchorProp,
      type,
      children,
      className,
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
    let anchor = anchorProp;
    if (rtl && ['left', 'right'].includes(anchor)) {
      anchor = (anchor === 'left') ? 'right' : 'left';
    }

    const slideDirection = getSlideDirection(anchor);

    const drawer = (
      <Paper
        elevation={type === 'temporary' ? elevation : 0}
        square
        className={classNames(classes.paper, classes[anchor], paperClassName)}
      >
        {children}
      </Paper>
    );

    if (type !== 'temporary') {
      // Persistent drawer (with mini variant):
      if (type !== 'permanent') {
        const closedClassName = type === 'mini' ? classes.mini : classes.closed;
        return (
          <div
            className={classNames(classes.docked, classes.widthTransition,
             !open && closedClassName, className)}
          >
            {drawer}
          </div>
        );
      }

      // Permanent drawer:
      return (
        <div className={classNames(classes.docked, className)}>
          {drawer}
        </div>
      );
    }

    // Temporary drawer:
    return (
      <Modal
        backdropTransitionDuration={open ? enterTransitionDuration : leaveTransitionDuration}
        className={className}
        {...other}
        show={open}
      >
        <Slide
          in={open}
          direction={slideDirection}
          enterTransitionDuration={enterTransitionDuration}
          leaveTransitionDuration={leaveTransitionDuration}
          transitionAppear
        >
          {drawer}
        </Slide>
      </Modal>
    );
  }
}
