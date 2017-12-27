// @inheritedComponent Portal

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import warning from 'warning';
import keycode from 'keycode';
import activeElement from 'dom-helpers/activeElement';
import contains from 'dom-helpers/query/contains';
import inDOM from 'dom-helpers/util/inDOM';
import ownerDocument from 'dom-helpers/ownerDocument';
import RefHolder from '../internal/RefHolder';
import Portal from '../Portal';
import addEventListener from '../utils/addEventListener';
import { createChainedFunction } from '../utils/helpers';
import withStyles from '../styles/withStyles';
import ModalManager from './ModalManager';
import Backdrop from './Backdrop';

function getContainer(container, defaultContainer) {
  container = typeof container === 'function' ? container() : container;
  return ReactDOM.findDOMNode(container) || defaultContainer;
}

function getOwnerDocument(element) {
  return ownerDocument(ReactDOM.findDOMNode(element));
}

function getHasTransition(props) {
  return props.children ? props.children.props.hasOwnProperty('in') : false;
}

export const styles = theme => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
    position: 'fixed',
    zIndex: theme.zIndex.modal,
    top: 0,
    left: 0,
  },
  hidden: {
    visibility: 'hidden',
  },
});

class Modal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      exited: !this.props.open,
    };
  }

  componentDidMount() {
    this.mounted = true;
    if (this.props.open) {
      this.handleOpen();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open) {
      this.setState({ exited: false });
    } else if (!getHasTransition(nextProps)) {
      // Otherwise let handleExited take care of marking exited.
      this.setState({ exited: true });
    }
  }

  componentWillUpdate(nextProps) {
    if (!this.props.open && nextProps.open) {
      this.checkForFocus();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.open && !this.props.open && !getHasTransition(this.props)) {
      // Otherwise handleExited will call this.
      this.handleClose();
    } else if (!prevProps.open && this.props.open) {
      this.handleOpen();
    }
  }

  componentWillUnmount() {
    this.mounted = false;

    if (this.props.open || (getHasTransition(this.props) && !this.state.exited)) {
      this.handleClose();
    }
  }

  getDialogElement() {
    return ReactDOM.findDOMNode(this.dialogNode);
  }

  dialogNode = null;
  modalNode = null;
  mounted = false;
  mountNode = null;

  handleRendered = () => {
    this.autoFocus();

    if (this.props.onRendered) {
      this.props.onRendered();
    }
  };

  handleOpen = () => {
    const doc = getOwnerDocument(this);
    const container = getContainer(this.props.container, doc.body);

    this.props.manager.add(this, container);
    this.onDocumentKeydownListener = addEventListener(doc, 'keydown', this.handleDocumentKeyDown);
    this.onFocusinListener = addEventListener(document, 'focus', this.enforceFocus, true);
  };

  handleClose = () => {
    this.props.manager.remove(this);
    this.onDocumentKeydownListener.remove();
    this.onFocusinListener.remove();
    this.restoreLastFocus();
  };

  handleExited = () => {
    this.setState({ exited: true });
    this.handleClose();
  };

  handleBackdropClick = event => {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (this.props.onBackdropClick) {
      this.props.onBackdropClick(event);
    }

    if (!this.props.disableBackdropClick && this.props.onClose) {
      this.props.onClose(event, 'backdropClick');
    }
  };

  handleDocumentKeyDown = event => {
    if (!this.isTopModal() || keycode(event) !== 'esc') {
      return;
    }

    if (this.props.onEscapeKeyDown) {
      this.props.onEscapeKeyDown(event);
    }

    if (!this.props.disableEscapeKeyDown && this.props.onClose) {
      this.props.onClose(event, 'escapeKeyDown');
    }
  };

  checkForFocus = () => {
    if (inDOM) {
      this.lastFocus = activeElement();
    }
  };

  autoFocus() {
    if (this.props.disableAutoFocus) {
      return;
    }

    const dialogElement = this.getDialogElement();
    const currentActiveElement = activeElement(getOwnerDocument(this));

    if (dialogElement && !contains(dialogElement, currentActiveElement)) {
      this.lastFocus = currentActiveElement;

      if (!dialogElement.hasAttribute('tabIndex')) {
        warning(
          false,
          [
            'Material-UI: the modal content node does not accept focus.',
            'For the benefit of assistive technologies, ' +
              'the tabIndex of the node is being set to "-1".',
          ].join('\n'),
        );
        dialogElement.setAttribute('tabIndex', -1);
      }

      dialogElement.focus();
    }
  }

  restoreLastFocus() {
    if (this.props.disableRestoreFocus) {
      return;
    }

    if (this.lastFocus) {
      this.lastFocus.focus();
      this.lastFocus = null;
    }
  }

  enforceFocus = () => {
    if (this.props.disableEnforceFocus || !this.mounted || !this.isTopModal()) {
      return;
    }

    const dialogElement = this.getDialogElement();
    const currentActiveElement = activeElement(getOwnerDocument(this));

    if (dialogElement && !contains(dialogElement, currentActiveElement)) {
      dialogElement.focus();
    }
  };

  isTopModal() {
    return this.props.manager.isTopModal(this);
  }

  render() {
    const {
      BackdropComponent,
      BackdropProps,
      children,
      classes,
      className,
      container,
      disableAutoFocus,
      disableBackdropClick,
      disableEnforceFocus,
      disableEscapeKeyDown,
      disableRestoreFocus,
      hideBackdrop,
      keepMounted,
      onBackdropClick,
      onClose,
      onEscapeKeyDown,
      onRendered,
      open,
      manager,
      ...other
    } = this.props;
    const { exited } = this.state;
    const hasTransition = getHasTransition(this.props);
    const childProps = {};

    if (!keepMounted && !open && (!hasTransition || exited)) {
      return null;
    }

    // It's a Transition like component
    if (hasTransition) {
      childProps.onExited = createChainedFunction(this.handleExited, children.props.onExited);
    }

    if (children.props.role === undefined) {
      childProps.role = children.props.role || 'document';
    }

    if (children.props.tabIndex === undefined) {
      childProps.tabIndex = children.props.tabIndex || '-1';
    }

    return (
      <Portal
        ref={node => {
          this.mountNode = node ? node.getMountNode() : node;
        }}
        container={container}
        onRendered={this.handleRendered}
      >
        <div
          data-mui-test="Modal"
          ref={node => {
            this.modalNode = node;
          }}
          className={classNames(classes.root, className, {
            [classes.hidden]: exited,
          })}
          {...other}
        >
          {hideBackdrop ? null : (
            <BackdropComponent open={open} onClick={this.handleBackdropClick} {...BackdropProps} />
          )}
          <RefHolder
            ref={node => {
              this.dialogNode = node;
            }}
          >
            {React.cloneElement(children, childProps)}
          </RefHolder>
        </div>
      </Portal>
    );
  }
}

