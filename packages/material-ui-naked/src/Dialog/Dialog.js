/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { capitalize } from '@material-ui/core/utils/helpers';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import { duration } from '@material-ui/core/styles/transitions';

const defaultTransitionDuration = { enter: duration.enteringScreen, exit: duration.leavingScreen };

const defaultClasses = {
  root: 'MuiDialog-root',
  scrollPaper: 'MuiDialog-scrollPaper',
  scrollBody: 'MuiDialog-scrollBody',
  container: 'MuiDialog-container',
  paper: 'MuiDialog-paper',
  paperScrollPaper: 'MuiDialog-paperScrollPaper',
  paperScrollBody: 'MuiDialog-paperScrollBody',
  paperWidthFalse: 'MuiDialog-paperWidthFalse',
  paperWidthXs: 'MuiDialog-paperWidthXs',
  paperWidthSm: 'MuiDialog-paperWidthSm',
  paperWidthMd: 'MuiDialog-paperWidthMd',
  paperWidthLg: 'MuiDialog-paperWidthLg',
  paperWidthXl: 'MuiDialog-paperWidthXl',
  paperFullWidth: 'MuiDialog-paperFullWidth',
  paperFullScreen: 'MuiDialog-paperFullScreen',
};

export function createDialog(components, passProps = () => undefined) {
  /**
   * Dialogs are overlaid modal paper based components with a backdrop.
   */
  const Dialog = React.forwardRef(function Dialog(props, ref) {
    const {
      BackdropProps,
      children,
      classes = defaultClasses,
      className,
      disableBackdropClick = false,
      disableEscapeKeyDown = false,
      fullScreen = false,
      fullWidth = false,
      maxWidth = 'sm',
      onBackdropClick,
      onClose,
      onEnter,
      onEntered,
      onEntering,
      onEscapeKeyDown,
      onExit,
      onExited,
      onExiting,
      open,
      PaperComponent = components.Paper,
      PaperProps = {},
      scroll = 'paper',
      TransitionComponent = components.Fade,
      transitionDuration = defaultTransitionDuration,
      TransitionProps,
      ...other
    } = props;

    const mouseDownTarget = React.useRef();
    const handleMouseDown = event => {
      mouseDownTarget.current = event.target;
    };
    const handleBackdropClick = event => {
      // Ignore the events not coming from the "backdrop"
      // We don't want to close the dialog when clicking the dialog content.
      if (event.target !== event.currentTarget) {
        return;
      }

      // Make sure the event starts and ends on the same DOM element.
      if (event.target !== mouseDownTarget.current) {
        return;
      }

      mouseDownTarget.current = null;

      if (onBackdropClick) {
        onBackdropClick(event);
      }

      if (!disableBackdropClick && onClose) {
        onClose(event, 'backdropClick');
      }
    };

    return (
      <components.Modal
        className={clsx(classes.root, className)}
        BackdropComponent={Backdrop}
        BackdropProps={{
          transitionDuration,
          ...BackdropProps,
        }}
        closeAfterTransition
        disableBackdropClick={disableBackdropClick}
        disableEscapeKeyDown={disableEscapeKeyDown}
        onEscapeKeyDown={onEscapeKeyDown}
        onClose={onClose}
        open={open}
        ref={ref}
        role="dialog"
        {...other}
      >
        <TransitionComponent
          appear
          in={open}
          timeout={transitionDuration}
          onEnter={onEnter}
          onEntering={onEntering}
          onEntered={onEntered}
          onExit={onExit}
          onExiting={onExiting}
          onExited={onExited}
          {...TransitionProps}
        >
          <components.Container
            {...passProps('Container', { scroll })}
            className={clsx(classes.container, classes[`scroll${capitalize(scroll)}`])}
            onClick={handleBackdropClick}
            onMouseDown={handleMouseDown}
            role="document"
            data-mui-test="FakeBackdrop"
          >
            <PaperComponent
              {...passProps('Paper', { scroll, maxWidth, fullScreen, fullWidth })}
              elevation={24}
              {...PaperProps}
              className={clsx(
                classes.paper,
                classes[`paperScroll${capitalize(scroll)}`],
                classes[`paperWidth${capitalize(String(maxWidth))}`],
                {
                  [classes.paperFullScreen]: fullScreen,
                  [classes.paperFullWidth]: fullWidth,
                },
                PaperProps.className,
              )}
            >
              {children}
            </PaperComponent>
          </components.Container>
        </TransitionComponent>
      </components.Modal>
    );
  });

  Dialog.propTypes = {
    /**
     * @ignore
     */
    BackdropProps: PropTypes.object,
    /**
     * Dialog children, usually the included sub-components.
     */
    children: PropTypes.node.isRequired,
    /**
     * Override or extend the styles applied to the component.
     * See [CSS API](#css) below for more details.
     */
    classes: PropTypes.object,
    /**
     * @ignore
     */
    className: PropTypes.string,
    /**
     * If `true`, clicking the backdrop will not fire the `onClose` callback.
     */
    disableBackdropClick: PropTypes.bool,
    /**
     * If `true`, hitting escape will not fire the `onClose` callback.
     */
    disableEscapeKeyDown: PropTypes.bool,
    /**
     * If `true`, the dialog will be full-screen
     */
    fullScreen: PropTypes.bool,
    /**
     * If `true`, the dialog stretches to `maxWidth`.
     */
    fullWidth: PropTypes.bool,
    /**
     * Determine the max-width of the dialog.
     * The dialog width grows with the size of the screen.
     * Set to `false` to disable `maxWidth`.
     */
    maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', false]),
    /**
     * Callback fired when the backdrop is clicked.
     */
    onBackdropClick: PropTypes.func,
    /**
     * Callback fired when the component requests to be closed.
     *
     * @param {object} event The event source of the callback
     * @param {string} reason Can be:`"escapeKeyDown"`, `"backdropClick"`
     */
    onClose: PropTypes.func,
    /**
     * Callback fired before the dialog enters.
     */
    onEnter: PropTypes.func,
    /**
     * Callback fired when the dialog has entered.
     */
    onEntered: PropTypes.func,
    /**
     * Callback fired when the dialog is entering.
     */
    onEntering: PropTypes.func,
    /**
     * Callback fired when the escape key is pressed,
     * `disableKeyboard` is false and the modal is in focus.
     */
    onEscapeKeyDown: PropTypes.func,
    /**
     * Callback fired before the dialog exits.
     */
    onExit: PropTypes.func,
    /**
     * Callback fired when the dialog has exited.
     */
    onExited: PropTypes.func,
    /**
     * Callback fired when the dialog is exiting.
     */
    onExiting: PropTypes.func,
    /**
     * If `true`, the Dialog is open.
     */
    open: PropTypes.bool.isRequired,
    /**
     * The component used to render the body of the dialog.
     */
    PaperComponent: PropTypes.elementType,
    /**
     * Properties applied to the [`Paper`](/api/paper/) element.
     */
    PaperProps: PropTypes.object,
    /**
     * Determine the container for scrolling the dialog.
     */
    scroll: PropTypes.oneOf(['body', 'paper']),
    /**
     * The component used for the transition.
     */
    TransitionComponent: PropTypes.elementType,
    /**
     * The duration for the transition, in milliseconds.
     * You may specify a single timeout for all transitions, or individually with an object.
     */
    transitionDuration: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number }),
    ]),
    /**
     * Properties applied to the `Transition` element.
     */
    TransitionProps: PropTypes.object,
  };

  return Dialog;
}

export default createDialog({
  Paper,
  Fade,
  Modal,
  Backdrop,
  Container: 'div',
});
