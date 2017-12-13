import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import warning from 'warning';
import keycode from 'keycode';
import canUseDom from 'dom-helpers/util/inDOM';
import contains from 'dom-helpers/query/contains';
import activeElement from 'dom-helpers/activeElement';
import ownerDocument from 'dom-helpers/ownerDocument';
import addEventListener from '../utils/addEventListener';
import { createChainedFunction } from '../utils/helpers';
import Fade from '../transitions/Fade';
import withStyles from '../styles/withStyles';
import createModalManager from './modalManager';
import Backdrop from './Backdrop';
import Portal from '../internal/Portal';

// Modals don't open on the server so this won't break concurrency.
// Could also put this on context.
const modalManager = createModalManager();

export const styles = theme => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
    position: 'fixed',
    zIndex: theme.zIndex.dialog,
    top: 0,
    left: 0,
  },
  hidden: {
    visibility: 'hidden',
  },
});

/**
 * The modal component provides a solid foundation for creating dialogs,
 * popovers, or whatever else.
 * The component renders its `children` node in front of a backdrop component.
 *
 * The `Modal` offers a few helpful features over using just a `Portal` component and some styles:
 * - Manages dialog stacking when one-at-a-time just isn't enough.
 * - Creates a backdrop, for disabling interaction below the modal.
 * - It properly manages focus; moving to the modal content,
 *   and keeping it there until the modal is closed.
 * - It disables scrolling of the page content while open.
 * - Adds the appropriate ARIA roles are automatically.
 *
 * This component shares many concepts with [react-overlays](https://react-bootstrap.github.io/react-overlays/#modals).
 */
class Modal extends React.Component {
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
    if (this.props.show) {
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
    // We are waiting for the onExited callback to call handleHide.
  }

  componentWillUnmount() {
    if (this.props.show || !this.state.exited) {
      this.handleHide();
    }
    this.mounted = false;
  }

  onDocumentKeyUpListener = null;
  onFocusListener = null;
  mounted = false;
  lastFocus = undefined;
  modal = null;
  mountNode = null;

