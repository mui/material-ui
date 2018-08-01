import * as React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import exactProp from '../utils/exactProp';

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
    const { children, popupId, variant } = this.props;
    const { anchorEl } = this.state;

    const isOpen = Boolean(anchorEl);

    const bindPopup = {
      id: popupId,
      anchorEl,
      open: isOpen,
    };
    if (variant !== 'popper') bindPopup.onClose = this.handleClose;

    return children({
      open: this.handleOpen,
      close: this.handleClose,
      toggle: this.handleToggle,
      setOpen: this.handleSetOpen,
      isOpen,
      bindTrigger: {
        'aria-owns': isOpen ? popupId : null,
        'aria-haspopup': true,
        onClick: this.handleOpen,
      },
      bindToggle: {
        'aria-owns': isOpen ? popupId : null,
        'aria-haspopup': true,
        onClick: this.handleToggle,
      },
      bindPopup,
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
   *   <li>`bindTrigger`: properties to pass to a trigger component
   *     <ul>
   *       <li>`aria-owns`: the `popupId` you passed to `PopupState` (when the popup is open)</li>
   *       <li>`aria-haspopup`: true</li>
   *       <li>`onClick(event)`: opens the popup</li>
   *     </ul>
   *   </li>
   *   <li>`bindToggle`: properties to pass to a toggle component
   *     <ul>
   *       <li>`aria-owns`: the `popupId` you passed to `PopupState` (when the popup is open)</li>
   *       <li>`aria-haspopup`: true</li>
   *       <li>`onClick(event)`: toggles the popup</li>
   *     </ul>
   *   </li>
   *   <li>`bindPopup`: properties to pass to the popup component
   *     <ul>
   *       <li>`id`: the `popupId` you passed to `PopupState`</li>
   *       <li>`anchorEl`: the trigger element (when the popup is open)</li>
   *       <li>`open`: `true`/`false` if the popup is open/closed</li>
   *       <li>`onClose()`: closes the popup (`"menu"` and `"popover"` variants only)</li>
   *     </ul>
   *   </li>
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
  /**
   * The type of popup you are controlling.
   */
  variant: PropTypes.oneOf(['menu', 'popover', 'popper']).isRequired,
};

PopupState.propTypes = exactProp(PopupState.propTypes);
