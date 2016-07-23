// @flow weak

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createStyleSheet } from 'stylishly';
import ClassNames from 'classnames';
import warning from 'warning';
import canUseDom from 'dom-helpers/util/inDOM';
import contains from 'dom-helpers/query/contains';
import activeElement from 'dom-helpers/activeElement';
import ownerDocument from 'dom-helpers/ownerDocument';
import { createModalManager } from './modalManager';
import Backdrop from './Backdrop';
import Portal from './Portal';
import Fade from '../transitions/Fade';
import addEventListener from '../utils/addEventListener';

// Modals don't open on the server
// so this won't break concurrency
// ...........Could also put this on context....
const modalManager = createModalManager();

export const styleSheet = createStyleSheet('Modal', (theme) => {
  return {
    modal: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      position: 'fixed',
      zIndex: theme.zIndex.dialog,
      top: 0,
      left: 0,
    },
  };
});

/**
 * Still a WIP
 */
export default class Modal extends Component {

  static propTypes = {
    /**
     * Set to false to disable the backdrop, or true to enable it.
     */
    backdrop: PropTypes.bool,
    /**
     * Pass a component class to use as the backdrop.
     */
    backdropComponent: PropTypes.func,
    backdropTransitionDuration: PropTypes.number,
    /**
     * Can be used, for instance, to render a letter inside the avatar.
     */
    children: PropTypes.element,
    /**
     * The CSS class name of the root element.
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
     * @ignore
     */
    modalManager: PropTypes.object,
    /**
     * Callback fires when the backdrop is clicked on
     */
    onBackdropClick: PropTypes.func,
    /**
     * Callback fires when the escape key is pressed and the modal is in focus
     */
    onEscapeKeyUp: PropTypes.func,
    /**
     * Callback fired before the modal is entering
     */
    onEnter: PropTypes.func,
    /**
     * Callback fired when the modal is entering
     */
    onEntering: PropTypes.func,
    /**
     * Callback fired when the modal has entered
     */
    onEntered: PropTypes.func, // eslint-disable-line react/sort-prop-types
    /**
     * Callback fired before the modal is exiting
     */
    onExit: PropTypes.func,
    /**
     * Callback fired when the modal is exiting
     */
    onExiting: PropTypes.func,
    /**
     * Callback fired when the modal has exited
     */
    onExited: PropTypes.func, // eslint-disable-line react/sort-prop-types
    /**
     * Callback fired when the modal requests to be closed
     */
    onRequestClose: PropTypes.func,
    show: PropTypes.bool,
  };

