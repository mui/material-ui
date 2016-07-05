// @flow
import React, {Component, Element, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {createStyleSheet} from 'stylishly';
import ClassNames from 'classnames';
import warning from 'warning';
import canUseDom from 'dom-helpers/util/inDOM';
import contains from 'dom-helpers/query/contains';
import activeElement from 'dom-helpers/activeElement';
import ownerDocument from 'dom-helpers/ownerDocument';
import {createModalManager} from './modalManager';
import Backdrop from './Backdrop';
import Portal from './Portal';
import Fade from '../transitions/Fade';
import addEventListener from '../utils/addEventListener';
import coerce from '../utils/coerce';

// Modals don't open on the server
// so this won't break concurrency
// ...........Could also put this on context....
const modalManager = createModalManager();

export const styleSheet = createStyleSheet('Modal', (theme) => {
  return {
    modal: {
      display: 'flex',
      width: '100%',
      height: '100%',
      position: 'fixed',
      zIndex: theme.zIndex.dialog,
      top: 0,
      left: 0,
    },
  };
});

type DefaultProps = {
  backdrop: boolean,
  backdropComponent: Function,
  modalManager: Object,
  show: boolean,
};

type Props = {
  /**
   * Set to false to disable the backdrop, or true to enable it.
   */
  backdrop: boolean,
  /**
   * Pass a component class to use as the backdrop.
   */
  backdropComponent: Function,
  /**
   * Can be used, for instance, to render a letter inside the avatar.
   */
  children?: Element<any>,
  /**
   * The CSS class name of the root element.
   */
  className?: string,
  modalManager: Object,
  onBackdropClick?: Function,
  /**
   * Callback fired before the modal is entering
   */
  onEnter?: Function,
  /**
   * Callback fired when the modal is entering
   */
  onEntering?: Function,
  /**
   * Callback fired when the modal has entered
   */
  onEntered?: Function, // eslint-disable-line react/sort-prop-types
  /**
   * Callback fired before the modal is exiting
   */
  onExit?: Function,
  /**
   * Callback fired when the modal is exiting
   */
  onExiting?: Function,
  /**
   * Callback fired when the modal has exited
   */
  onExited?: Function, // eslint-disable-line react/sort-prop-types
  /**
   * Callback fired when the modal requests to be closed
   */
  onRequestClose?: Function,
  show: boolean,
};

type State = {
  exited: boolean,
}

export default class Modal extends Component<DefaultProps, Props, State> {
  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  static defaultProps:DefaultProps = {
    backdrop: true,
    backdropComponent: Backdrop,
    modalManager: modalManager,
    show: false,
  };
 
  state:State = {
    exited: false,
  };

  componentWillMount() {
    if (!this.props.show) {
      this.setState({exited: true});
    }
  }

  componentDidMount() {
    this.mounted = true;
    if (this.props.show === true) {
      this.handleShow();
    }
  }

  componentWillReceiveProps(nextProps:Props) {
    if (nextProps.show && this.state.exited) {
      this.setState({exited: false});
    }
  }

  componentWillUpdate(nextProps:Props) {
    if (!this.props.show && nextProps.show) {
      this.checkForFocus();
    }
  }

  componentDidUpdate(prevProps:Props) {
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

  lastFocus:?HTMLElement;
  mounted:boolean
  modal:HTMLElement;
  mountNode:Portal|HTMLElement;
  onDocumentKeyUpListener:RemoveEventListener;
  onFocusListener:RemoveEventListener;
  props:Props;

  checkForFocus() {
    if (canUseDom) {
      this.lastFocus = activeElement();
    }
  }

  focus() {
    const currentFocus = activeElement(ownerDocument(ReactDOM.findDOMNode(this)));
    const modalContent = this.modal && coerce(this.modal.lastChild, Element);
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

  handleFocusListener:Callback = () => {
    if (!this.mounted || !this.props.modalManager.isTopModal(this)) {
      return;
    }

    const currentFocus = activeElement(ownerDocument(ReactDOM.findDOMNode(this)));
    const modalContent = this.modal && coerce(this.modal.lastChild, Element);

    if (modalContent && modalContent !== currentFocus && !contains(modalContent, currentFocus)) {
      modalContent.focus();
    }
  };

  handleDocumentKeyUp:EventListener = () => {
    // if (this.props.keyboard && event.keyCode === 27 && this.props.modalManager.isTopModal(this)) {
    //   if (this.props.onEscapeKeyUp) {
    //     this.props.onEscapeKeyUp(event);
    //   }
    //   this.props.onHide();
    // }
  };

  handleBackdropClick:EventListener = (event) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (this.props.onBackdropClick) {
      this.props.onBackdropClick(event);
    }

    if (this.props.onRequestClose && !event.isPropagationStopped()) {
      this.props.onRequestClose(event);
    }
  };

  handleBackdropExited:TransitionHandler = (...args) => {
    this.setState({exited: true});
    this.handleHide();
    if (this.props.onExited) {
      this.props.onExited(element);
    }
  };

  renderBackdrop(backdrop, backdropComponent, show): Element<any> {
    if (!backdrop) {
      return null;
    }

    return (
      <Fade
        in={show}
        transitionAppear={true}
        onEnter={this.props.onEnter}
        onEntering={this.props.onEntering}
        onEntered={this.props.onEntered}
        onExit={this.props.onExit}
        onExiting={this.props.onExiting}
        onExited={this.handleBackdropExited}
      >
        {React.createElement(backdropComponent, {onClick: this.handleBackdropClick})}
      </Fade>
    );
  }

  render(): Element<any> {
    const {
      backdrop,
      backdropComponent,
      children,
      className,
      modalManager: modalManagerProp, // eslint-disable-line no-unused-vars
      onRequestClose, // eslint-disable-line no-unused-vars
      show,
      ...other,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet, {group: 'mui'});
    const mount = show || !this.state.exited;

    if (!mount) {
      return null;
    }

    let modalChild = React.Children.only(children);

    const {role, tabIndex} = modalChild.props;

    if (role === undefined || tabIndex === undefined) {
      modalChild = React.cloneElement(modalChild, {
        role: role === undefined ? 'document' : role,
        tabIndex: tabIndex == null ? '-1' : tabIndex,
      });
    }

    return (
      <Portal open={true} ref={(c) => this.mountNode = c ? c.getLayer() : c}>
        <div
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
