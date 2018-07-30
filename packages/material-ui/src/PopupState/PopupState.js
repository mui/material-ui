import * as React from 'react';
import PropTypes from 'prop-types';

export default class PopupState extends React.Component {
  state = { anchorEl: null };

  handleOpen = eventOrAnchorEl =>
    this.setState({
      anchorEl:
        eventOrAnchorEl && eventOrAnchorEl.target ? eventOrAnchorEl.target : eventOrAnchorEl,
    });

  handleClose = () => this.setState({ anchorEl: null });

  render() {
    const { popupId, children } = this.props;
    const { anchorEl } = this.state;

    const isOpen = Boolean(anchorEl);

    return children({
      open: this.handleOpen,
      close: this.handleClose,
      isOpen,
      bindTrigger: {
        'aria-owns': isOpen ? popupId : null,
        'aria-haspopup': true,
        onClick: this.handleOpen,
      },
      bindPopup: {
        id: popupId,
        anchorEl,
        open: isOpen,
        onClose: this.handleClose,
      },
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
   *   <li>`isOpen`: `true`/`false` if the popup is open/closed</li>
   *   <li>`bindTrigger`: properties to pass to the trigger component
   *     <ul>
   *       <li>`aria-owns`: the `popupId` you passed to `PopupState` (when the popup is open)</li>
   *       <li>`aria-haspopup`: true</li>
   *       <li>`onClick()`: opens the popup</li>
   *     </ul>
   *   </li>
   *   <li>`bindPopup`: properties to pass to the popup component
   *     <ul>
   *       <li>`id`: the `popupId` you passed to `PopupState`</li>
   *       <li>`anchorEl`: the trigger element (when the popup is open)</li>
   *       <li>`open`: `true`/`false` if the popup is open/closed</li>
   *       <li>`onClose()`: closes the popup</li>
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
};
