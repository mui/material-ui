import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import warning from 'warning';
import { componentPropType } from '@material-ui/utils';
import ownerDocument from '../utils/ownerDocument';
import RootRef from '../RootRef';
import Portal from '../Portal';
import { createChainedFunction } from '../utils/helpers';
import withStyles from '../styles/withStyles';
import ModalManager from './ModalManager';
import Backdrop from '../Backdrop';
import { ariaHidden } from './manageAriaHidden';

function getContainer(container, defaultContainer) {
  container = typeof container === 'function' ? container() : container;
  return ReactDOM.findDOMNode(container) || defaultContainer;
}

function getHasTransition(props) {
  return props.children ? props.children.props.hasOwnProperty('in') : false;
}

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    position: 'fixed',
    zIndex: theme.zIndex.modal,
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
  },
  /* Styles applied to the root element if the `Modal` has exited. */
  hidden: {
    visibility: 'hidden',
  },
});

/**
 * Modal is a lower-level construct that is leveraged by the following components:
 *
 * - [Dialog](/api/dialog/)
 * - [Drawer](/api/drawer/)
 * - [Menu](/api/menu/)
 * - [Popover](/api/popover/)
 *
 * If you are creating a modal dialog, you probably want to use the [Dialog](/api/dialog/) component
 * rather than directly using Modal.
 *
 * This component shares many concepts with [react-overlays](https://react-bootstrap.github.io/react-overlays/#modals).
 */
class Modal extends React.Component {
  mounted = false;

  constructor(props) {
    super();
    this.state = {
      exited: !props.open,
    };
  }

  componentDidMount() {
    this.mounted = true;
    if (this.props.open) {
      this.handleOpen();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.open && !this.props.open) {
      this.handleClose();
    } else if (!prevProps.open && this.props.open) {
      this.lastFocus = ownerDocument(this.mountNode).activeElement;
      this.handleOpen();
    }
  }

  componentWillUnmount() {
    this.mounted = false;

    if (this.props.open || (getHasTransition(this.props) && !this.state.exited)) {
      this.handleClose('unmount');
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.open) {
      return {
        exited: false,
      };
    }

    if (!getHasTransition(nextProps)) {
      // Otherwise let handleExited take care of marking exited.
      return {
        exited: true,
      };
    }

    return null;
  }

  handleOpen = () => {
    const doc = ownerDocument(this.mountNode);
    const container = getContainer(this.props.container, doc.body);

    this.props.manager.add(this, container);
    doc.addEventListener('focus', this.enforceFocus, true);

    if (this.dialogRef) {
      this.handleOpened();
    }
  };

  handleRendered = () => {
    if (this.props.onRendered) {
      this.props.onRendered();
    }

    if (this.props.open) {
      this.handleOpened();
    } else {
      ariaHidden(this.modalRef, true);
    }
  };

  handleOpened = () => {
    this.autoFocus();
    this.props.manager.mount(this);

    // Fix a bug on Chrome where the scroll isn't initially 0.
    this.modalRef.scrollTop = 0;
  };

  handleClose = reason => {
    const hasTransition = getHasTransition(this.props);
    /* If the component does not have a transition or is unmounting remove the Modal
    otherwise let the transition handle removing the style, this prevents elements
    moving around when the Modal is closed. */
    if (!(hasTransition && this.props.closeAfterTransition) || reason === 'unmount') {
      this.props.manager.remove(this);
    }

    const doc = ownerDocument(this.mountNode);
    doc.removeEventListener('focus', this.enforceFocus, true);

    this.restoreLastFocus();
  };