  checkForFocus() {
    if (canUseDom) {
      this.lastFocus = activeElement();
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

  focus() {
    const currentFocus = activeElement(ownerDocument(ReactDOM.findDOMNode(this)));
    const modalContent = this.modal && this.modal.lastChild;
    const focusInModal = currentFocus && contains(modalContent, currentFocus);

    if (modalContent instanceof HTMLElement && !focusInModal) {
      if (!modalContent.hasAttribute('tabIndex')) {
        modalContent.setAttribute('tabIndex', -1);
        warning(
          false,
          'Material-UI: the modal content node does not accept focus. ' +
            'For the benefit of assistive technologies, ' +
            'the tabIndex of the node is being set to "-1".',
        );
      }

      modalContent.focus();
    }
  }

  handleHide() {
    this.props.modalManager.remove(this);
    if (this.onDocumentKeyUpListener) this.onDocumentKeyUpListener.remove();
    if (this.onFocusListener) this.onFocusListener.remove();
    this.restoreLastFocus();
  }

  handleFocusListener = () => {
    if (!this.mounted || !this.props.modalManager.isTopModal(this)) {
      return;
    }

    const currentFocus = activeElement(ownerDocument(ReactDOM.findDOMNode(this)));
    const modalContent = this.modal && this.modal.lastChild;

    if (
      modalContent instanceof HTMLElement &&
      modalContent !== currentFocus &&
      !contains(modalContent, currentFocus)
    ) {
      modalContent.focus();
    }
  };

  handleDocumentKeyUp = event => {
    if (!this.mounted || !this.props.modalManager.isTopModal(this)) {
      return;
    }

    if (keycode(event) !== 'esc') {
      return;
    }

    const { onEscapeKeyUp, onClose, ignoreEscapeKeyUp } = this.props;

    if (onEscapeKeyUp) {
      onEscapeKeyUp(event);
    }

    if (onClose && !ignoreEscapeKeyUp) {
      onClose(event);
    }
  };

  handleBackdropClick = event => {
    if (event.target !== event.currentTarget) {
      return;
    }

    const { onBackdropClick, onClose, ignoreBackdropClick } = this.props;

    if (onBackdropClick) {
      onBackdropClick(event);
    }

    if (onClose && !ignoreBackdropClick) {
      onClose(event);
    }
  };

  handleTransitionExited = (...args) => {
    if (this.props.onExited) {
      this.props.onExited(...args);
    }

    this.setState({ exited: true });
    this.handleHide();
  };

  renderBackdrop(other = {}) {
    const {
      BackdropClassName,
      BackdropComponent,
      BackdropInvisible,
      BackdropTransitionDuration,
      show,
    } = this.props;

    return (
      <Fade appear in={show} timeout={BackdropTransitionDuration} {...other}>
        <BackdropComponent
          invisible={BackdropInvisible}
          className={BackdropClassName}
          onClick={this.handleBackdropClick}
        />
      </Fade>
    );
  }

  render() {
    const {
      BackdropClassName,
      BackdropComponent,
      BackdropInvisible,
      BackdropTransitionDuration,
      children,
      classes,
      className,
      disableBackdrop,
      ignoreBackdropClick,
      ignoreEscapeKeyUp,
      keepMounted,
      modalManager: modalManagerProp,
      onBackdropClick,
      onClose,
      onEnter,
      onEntered,
      onEntering,
      onEscapeKeyUp,
      onExit,
      onExited,
      onExiting,
      show,
      ...other
    } = this.props;

    if (!keepMounted && !show && this.state.exited) {
      return null;
    }

    const transitionCallbacks = {
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited: this.handleTransitionExited,
    };

    let modalChild = React.Children.only(children);
    const { role, tabIndex } = modalChild.props;
    const childProps = {};

    if (role === undefined) {
      childProps.role = role === undefined ? 'document' : role;
    }

    if (tabIndex === undefined) {
      childProps.tabIndex = tabIndex == null ? -1 : tabIndex;
    }

    let backdropProps;

    // It's a Transition like component
    if (modalChild.props.hasOwnProperty('in')) {
      Object.keys(transitionCallbacks).forEach(key => {
        childProps[key] = createChainedFunction(transitionCallbacks[key], modalChild.props[key]);
      });
    } else {
      backdropProps = transitionCallbacks;
    }

    if (Object.keys(childProps).length) {
      modalChild = React.cloneElement(modalChild, childProps);
    }

    return (
      <Portal
        open
        ref={node => {
          this.mountNode = node ? node.getLayer() : null;
        }}
      >
        <div
          data-mui-test="Modal"
          className={classNames(classes.root, className, {
            [classes.hidden]: this.state.exited,
          })}
          {...other}
          ref={node => {
            this.modal = node;
          }}
        >
          {!disableBackdrop &&
            (!keepMounted || show || !this.state.exited) &&
            this.renderBackdrop(backdropProps)}
          {modalChild}
        </div>
      </Portal>
    );
  }
}

Modal.propTypes = {
  /**
   * The CSS class name of the backdrop element.
   */
  BackdropClassName: PropTypes.string,
  /**
   * Pass a component class to use as the backdrop.
   */
  BackdropComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * If `true`, the backdrop is invisible.
   */
  BackdropInvisible: PropTypes.bool,
  /**
   * The duration for the backdrop transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  BackdropTransitionDuration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number }),
  ]),
  /**
   * A single child content element.
   */
  children: PropTypes.element,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the backdrop is disabled.
   */
  disableBackdrop: PropTypes.bool,
  /**
   * If `true`, clicking the backdrop will not fire the `onClose` callback.
   */
  ignoreBackdropClick: PropTypes.bool,
  /**
   * If `true`, hitting escape will not fire the `onClose` callback.
   */
  ignoreEscapeKeyUp: PropTypes.bool,
  /**
   * Always keep the children in the DOM.
   * This property can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Modal.
   */
  keepMounted: PropTypes.bool,
  /**
   * Instance of the modal manager.
   */
  modalManager: PropTypes.object,
  /**
   * Callback fires when the backdrop is clicked on.
   */
  onBackdropClick: PropTypes.func,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback
   */
  onClose: PropTypes.func,
  /**
   * Callback fired before the modal is entering.
   */
  onEnter: PropTypes.func,
  /**
   * Callback fired when the modal has entered.
   */
  onEntered: PropTypes.func,
  /**
   * Callback fired when the modal is entering.
   */
  onEntering: PropTypes.func,
  /**
   * Callback fires when the escape key is pressed and the modal is in focus.
   */
  onEscapeKeyUp: PropTypes.func,
  /**
   * Callback fired before the modal is exiting.
   */
  onExit: PropTypes.func,
  /**
   * Callback fired when the modal has exited.
   */
  onExited: PropTypes.func,
  /**
   * Callback fired when the modal is exiting.
   */
  onExiting: PropTypes.func,
  /**
   * If `true`, the Modal is visible.
   */
  show: PropTypes.bool,
};

Modal.defaultProps = {
  BackdropComponent: Backdrop,
  BackdropInvisible: false,
  BackdropTransitionDuration: 300,
  disableBackdrop: false,
  ignoreBackdropClick: false,
  ignoreEscapeKeyUp: false,
  keepMounted: false,
  modalManager,
};

export default withStyles(styles, { flip: false, name: 'MuiModal' })(Modal);
