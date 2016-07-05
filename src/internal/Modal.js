// @flow
import React, {Component, Element} from 'react';
import ReactDOM from 'react-dom';
import {createStyleSheet} from 'stylishly';
import ClassNames from 'classnames';
import warning from 'warning';
import canUseDom from 'dom-helpers/util/inDOM';
import contains from 'dom-helpers/query/contains';
import activeElement from 'dom-helpers/activeElement';
import ownerDocument from 'dom-helpers/ownerDocument';
import {createModalManager} from './modalManager';
import Overlay from './Overlay';
import Portal from './Portal';
import Fade from '../internal/transitions/Fade';
import addEventListener from '../utils/addEventListener';
import coerce from '../utils/coerce';

// Modals don't open on the server
// so this won't break concurrency
// ...........Could also put this on context....
// TODO: refactor #createModalManager into a type-checked class
declare class ModalManager{
  add(modal:Modal):void;
  remove(modal:Modal):void;
  isTopModal(modal:Modal):boolean;
}

const modalManager:ModalManager = createModalManager();

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
  modalManager: ModalManager,
  show: boolean,
}

type Props = {
  /**
   * Can be used, for instance, to render a letter inside the avatar.
   */
  children?: Object,
  /**
   * The CSS class name of the root element.
   */
  className?: string,
  modalManager: ModalManager,
  /**
   * Callback fired after the Modal finishes transitioning out
   */
  onExited?: TransitionHandler,
  onOverlayClick?: TransitionHandler,
  onRequestClose?: TransitionHandler,
  show: boolean,
};

type State = {
  exited: boolean,
}

export default class Modal extends Component<DefaultProps, Props, State> {
  static contextTypes = {
    styleManager: Object,
  };

  static defaultProps = {
    modalManager: modalManager,
    show: false,
  }

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
    const modalContent = coerce(this.modal && this.modal.lastChild, Element);
    const focusInModal = currentFocus && contains(modalContent, currentFocus);

    if (modalContent && !focusInModal) {
      this.lastFocus = currentFocus;

      if (!modalContent.hasAttribute('tabIndex')) {
        modalContent.setAttribute('tabIndex', -1);
        warning(false,
          'The modal content node does not accept focus. ' +
          'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".');
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
    const modalContent = coerce(this.modal && this.modal.lastChild, Element);

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

  handleOverlayClick:EventListener = (event) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    // if (this.props.onOverlayClick) {
    //   this.props.onOverlayClick(event);
    // }

    if (this.props.onRequestClose) {
      this.props.onRequestClose(event);
    }
  };

  handleOverlayExited:TransitionHandler = (element) => {
    this.setState({exited: true});
    this.handleHide();
    if (this.props.onExited) {
      this.props.onExited(element);
    }
  };

  render():?Element {
    const {
      children,
      className,
      modalManager, // eslint-disable-line no-unused-vars
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
          <Fade
            in={show}
            transitionAppear={true}
            onExited={this.handleOverlayExited}
          >
            <Overlay onClick={this.handleOverlayClick} />
          </Fade>
          {modalChild}
        </div>
      </Portal>
    );
  }
}