  handleExited = () => {
    if (this.props.closeAfterTransition) {
      this.props.manager.remove(this);
    }
    this.setState({ exited: true });
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

  handleKeyDown = event => {
    // event.defaultPrevented:
    //
    // Ignore events that have been `event.preventDefault()` marked.
    // preventDefault() is meant to stop default behaviours like
    // clicking a checkbox to check it, hitting a button to submit a form,
    // and hitting left arrow to move the cursor in a text input etc.
    // Only special HTML elements have these default bahaviours.
    //
    // To remove in v4.
    if (event.key !== 'Escape' || !this.isTopModal() || event.defaultPrevented) {
      return;
    }

    // Swallow the event, in case someone is listening for the escape key on the body.
    event.stopPropagation();

    if (this.props.onEscapeKeyDown) {
      this.props.onEscapeKeyDown(event);
    }

    if (!this.props.disableEscapeKeyDown && this.props.onClose) {
      this.props.onClose(event, 'escapeKeyDown');
    }
  };

  enforceFocus = () => {
    // The Modal might not already be mounted.
    if (!this.isTopModal() || this.props.disableEnforceFocus || !this.mounted || !this.dialogRef) {
      return;
    }

    const currentActiveElement = ownerDocument(this.mountNode).activeElement;

    if (!this.dialogRef.contains(currentActiveElement)) {
      this.dialogRef.focus();
    }
  };

  handlePortalRef = ref => {
    this.mountNode = ref ? ref.getMountNode() : ref;
  };

  handleModalRef = ref => {
    this.modalRef = ref;
  };

  onRootRef = ref => {
    this.dialogRef = ref;
  };

  autoFocus() {
    // We might render an empty child.
    if (this.props.disableAutoFocus || !this.dialogRef) {
      return;
    }

    const currentActiveElement = ownerDocument(this.mountNode).activeElement;

    if (!this.dialogRef.contains(currentActiveElement)) {
      if (!this.dialogRef.hasAttribute('tabIndex')) {
        warning(
          false,
          [
            'Material-UI: the modal content node does not accept focus.',
            'For the benefit of assistive technologies, ' +
              'the tabIndex of the node is being set to "-1".',
          ].join('\n'),
        );
        this.dialogRef.setAttribute('tabIndex', -1);
      }

      this.lastFocus = currentActiveElement;
      this.dialogRef.focus();
    }
  }

  restoreLastFocus() {
    if (this.props.disableRestoreFocus || !this.lastFocus) {
      return;
    }

    // Not all elements in IE 11 have a focus method.
    // Because IE 11 market share is low, we accept the restore focus being broken
    // and we silent the issue.
    if (this.lastFocus.focus) {
      this.lastFocus.focus();
    }

    this.lastFocus = null;
  }

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
      closeAfterTransition,
      container,
      disableAutoFocus,
      disableBackdropClick,
      disableEnforceFocus,
      disableEscapeKeyDown,
      disablePortal,
      disableRestoreFocus,
      hideBackdrop,
      keepMounted,
      manager,
      onBackdropClick,
      onClose,
      onEscapeKeyDown,
      onRendered,
      open,
      ...other
    } = this.props;
    const { exited } = this.state;
    const hasTransition = getHasTransition(this.props);

    if (!keepMounted && !open && (!hasTransition || exited)) {
      return null;
    }

    const childProps = {};

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
        ref={this.handlePortalRef}
        container={container}
        disablePortal={disablePortal}
        onRendered={this.handleRendered}
      >
        {/*
          Marking an element with the role presentation indicates to assistive technology
          that this element should be ignored; it exists to support the web application and
          is not meant for humans to interact with directly.
          https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md
        */}
        <div
          data-mui-test="Modal"
          ref={this.handleModalRef}
          onKeyDown={this.handleKeyDown}
          role="presentation"
          className={clsx(classes.root, className, {
            [classes.hidden]: exited,
          })}
          {...other}
        >
          {hideBackdrop ? null : (
            <BackdropComponent open={open} onClick={this.handleBackdropClick} {...BackdropProps} />
          )}
          <RootRef rootRef={this.onRootRef}>{React.cloneElement(children, childProps)}</RootRef>
        </div>
      </Portal>
    );
  }
}

Modal.propTypes = {
  /**
   * A backdrop component. This property enables custom backdrop rendering.
   */
  BackdropComponent: componentPropType,
  /**
   * Properties applied to the [`Backdrop`](/api/backdrop/) element.
   */
  BackdropProps: PropTypes.object,
  /**
   * A single child content element.
   */
  children: PropTypes.element,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * When set to true the Modal waits until a nested Transition is completed before closing.
   */
  closeAfterTransition: PropTypes.bool,
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
   * Disable the portal behavior.
   * The children stay within it's parent DOM hierarchy.
   */
  disablePortal: PropTypes.bool,
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
   * @ignore
   *
   * A modal manager used to track and manage the state of open
   * Modals. This enables customizing how modals interact within a container.
   */
  manager: PropTypes.object,
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
  BackdropComponent: Backdrop,
  closeAfterTransition: false,
  disableAutoFocus: false,
  disableBackdropClick: false,
  disableEnforceFocus: false,
  disableEscapeKeyDown: false,
  disablePortal: false,
  disableRestoreFocus: false,
  hideBackdrop: false,
  keepMounted: false,
  // Modals don't open on the server so this won't conflict with concurrent requests.
  manager: new ModalManager(),
};

export default withStyles(styles, { flip: false, name: 'MuiModal' })(Modal);
