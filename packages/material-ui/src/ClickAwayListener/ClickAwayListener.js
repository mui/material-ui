// @inheritedComponent EventListener

import React from 'react';
import PropTypes from 'prop-types';
import EventListener from 'react-event-listener';
import ownerDocument from '../utils/ownerDocument';

/**
 * Listen for click events that occur somewhere in the document, outside of the element itself.
 * For instance, if you need to hide a menu when people click anywhere else on your page.
 */
class ClickAwayListener extends React.Component {
  mounted = false;

  moved = false;

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleClickAway = event => {
    // Ignore events that have been `event.preventDefault()` marked.
    if (event.defaultPrevented) {
      return;
    }

    // IE 11 support, which trigger the handleClickAway even after the unbind
    if (!this.mounted) {
      return;
    }

    // Do not act if user performed touchmove
    if (this.moved) {
      this.moved = false;
      return;
    }

    const node = this.props.getTargetEl();
    // The child might render null.
    if (!node) {
      return;
    }

    const doc = ownerDocument(node);

    if (
      doc.documentElement &&
      doc.documentElement.contains(event.target) &&
      !node.contains(event.target)
    ) {
      this.props.onClickAway(event);
    }
  };

  handleTouchMove = () => {
    this.moved = true;
  };

  render() {
    const { children, getTargetEl, mouseEvent, touchEvent, onClickAway, ...other } = this.props;
    const listenerProps = {};
    if (mouseEvent !== false) {
      listenerProps[mouseEvent] = this.handleClickAway;
    }
    if (touchEvent !== false) {
      listenerProps[touchEvent] = this.handleClickAway;
      listenerProps.onTouchMove = this.handleTouchMove;
    }

    return (
      <React.Fragment>
        {children}
        <EventListener target="document" {...listenerProps} {...other} />
      </React.Fragment>
    );
  }
}

ClickAwayListener.propTypes = {
  /**
   * @deprecated
   */
  children: PropTypes.node,
  /**
   * A function that must return the `Element` (once it is mounted) that should not be considered
   * in click-away.
   */
  getTargetEl: PropTypes.func.isRequired,
  /**
   * The mouse event to listen to. You can disable the listener by providing `false`.
   */
  mouseEvent: PropTypes.oneOf(['onClick', 'onMouseDown', 'onMouseUp', false]),
  /**
   * Callback fired when a "click away" event is detected.
   */
  onClickAway: PropTypes.func.isRequired,
  /**
   * The touch event to listen to. You can disable the listener by providing `false`.
   */
  touchEvent: PropTypes.oneOf(['onTouchStart', 'onTouchEnd', false]),
};

ClickAwayListener.defaultProps = {
  mouseEvent: 'onMouseUp',
  touchEvent: 'onTouchEnd',
};

export default ClickAwayListener;
