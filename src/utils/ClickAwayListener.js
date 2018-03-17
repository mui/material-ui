import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
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
    if (this.mounted) {
      const el = findDOMNode(this);
      const doc = ownerDocument(el);

      if (
        doc.documentElement &&
        doc.documentElement.contains(event.target) &&
        !isDescendant(el, event.target)
      ) {
        this.props.onClickAway(event);
      }
    }
  };

  render() {
    const { mouseEvent, touchEvent } = this.props;
    const listenerProps = { target: 'document' };
    if (mouseEvent !== false) listenerProps[mouseEvent] = this.handleClickAway;
    if (touchEvent !== false) listenerProps[touchEvent] = this.handleClickAway;

    return <EventListener {...listenerProps}>{this.props.children}</EventListener>;
  }
}

ClickAwayListener.propTypes = {
  children: PropTypes.node.isRequired,
  mouseEvent: PropTypes.oneOf(['onClick', 'onMouseDown', 'onMouseUp', false]).isRequired,
  onClickAway: PropTypes.func.isRequired,
  touchEvent: PropTypes.oneOf(['onTouchStart', 'onTouchEnd', false]).isRequired,
};

ClickAwayListener.defaultProps = {
  mouseEvent: 'onMouseup',
  touchEvent: 'onTouchend',
};

export default ClickAwayListener;
