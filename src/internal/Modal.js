import React, {Component, PropTypes} from 'react';
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

export default class Modal extends Component {

  static propTypes = {
    /**
     * Can be used, for instance, to render a letter inside the avatar.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    modalManager: PropTypes.object,
    /**
     * Callback fired after the Modal finishes transitioning out
     */
    onExited: React.PropTypes.func,
    onOverlayClick: PropTypes.func,
    onRequestClose: PropTypes.func,
    show: PropTypes.bool,
  };

  static defaultProps = {
    modalManager: modalManager,
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
      this.setState({exited: true});
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
      this.setState({exited: false});
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
    // if (this.props.keyboard && event.keyCode === 27 && this.props.modalManager.isTopModal(this)) {
    //   if (this.props.onEscapeKeyUp) {
    //     this.props.onEscapeKeyUp(event);
    //   }
    //   this.props.onHide();
    // }
  };

  handleOverlayClick = (event) => {
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

  handleOverlayExited = (...args) => {
    this.setState({exited: true});
    this.handleHide();
    if (this.props.onExited) {
      this.props.onExited(...args);
    }
  };

  render() {
    const {
      children,
      className,
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
