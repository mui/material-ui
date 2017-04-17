// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';
import Modal from '../internal/Modal';
import Fade from '../transitions/Fade';
import { duration } from '../styles/transitions';
import Paper from '../Paper';

export const styleSheet = createStyleSheet('MuiDialog', (theme) => {
  return {
    modal: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    dialog: {
      display: 'flex',
      flexDirection: 'column',
      flex: '0 1 auto',
      position: 'relative',
      width: '75%',
      maxHeight: '90vh',
      '&:focus': {
        outline: 'none',
      },
    },
    'dialogWidth-xs': {
      maxWidth: theme.breakpoints.getWidth('xs'),
    },
    'dialogWidth-sm': {
      maxWidth: theme.breakpoints.getWidth('sm'),
    },
    'dialogWidth-md': {
      maxWidth: theme.breakpoints.getWidth('md'),
    },
    fullScreen: {
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      maxHeight: '100%',
      borderRadius: 0,
    },
  };
});

/**
 * Dialogs are overlaid modal paper based components with a backdrop.
 *
 * ```jsx
 * <Dialog>
 *   <DialogContent>...</DialogContent>
 *   <DialogActions>...</DialogActions>
 * </Dialog>
 * ```
 */
export default class Dialog extends Component {

  static propTypes = {
    /**
     * Dialog children, usually the included sub-components.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * If `true`, the dialog will be full-screen.
     */
    fullScreen: PropTypes.bool,
    /**
     * If `true`, clicking the backdrop will not fire the `onRequestClose` callback.
     */
    ignoreBackdropClick: PropTypes.bool,
    /**
     * If `true`, hitting escape will not fire the `onRequestClose` callback.
     */
    ignoreEscapeKeyUp: PropTypes.bool,
    /**
     * Duration of the animation when the element is entering.
     */
    enterTransitionDuration: PropTypes.number, // eslint-disable-line react/sort-prop-types
    /**
     * Duration of the animation when the element is leaving.
     */
    leaveTransitionDuration: PropTypes.number,
    /**
     * Determine the max width of the dialog.
     * The dialog width grows with the size of the screen, this property is useful
     * on the desktop where you might need some coherent different width size across your
     * application.
     */
    maxWidth: PropTypes.oneOf([
      'xs',
      'sm',
      'md',
    ]),
    /**
     * Callback fired when the backdrop is clicked.
     */
    onBackdropClick: PropTypes.func,
    /**
     * Callback fired before the dialog enters.
     */
    onEnter: PropTypes.func,
    /**
     * Callback fired when the dialog is entering.
     */
    onEntering: PropTypes.func,
    /**
     * Callback fired when the dialog has entered.
     */
    onEntered: PropTypes.func, // eslint-disable-line react/sort-prop-types
    /**
     * Callback fires when the escape key is released and the modal is in focus.
     */
    onEscapeKeyUp: PropTypes.func, // eslint-disable-line react/sort-prop-types
    /**
     * Callback fired before the dialog exits.
     */
    onExit: PropTypes.func,
    /**
     * Callback fired when the dialog is exiting.
     */
    onExiting: PropTypes.func,
    /**
     * Callback fired when the dialog has exited.
     */
    onExited: PropTypes.func, // eslint-disable-line react/sort-prop-types
    /**
     * Callback fired when the dialog requests to be closed.
     */
    onRequestClose: PropTypes.func,
    /**
     * If `true`, the Dialog is open.
     */
    open: PropTypes.bool,
    /**
     * The CSS class name of the paper inner element.
     */
    paperClassName: PropTypes.string,
    /**
     * Transition component.
     */
    transition: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  };

  static defaultProps = {
    fullScreen: false,
    ignoreBackdropClick: false,
    ignoreEscapeKeyUp: false,
    enterTransitionDuration: duration.enteringScreen,
    leaveTransitionDuration: duration.leavingScreen,
    maxWidth: 'sm',
    open: false,
    transition: Fade,
  };

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  render() {
    const {
      children,
      className,
      fullScreen,
      ignoreBackdropClick,
      ignoreEscapeKeyUp,
      enterTransitionDuration,
      leaveTransitionDuration,
      maxWidth,
      open,
      onBackdropClick,
      onEscapeKeyUp,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      onRequestClose,
      paperClassName,
      transition,
      ...other
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet);

    const transitionProps = {
      in: open,
      transitionAppear: true,
      enterTransitionDuration,
      leaveTransitionDuration,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
    };

    let createTransitionFn;

    if (typeof transition === 'function') {
      createTransitionFn = React.createElement;
    } else {
      createTransitionFn = React.cloneElement;
    }

    return (
      <Modal
        className={classNames(classes.modal, className)}
        backdropTransitionDuration={open ? enterTransitionDuration : leaveTransitionDuration}
        ignoreBackdropClick={ignoreBackdropClick}
        ignoreEscapeKeyUp={ignoreEscapeKeyUp}
        onBackdropClick={onBackdropClick}
        onEscapeKeyUp={onEscapeKeyUp}
        onRequestClose={onRequestClose}
        show={open}
        {...other}
      >
        {createTransitionFn(transition, transitionProps, (
          <Paper
            data-mui-test="Dialog"
            elevation={24}
            className={classNames(classes.dialog, classes[`dialogWidth-${maxWidth}`],
              paperClassName, { [classes.fullScreen]: fullScreen })}
          >
            {children}
          </Paper>
        ))}
      </Modal>
    );
  }
}