Modal.propTypes = {
  /**
   * A backdrop component. Useful for custom backdrop rendering.
   */
  BackdropComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * Properties applied to the `Backdrop` element.
   */
  BackdropProps: PropTypes.object,
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
   * A node, component instance, or function that returns either.
   * The `container` will have the portal children appended to it.
   */
  container: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  /**
   * If `true`, the modal will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any modal children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   */
  disableAutoFocus: PropTypes.bool,
  /**
   * If `true`, clicking the backdrop will not fire any callback.
   */
  disableBackdropClick: PropTypes.bool,
  /**
   * If `true`, the modal will not prevent focus from leaving the modal while open.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   */
  disableEnforceFocus: PropTypes.bool,
  /**
   * If `true`, hitting escape will not fire any callback.
   */
  disableEscapeKeyDown: PropTypes.bool,
  /**
   * If `true`, the modal will not restore focus to previously focused element once
   * modal is hidden.
   */
  disableRestoreFocus: PropTypes.bool,
  /**
   * If `true`, the backdrop is not rendered.
   */
  hideBackdrop: PropTypes.bool,
  /**
   * Always keep the children in the DOM.
   * This property can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Modal.
   */
  keepMounted: PropTypes.bool,
  /**
   * A modal manager used to track and manage the state of open
   * Modals. Useful when customizing how modals interact within a container.
   */
  manager: PropTypes.object.isRequired,
  /**
   * Callback fired when the backdrop is clicked.
   */
  onBackdropClick: PropTypes.func,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback
   * @param {string} reason Can be:`"escapeKeyDown"`, `"backdropClick"`
   */
  onClose: PropTypes.func,
  /**
   * Callback fired when the escape key is pressed,
   * `disableEscapeKeyDown` is false and the modal is in focus.
   */
  onEscapeKeyDown: PropTypes.func,
  /**
   * Callback fired once the children has been mounted into the `container`.
   * It signals that the `open={true}` property took effect.
   */
  onRendered: PropTypes.func,
  /**
   * If `true`, the modal is open.
   */
  open: PropTypes.bool.isRequired,
};

Modal.defaultProps = {
  disableAutoFocus: false,
  disableBackdropClick: false,
  disableEnforceFocus: false,
  disableEscapeKeyDown: false,
  disableRestoreFocus: false,
  hideBackdrop: false,
  keepMounted: false,
  // Modals don't open on the server so this won't conflict with concurrent requests.
  manager: new ModalManager(),
  BackdropComponent: Backdrop,
};

export default withStyles(styles, { flip: false, name: 'MuiModal' })(Modal);
