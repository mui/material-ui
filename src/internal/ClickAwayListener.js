// @flow weak

import { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import addEventListener from 'dom-helpers/events/on';
import removeEventListener from 'dom-helpers/events/off';

const isDescendant = (el, target) => {
  if (target !== null) {
    return el === target || isDescendant(el, target.parentNode);
  }
  return false;
};

const clickAwayEvents = ['mouseup', 'touchend'];
const bind = callback => {
  clickAwayEvents.forEach(event => addEventListener(document, event, callback));
};
const unbind = callback => {
  clickAwayEvents.forEach(event => removeEventListener(document, event, callback));
};

class ClickAwayListener extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    onClickAway: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.mounted = true;
    bind(this.handleClickAway);
  }

  componentWillUnmount() {
    this.mounted = false;
    unbind(this.handleClickAway);
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

      if (
        document &&
        document.documentElement &&
        document.documentElement.contains(event.target) &&
        !isDescendant(el, event.target)
      ) {
        this.props.onClickAway(event);
      }
    }
  };

  render() {
    return this.props.children;
  }
}

export default ClickAwayListener;
