// @inheritedComponent EventListener

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import EventListener from 'react-event-listener';
import ownerDocument from 'dom-helpers/ownerDocument';

const isDescendant = (el, target) => {
  if (target !== null && target.parentNode) {
    return el === target || isDescendant(el, target.parentNode);
  }
  return false;
};

/**
 * Listen for click events that are triggered outside of the component children.
 */
class ClickAwayListener extends React.Component {
  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  mounted = false;

  handleClickAway = event => {
    // Ignore events that have been `event.preventDefault()` marked.
    if (event.defaultPrevented) {
      return;
    }

    // IE11 support, which trigger the handleClickAway even after the unbind
    if (!this.mounted) {
      return;
    }

    const el = ReactDOM.findDOMNode(this);
    const doc = ownerDocument(el);

    if (
      doc.documentElement &&
      doc.documentElement.contains(event.target) &&
      !isDescendant(el, event.target)
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
