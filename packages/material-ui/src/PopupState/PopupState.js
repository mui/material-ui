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
   * The render function.  It will be called with a single object with the
   * following properties:
   * - `open(eventOrAnchorEl)` - calling this will open the popup
   * - `close()` - calling this will close the popup
   * - `isOpen` - `true`/`false` if the menu is open/clpopup
   * - `bindTrigger` - a set of properties to pass to the popup trigger, including
   *   an `onClick` property that will open the popup
   * - `bindPopup` - a set of properties to pass to the popup component
   */
  children: PropTypes.func.isRequired,
  /**
   * The `id` property to use for the popup.  Will be passed to the render
   * function as `bindPopup.id`, and also used for the `aria-owns` property
   * passed to the trigger component via `bindTrigger`.
   */
  popupId: PropTypes.string,
};
