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
      '& $paper': {
        overflowX: 'hidden',
        borderRight: `1px solid ${theme.palette.text.divider}`,
      },
    },
    // Hardcoding the width transition for the mini variant for now.
    // TODO:
    // Add support for `width` to Collapse component?
    miniOpenTransition: {
      '& $paper': {
        transition: theme.transitions.create('width',
          { easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
      },
    },
    miniCloseTransition: {
      '& $paper': {
        transition: theme.transitions.create('width',
          { easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
      },
    },
    // NOTE:
    // Using the mini classes on the container element instead of directly on
    // the Paper element to ensure higher specificity (so setting a custom width via
    // paperClassName doesn't override the width of the mini variant's resting state).
    // This also keeps the current className/paperClassName props intact.

    // Setting a width via paperClassName is also required to make the transition work.
    // Should we make this an optional prop with a sensible default?
    // But then how de we use this prop in the stylesheet?
    // Possible solution: add Drawer width to theme instead.
    mini: {
      '& $paper': {
        width: 72,
        // Perfectly center icons by not including border in width:
        boxSizing: 'content-box',
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
     * If `false`, let the drawer slide in from outside the viewport.
     * Set to `true` to let the drawer slide in from outside its own
     * bounding box and position.
     * Only works on `temporary` and `persistent` drawers.
     */
    slideFromOutsideSelf: PropTypes.bool,
    /**
     * The type of drawer.
     * See https://material.io/guidelines/patterns/navigation-drawer.html
     *
     * Note: for the `persistent` and `mini` variant to work,
     * you must set a width via paperClassName.
     * For the `mini` variant, you also have to wrap the Drawer's children in
     * a container with the same fixed width set to paperClassName.
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
    slideFromOutsideSelf: false,
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
      slideFromOutsideSelf,
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

    const dockedDrawer = (
      <div className={classNames(classes.docked, className)}>
        {drawer}
      </div>
    );

    const slidingDrawer = (
      <Slide
        in={open}
        direction={slideDirection}
        enterTransitionDuration={enterTransitionDuration}
        leaveTransitionDuration={leaveTransitionDuration}
        transitionAppear
        useChildBounds={slideFromOutsideSelf}
      >
        {type === 'persistent' ? dockedDrawer : drawer}
      </Slide>
    );

    const miniDrawer = (
      <div
        className={classNames(classes.docked, !open && classes.mini,
          classes.miniOpenTransition, open && classes.miniCloseTransition,
          className)}
      >
        {drawer}
      </div>
    );

    if (type === 'permanent') {
      return dockedDrawer;
    } else if (type === 'persistent') {
      return slidingDrawer;
    } else if (type === 'mini') {
      return miniDrawer;
    }

    // Temporary drawer:
    return (
      <Modal
        backdropTransitionDuration={open ? enterTransitionDuration : leaveTransitionDuration}
        className={className}
        {...other}
        show={open}
      >
        {slidingDrawer}
      </Modal>
    );
  }
}
