// @flow

import React from 'react';
import type { ComponentType, Element, Node } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { capitalizeFirstLetter } from '../utils/helpers';
import Modal from '../internal/Modal';
import Fade from '../transitions/Fade';
import { duration } from '../styles/transitions';
import Paper from '../Paper';
import type { TransitionDuration, TransitionCallback } from '../internal/Transition';

export const styles = (theme: Object) => ({
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
    maxWidth: theme.breakpoints.values.xs,
  },
  paperWidthSm: {
    maxWidth: theme.breakpoints.values.sm,
  },
  paperWidthMd: {
    maxWidth: theme.breakpoints.values.md,
  },
  fullWidth: {
    width: '100%',
  },
  fullScreen: {
    margin: 0,
    width: '100%',
    maxWidth: '100%',
    height: '100%',
    maxHeight: '100%',
    borderRadius: 0,
  },
});

type ProvidedProps = {
  classes: Object,
};

export type Props = {
  /**
   * Dialog children, usually the included sub-components.
   */
  children?: Node,
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
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration?: TransitionDuration,
  /**
   * Determine the max width of the dialog.
   * The dialog width grows with the size of the screen, this property is useful
   * on the desktop where you might need some coherent different width size across your
   * application.
   */
  maxWidth?: 'xs' | 'sm' | 'md',
  /**
   * If specified, stretches dialog to max width.
   */
  fullWidth?: boolean,
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
  onEntered?: TransitionCallback,
  /**
   * Callback fires when the escape key is released and the modal is in focus.
   */
  onEscapeKeyUp?: Function,
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
  onExited?: TransitionCallback,
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
  transition?: ComponentType<*> | Element<any>,
};

/**
 * Dialogs are overlaid modal paper based components with a backdrop.
 */
function Dialog(props: ProvidedProps & Props) {
  const {
    children,
    classes,
    className,
    fullScreen,
    ignoreBackdropClick,
    ignoreEscapeKeyUp,
    transitionDuration,
    maxWidth,
    fullWidth,
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

  const createTransitionFn =
    typeof transition === 'function' ? React.createElement : React.cloneElement;

  return (
    <Modal
      className={classNames(classes.root, className)}
      backdropTransitionDuration={transitionDuration}
      ignoreBackdropClick={ignoreBackdropClick}
      ignoreEscapeKeyUp={ignoreEscapeKeyUp}
      onBackdropClick={onBackdropClick}
      onEscapeKeyUp={onEscapeKeyUp}
      onRequestClose={onRequestClose}
      show={open}
      {...other}
    >
      {createTransitionFn(
        /* $FlowFixMe - FIXME See Snackbar for similar create vs clone example */
        transition,
        {
          in: open,
          transitionAppear: true,
          transitionDuration,
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
            {
              [classes.fullScreen]: fullScreen,
              [classes.fullWidth]: fullWidth,
            },
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
  transitionDuration: {
    enter: duration.enteringScreen,
    exit: duration.leavingScreen,
  },
  maxWidth: 'sm',
  fullWidth: false,
  open: false,
  transition: Fade,
};

export default withStyles(styles, { name: 'MuiDialog' })(Dialog);
