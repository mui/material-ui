// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'stylishly';
import Paper from '../Paper';
import Modal from '../internal/Modal';
import Slide from '../transitions/Slide';
import classNames from 'classnames';

export const styleSheet = createStyleSheet('Dialog', () => {
  return {
    dialog: {
      flex: '0 1 auto',
      position: 'relative',
      width: '75%',
      maxWidth: 960,
      '&:focus': {
        outline: 'none',
      },
    },
  };
});

/**
 * Dialogs are overlayed modal paper based components with a backdrop.
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
     * The CSS class name of the **dialog** root paper element.
     */
    className: PropTypes.string,
    /**
     * If true, clicking the backdrop will fire the `onRequestClose` callback
     */
    hideOnBackdropClick: PropTypes.bool,
    /**
     * If true, hitting escape will fire the `onRequestClose` callback
     */
    hideOnEscapeKeyUp: PropTypes.bool,
    /**
     * Callback fires when the backdrop is clicked on
     */
    onBackdropClick: PropTypes.func,
    /**
     * Callback fires when the escape key is pressed and the modal is in focus
     */
    onEscapeKeyUp: PropTypes.func,
    /**
     * Callback fired before the dialog is entering
     */
    onEnter: PropTypes.func,
    /**
     * Callback fired when the dialog is entering
     */
    onEntering: PropTypes.func,
    /**
     * Callback fired when the dialog has entered
     */
    onEntered: PropTypes.func, // eslint-disable-line react/sort-prop-types
    /**
     * Callback fired before the dialog is exiting
     */
    onExit: PropTypes.func,
    /**
     * Callback fired when the dialog is exiting
     */
    onExiting: PropTypes.func,
    /**
     * Callback fired when the dialog has exited
     */
    onExited: PropTypes.func, // eslint-disable-line react/sort-prop-types
    /**
     * Callback fired when the dialog requests to be closed
     */
    onRequestClose: PropTypes.func,
    /**
     * Set to true to open the Dialog
     */
    open: PropTypes.bool,
    /**
     * Transition component
     */
    transition: PropTypes.func,
    /**
     * Slide transition direction
     */
    transitionDirection: PropTypes.oneOf(['up', 'down', 'left', 'right']),
    /**
     * Length of the transition in ms
     */
    transitionDuration: PropTypes.number,
  };

  static defaultProps = {
    hideOnBackdropClick: true,
    hideOnEscapeKeyUp: true,
    open: false,
    transition: Slide,
    transitionDirection: 'down',
    transitionDuration: 300,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  render() {
    const {
      children,
      className,
      hideOnBackdropClick,
      hideOnEscapeKeyUp,
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
      transitionDirection,
      transitionDuration,
      ...other,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet, { group: 'mui' });

    const transitionProps = {
      in: open,
      centered: true,
      direction: transitionDirection,
      transitionAppear: true,
      transitionDuration,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
    };

    return (
      <Modal
        backdropTransitionDuration={transitionDuration}
        hideOnBackdropClick={hideOnBackdropClick}
        hideOnEscapeKeyUp={hideOnEscapeKeyUp}
        onBackdropClick={onBackdropClick}
        onEscapeKeyUp={onEscapeKeyUp}
        onRequestClose={onRequestClose}
        show={open}
      >
        {React.createElement(transition, transitionProps, (
          <Paper
            data-mui-test="Dialog"
            zDepth={24}
            className={classNames(classes.dialog, className)}
            {...other}
          >
            {children}
          </Paper>
        ))}
      </Modal>
    );
  }
}
