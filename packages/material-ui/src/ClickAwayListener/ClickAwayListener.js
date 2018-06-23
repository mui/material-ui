// @inheritedComponent EventListener

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import EventListener from 'react-event-listener';
import ownerDocument from '../utils/ownerDocument';

/**
 * Listen for click events that occur somewhere in the document, outside of the element itself.
 * For instance, if you need to hide a menu when people click anywhere else on your page.
 */
class ClickAwayListener extends React.Component {
  componentDidMount() {
    this.node = ReactDOM.findDOMNode(this);
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  node = null;
  mounted = null;

  handleClickAway = event => {
    // Ignore events that have been `event.preventDefault()` marked.
    if (event.defaultPrevented) {
      return;
    }

    // IE11 support, which trigger the handleClickAway even after the unbind
    if (!this.mounted) {
      return;
    }

    // The child might render null.
    if (!this.node) {
      return;
    }

    const doc = ownerDocument(this.node);

    if (
      doc.documentElement &&
      doc.documentElement.contains(event.target) &&
      !this.node.contains(event.target)
    ) {
      this.props.onClickAway(event);
    }
  };

  render() {
    const { children, mouseEvent, touchEvent, onClickAway, ...other } = this.props;
    const listenerProps = {};
    if (mouseEvent !== false) {
      listenerProps[mouseEvent] = this.handleClickAway;
    }
    if (touchEvent !== false) {
      listenerProps[touchEvent] = this.handleClickAway;
    }

    return (
      <EventListener target="document" {...listenerProps} {...other}>
        {children}
      </EventListener>
    );
  }
}

ClickAwayListener.propTypes = {
  children: PropTypes.node.isRequired,
  mouseEvent: PropTypes.oneOf(['onClick', 'onMouseDown', 'onMouseUp', false]),
  onClickAway: PropTypes.func.isRequired,
  touchEvent: PropTypes.oneOf(['onTouchStart', 'onTouchEnd', false]),
};

ClickAwayListener.defaultProps = {
  mouseEvent: 'onMouseUp',
  touchEvent: 'onTouchEnd',
};

export default ClickAwayListener;
