import * as React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import exactProp from '../utils/exactProp';

/**
 * Creates props for a component that opens the popup when clicked.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function bindTrigger({ isOpen, open, popupId }) {
  return {
    'aria-owns': isOpen ? popupId : null,
    'aria-haspopup': true,
    onClick: open,
  };
}

/**
 * Creates props for a component that toggles the popup when clicked.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function bindToggle({ isOpen, toggle, popupId }) {
  return {
    'aria-owns': isOpen ? popupId : null,
    'aria-haspopup': true,
    onClick: toggle,
  };
}

/**
 * Creates props for a component that opens the popup while hovered.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function bindHover({ isOpen, open, close, popupId }) {
  return {
    'aria-owns': isOpen ? popupId : null,
    'aria-haspopup': true,
    onMouseEnter: open,
    onMouseLeave: close,
  };
}

/**
 * Creates props for a `Popover` component.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function bindPopover({ isOpen, anchorEl, close, popupId }) {
  return {
    id: popupId,
    anchorEl,
    open: isOpen,
    onClose: close,
  };
}

/**
 * Creates props for a `Menu` component.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export const bindMenu = bindPopover;

/**
 * Creates props for a `Popper` component.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function bindPopper({ isOpen, anchorEl, popupId }) {
  return {
    id: popupId,
    anchorEl,
    open: isOpen,
  };
}

export default class PopupState extends React.Component {
  state = { anchorEl: null };

  handleToggle = eventOrAnchorEl => {
    if (this.state.anchorEl) this.handleClose();
    else this.handleOpen(eventOrAnchorEl);
  };

  handleOpen = eventOrAnchorEl => {
    warning(eventOrAnchorEl || eventOrAnchorEl.target, 'eventOrAnchorEl should be defined');
    this.setState({
      anchorEl:
        eventOrAnchorEl && eventOrAnchorEl.target ? eventOrAnchorEl.target : eventOrAnchorEl,
    });
  };

  handleClose = () => this.setState({ anchorEl: null });

  handleSetOpen = (open, eventOrAnchorEl) => {
    if (open) this.handleOpen(eventOrAnchorEl);
    else this.handleClose();
  };

  render() {
    const { children, popupId } = this.props;
    const { anchorEl } = this.state;

    const isOpen = Boolean(anchorEl);

    return children({
      open: this.handleOpen,
      close: this.handleClose,
      toggle: this.handleToggle,
      setOpen: this.handleSetOpen,
      isOpen,
      anchorEl,
      popupId,
    });
  }
}

PopupState.propTypes = {
  /**
   * The render function.
   *
   * @param {object} props the properties injected by `PopupState`:
   * <ul>
   *   <li>`open(eventOrAnchorEl)`: opens the popup</li>
   *   <li>`close()`: closes the popup</li>
   *   <li>`toggle(eventOrAnchorEl)`: opens the popup if it is closed, or
   *     closes the popup if it is open.
   *   </li>
   *   <li>`setOpen(open, [eventOrAnchorEl])`: sets whether the popup is open.
   *     `eventOrAnchorEl` is required if `open` is truthy.
   *   </li>
   *   <li>`isOpen`: `true`/`false` if the popup is open/closed</li>
   *   <li>`anchorEl`: the current anchor element (`null` the popup is closed)</li>
   *   <li>`popupId`: the `popupId` prop you passed</li>
   * </ul>
   *
   * @returns {React.Node} the content to display
   */
  children: PropTypes.func.isRequired,
  /**
   * The `id` property to use for the popup.  Will be passed to the render
   * function as `bindPopup.id`, and also used for the `aria-owns` property
   * passed to the trigger component via `bindTrigger`.
   */
  popupId: PropTypes.string,
};

PopupState.propTypes = exactProp(PopupState.propTypes);
