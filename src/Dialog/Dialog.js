// @flow

import React, { createElement, cloneElement } from 'react';
import type { Element } from 'react';
import classNames from 'classnames';
import createStyleSheet from '../styles/createStyleSheet';
import withStyles from '../styles/withStyles';
import { capitalizeFirstLetter } from '../utils/helpers';
import Modal from '../internal/Modal';
import Fade from '../transitions/Fade';
import { duration } from '../styles/transitions';
import Paper from '../Paper';
import type { TransitionCallback } from '../internal/Transition';

export const styleSheet = createStyleSheet('MuiDialog', theme => ({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    display: 'flex',
    margin: theme.spacing.unit * 4,
    flexDirection: 'column',
    flex: '0 1 auto',
    position: 'relative',
    maxHeight: '90vh',
    '&:focus': {
      outline: 'none',
    },
  },
  paperWidthXs: {
    maxWidth: theme.breakpoints.getWidth('xs'),
  },
  paperWidthSm: {
    maxWidth: theme.breakpoints.getWidth('sm'),
  },
  paperWidthMd: {
    maxWidth: theme.breakpoints.getWidth('md'),
  },
  fullScreen: {
    margin: 0,
    width: '100%',
    maxWidth: '100%',
    height: '100%',
    maxHeight: '100%',
    borderRadius: 0,
  },
}));

type DefaultProps = {
  classes: Object,
};

export type Props = {
  /**
   * Dialog children, usually the included sub-components.
   */
  children?: Element<*>,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * If `true`, it will be full-screen
   */
  fullScreen?: boolean,
  /**
   * If `true`, clicking the backdrop will not fire the `onRequestClose` callback.
   */
  ignoreBackdropClick?: boolean,
  /**
   * If `true`, hitting escape will not fire the `onRequestClose` callback.
   */
  ignoreEscapeKeyUp?: boolean,
  /**
   * Duration of the animation when the element is entering.
   */
  enterTransitionDuration?: number, // eslint-disable-line react/sort-prop-types
  /**
   * Duration of the animation when the element is leaving.
   */
  leaveTransitionDuration?: number,
  /**
   * Determine the max width of the dialog.
   * The dialog width grows with the size of the screen, this property is useful
   * on the desktop where you might need some coherent different width size across your
   * application.
   */
  maxWidth?: 'xs' | 'sm' | 'md',
  /**
   * Callback fired when the backdrop is clicked.
   */
  onBackdropClick?: Function,
  /**
   * Callback fired before the dialog enters.
   */
  onEnter?: TransitionCallback,
  /**
   * Callback fired when the dialog is entering.
   */
  onEntering?: TransitionCallback,
  /**
   * Callback fired when the dialog has entered.
   */
  onEntered?: TransitionCallback, // eslint-disable-line react/sort-prop-types
  /**
   * Callback fires when the escape key is released and the modal is in focus.
   */
  onEscapeKeyUp?: Function, // eslint-disable-line react/sort-prop-types
  /**
   * Callback fired before the dialog exits.
   */
  onExit?: TransitionCallback,
  /**
   * Callback fired when the dialog is exiting.
   */
  onExiting?: TransitionCallback,
  /**
   * Callback fired when the dialog has exited.
   */
  onExited?: TransitionCallback, // eslint-disable-line react/sort-prop-types
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback
   */
  onRequestClose?: Function,
  /**
   * If `true`, the Dialog is open.
   */
  open?: boolean,
  /**
   * Transition component.
   */
  transition?: Function | Element<*>,
};

type AllProps = DefaultProps & Props;

/**
 * Dialogs are overlaid modal paper based components with a backdrop.
 */
function Dialog(props: AllProps) {
  const {
    children,
    classes,
    className,
    fullScreen,
    ignoreBackdropClick,
    ignoreEscapeKeyUp,
    enterTransitionDuration,
    leaveTransitionDuration,
    maxWidth: maxWidthProp,
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
    transition,
    ...other
  } = props;

  // workaround: see #2 test case from https://github.com/facebook/flow/issues/1660#issuecomment-302468866
  const maxWidth = maxWidthProp || Dialog.defaultProps.maxWidth;
  const createTransitionFn = typeof transition === 'function' ? createElement : cloneElement;

  return (
    <Modal
      className={classNames(classes.root, className)}
      backdropTransitionDuration={open ? enterTransitionDuration : leaveTransitionDuration}
      ignoreBackdropClick={ignoreBackdropClick}
      ignoreEscapeKeyUp={ignoreEscapeKeyUp}
      onBackdropClick={onBackdropClick}
      onEscapeKeyUp={onEscapeKeyUp}
      onRequestClose={onRequestClose}
      show={open}
      {...other}
    >
      {createTransitionFn(
        /* $FlowFixMe */
        transition,
        {
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
        },
        <Paper
          data-mui-test="Dialog"
          elevation={24}
          className={classNames(
            classes.paper,
            classes[`paperWidth${capitalizeFirstLetter(maxWidth)}`],
            { [classes.fullScreen]: fullScreen },
          )}
        >
          {children}
        </Paper>,
      )}
    </Modal>
  );
}

Dialog.defaultProps = {
  fullScreen: false,
  ignoreBackdropClick: false,
  ignoreEscapeKeyUp: false,
  enterTransitionDuration: duration.enteringScreen,
  leaveTransitionDuration: duration.leavingScreen,
  maxWidth: 'sm',
  open: false,
  transition: Fade,
};

export default withStyles(styleSheet)(Dialog);