  static defaultProps = {
    backdrop: true,
    backdropComponent: Backdrop,
    backdropTransitionDuration: 300,
    hideOnBackdropClick: true,
    hideOnEscapeKeyUp: true,
    modalManager,
    show: false,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  state = {
    exited: false,
  };

  componentWillMount() {
    if (!this.props.show) {
      this.setState({ exited: true });
    }
  }

  componentDidMount() {
    this.mounted = true;
    if (this.props.show === true) {
      this.handleShow();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show && this.state.exited) {
      this.setState({ exited: false });
    }
  }

  componentWillUpdate(nextProps) {
    if (!this.props.show && nextProps.show) {
      this.checkForFocus();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.show && this.props.show) {
      this.handleShow();
    }
  }

  componentWillUnmount() {
    if (this.props.show || !this.state.exited) {
      this.handleHide();
    }
    this.mounted = false;
  }

  mounted = false;
  lastFocus = undefined;
  modal = null;
  mountNode = null;
  onDocumentKeyUpListener = undefined;
  onFocusListener = undefined;

  checkForFocus() {
    if (canUseDom) {
      this.lastFocus = activeElement();
    }
  }

  focus() {
    const currentFocus = activeElement(ownerDocument(ReactDOM.findDOMNode(this)));
    const modalContent = this.modal && this.modal.lastChild;
    const focusInModal = currentFocus && contains(modalContent, currentFocus);

    if (modalContent && !focusInModal) {
      this.lastFocus = currentFocus;

      if (!modalContent.hasAttribute('tabIndex')) {
        modalContent.setAttribute('tabIndex', -1);
        warning(false, (
          'The modal content node does not accept focus. ' +
          'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'
        ));
      }

      modalContent.focus();
    }
  }

  restoreLastFocus() {
    if (this.lastFocus && this.lastFocus.focus) {
      this.lastFocus.focus();
      this.lastFocus = undefined;
    }
  }

  handleShow() {
    const doc = ownerDocument(ReactDOM.findDOMNode(this));
    this.props.modalManager.add(this);
    this.onDocumentKeyUpListener = addEventListener(doc, 'keyup', this.handleDocumentKeyUp);
    this.onFocusListener = addEventListener(doc, 'focus', this.handleFocusListener, true);
    this.focus();
  }

  handleHide() {
    this.props.modalManager.remove(this);
    this.onDocumentKeyUpListener.remove();
    this.onFocusListener.remove();
    this.restoreLastFocus();
  }

  handleFocusListener = () => {
    if (!this.mounted || !this.props.modalManager.isTopModal(this)) {
      return;
    }

    const currentFocus = activeElement(ownerDocument(ReactDOM.findDOMNode(this)));
    const modalContent = this.modal && this.modal.lastChild;

    if (modalContent && modalContent !== currentFocus && !contains(modalContent, currentFocus)) {
      modalContent.focus();
    }
  };

  handleDocumentKeyUp = () => {
    if (!this.mounted || !this.props.modalManager.isTopModal(this)) {
      return;
    }

    const {
      onEscapeKeyUp,
      onRequestClose,
      hideOnEscapeKeyUp,
    } = this.props;

    if (onEscapeKeyUp) {
      onEscapeKeyUp(event);
    }

    if (onRequestClose && hideOnEscapeKeyUp) {
      onRequestClose(event);
    }
  };

  handleBackdropClick = (event) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    const {
      onBackdropClick,
      onRequestClose,
      hideOnBackdropClick,
    } = this.props;

    if (onBackdropClick) {
      onBackdropClick(event);
    }

    if (onRequestClose && hideOnBackdropClick) {
      onRequestClose(event);
    }
  };

  handleBackdropExited = (...args) => {
    this.setState({ exited: true });
    this.handleHide();
    if (this.props.onExited) {
      this.props.onExited(...args);
    }
  };

  renderBackdrop(backdrop, backdropComponent, show) {
    if (!backdrop) {
      return null;
    }

    return (
      <Fade
        in={show}
        transitionAppear
        transitionDuration={this.props.backdropTransitionDuration}
        onEnter={this.props.onEnter}
        onEntering={this.props.onEntering}
        onEntered={this.props.onEntered}
        onExit={this.props.onExit}
        onExiting={this.props.onExiting}
        onExited={this.handleBackdropExited}
      >
        {React.createElement(backdropComponent, { onClick: this.handleBackdropClick })}
      </Fade>
    );
  }

  render() {
    const {
      backdrop,
      backdropComponent,
      backdropTransitionDuration, // eslint-disable-line no-unused-vars
      hideOnBackdropClick, // eslint-disable-line no-unused-vars
      hideOnEscapeKeyUp, // eslint-disable-line no-unused-vars
      children,
      className,
      modalManager: modalManagerProp, // eslint-disable-line no-unused-vars
      onBackdropClick, // eslint-disable-line no-unused-vars
      onEscapeKeyUp, // eslint-disable-line no-unused-vars
      onRequestClose, // eslint-disable-line no-unused-vars
      show,
      ...other,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet, { group: 'mui' });
    const mount = show || !this.state.exited;

    if (!mount) {
      return null;
    }

    let modalChild = React.Children.only(children);

    const { role, tabIndex } = modalChild.props;

    if (role === undefined || tabIndex === undefined) {
      modalChild = React.cloneElement(modalChild, {
        role: role === undefined ? 'document' : role,
        tabIndex: tabIndex == null ? '-1' : tabIndex,
      });
    }

    return (
      <Portal open ref={(c) => this.mountNode = c ? c.getLayer() : c}>
        <div
          data-mui-test="Modal"
          className={ClassNames(classes.modal, className)}
          ref={(c) => this.modal = c}
          {...other}
        >
          {this.renderBackdrop(backdrop, backdropComponent, show)}
          {modalChild}
        </div>
      </Portal>
    );
  }
}
