// @flow

import React, { Element, Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
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
import Portal from './Portal';

/**
 * Modals don't open on the server so this won't break concurrency.
 * Could also put this on context.
 */
const modalManager = createModalManager();

export const styleSheet = createStyleSheet('MuiModal', theme => ({
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
    pointerEvents: 'none',
  },
}));

type DefaultProps = {
  backdropComponent: Function,
  backdropTransitionDuration: number,
  backdropInvisible: boolean,
  disableBackdrop: boolean,
  ignoreBackdropClick: boolean,
  ignoreEscapeKeyUp: boolean,
  modalManager: Object,
  show: boolean,
};

type Props = DefaultProps & {
  /**
   * The CSS class name of the backdrop element.
   */
  backdropClassName?: string,
  /**
   * Pass a component class to use as the backdrop.
   */
  backdropComponent?: Function,
  /**
   * If `true`, the backdrop is invisible.
   */
  backdropInvisible?: boolean,
  /**
   * Duration in ms for the backgrop transition.
   */
  backdropTransitionDuration?: number,
  /**
   * Content of the modal.
   */
  children?: Element<*>,
  /**
   * Useful to extend the style applied to components.
   */
  classes: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * Always keep the children in the DOM.
   * That property can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Modal.
   */
  keepMounted?: boolean,
  /**
   * If `true`, the backdrop is disabled.
   */
  disableBackdrop?: boolean,
  /**
   * If `true`, clicking the backdrop will not fire the `onRequestClose` callback.
   */
  ignoreBackdropClick?: boolean,
  /**
   * If `true`, hitting escape will not fire the `onRequestClose` callback.
   */
  ignoreEscapeKeyUp?: boolean,
  /**
   * @ignore
   */
  modalManager?: Object,
  /**
   * Callback fires when the backdrop is clicked on.
   */
  onBackdropClick?: Function,
  /**
   * Callback fired before the modal is entering.
   */
  onEnter?: Function,
  /**
   * Callback fired when the modal is entering.
   */
  onEntering?: Function,
  /**
   * Callback fired when the modal has entered.
   */
  onEntered?: Function, // eslint-disable-line react/sort-prop-types
  /**
   * Callback fires when the escape key is pressed and the modal is in focus.
   */
  onEscapeKeyUp?: Function, // eslint-disable-line react/sort-prop-types
  /**
   * Callback fired before the modal is exiting.
   */
  onExit?: Function,
  /**
   * Callback fired when the modal is exiting.
   */
  onExiting?: Function,
  /**
   * Callback fired when the modal has exited.
   */
  onExited?: Function, // eslint-disable-line react/sort-prop-types
  /**
   * Callback fired when the modal requests to be closed.
   */
  onRequestClose?: Function,
  /**
   * If `true`, the Modal is visible.
   */
  show?: boolean,
};

type State = {
  exited: boolean,
};

class Modal extends Component<DefaultProps, Props, State> {
  props: Props;

  static defaultProps: DefaultProps = {
    backdropComponent: Backdrop,
    backdropTransitionDuration: 300,
    backdropInvisible: false,
    keepMounted: false,
    disableBackdrop: false,
    ignoreBackdropClick: false,
    ignoreEscapeKeyUp: false,
    modalManager,
    show: false,
  };

  state: State = {
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
  onDocumentKeyUpListener = null;
  onFocusListener = null;

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
        warning(
          false,
          'Material-UI: The modal content node does not accept focus. ' +
            'For the benefit of assistive technologies, ' +
            'the tabIndex of the node is being set to "-1".',
        );
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

    if (modalContent && modalContent !== currentFocus && !contains(modalContent, currentFocus)) {
      modalContent.focus();
    }
  };

  handleDocumentKeyUp = (event: Event) => {
    if (!this.mounted || !this.props.modalManager.isTopModal(this)) {
      return;
    }

    if (keycode(event) === 'esc') {
      const { onEscapeKeyUp, onRequestClose, ignoreEscapeKeyUp } = this.props;

      if (onEscapeKeyUp) {
        onEscapeKeyUp(event);
      }

      if (onRequestClose && !ignoreEscapeKeyUp) {
        onRequestClose(event);
      }
    }
  };

  handleBackdropClick = (event: Event) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    const { onBackdropClick, onRequestClose, ignoreBackdropClick } = this.props;

    if (onBackdropClick) {
      onBackdropClick(event);
    }

    if (onRequestClose && !ignoreBackdropClick) {
      onRequestClose(event);
    }
  };

  handleTransitionExited = (...args) => {
    if (this.props.onExited) {
      this.props.onExited(...args);
    }

    this.setState({ exited: true });
    this.handleHide();
  };

  renderBackdrop(other: { [key: string]: any } = {}) {
    const {
      backdropComponent: BackdropComponent,
      backdropClassName,
      backdropTransitionDuration,
      backdropInvisible,
      show,
    } = this.props;

    return (
      <Fade
        in={show}
        transitionAppear
        enterTransitionDuration={backdropTransitionDuration}
        leaveTransitionDuration={backdropTransitionDuration}
        timeout={backdropTransitionDuration + 20}
        {...other}
      >
        <BackdropComponent
          invisible={backdropInvisible}
          className={backdropClassName}
          onClick={this.handleBackdropClick}
        />
      </Fade>
    );
  }

  render() {
    const {
      disableBackdrop,
      backdropComponent,
      backdropClassName,
      backdropTransitionDuration,
      backdropInvisible,
      ignoreBackdropClick,
      ignoreEscapeKeyUp,
      children,
      classes,
      className,
      keepMounted,
      modalManager: modalManagerProp,
      onBackdropClick,
      onEscapeKeyUp,
      onRequestClose,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
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
      childProps.tabIndex = tabIndex == null ? '-1' : tabIndex;
    }

    let backdropProps;

    if (backdropInvisible && modalChild.props.hasOwnProperty('in')) {
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
          this.mountNode = node ? node.getLayer() : node;
        }}
      >
        <div
          data-mui-test="Modal"
          className={classNames(classes.root, className, {
            [classes.hidden]: !show,
          })}
          ref={node => {
            this.modal = node;
          }}
          {...other}
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

export default withStyles(styleSheet)(Modal);
