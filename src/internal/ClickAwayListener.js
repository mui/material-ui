// @flow weak

import { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import addEventListener from 'dom-helpers/events/on';
import removeEventListener from 'dom-helpers/events/off';

const isDescendant = (el, target) => {
  if (target !== null) {
    return el === target || isDescendant(el, target.parentNode);
  }
  return false;
};

const clickAwayEvents = ['mouseup', 'touchend'];
const bind = (callback) => clickAwayEvents.forEach((event) =>
 addEventListener(document, event, callback));
const unbind = (callback) => clickAwayEvents
.forEach((event) => removeEventListener(document, event, callback));


class ClickAwayListener extends Component {

  static propTypes = {
    children: PropTypes.element,
    onClickAway: PropTypes.func,
  };

  componentDidMount() {
    this.isCurrentlyMounted = true;
    if (this.props.onClickAway) {
      bind(this.handleClickAway);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.onClickAway !== this.props.onClickAway) {
      unbind(this.handleClickAway);
      if (this.props.onClickAway) {
        bind(this.handleClickAway);
      }
    }
  }

  componentWillUnmount() {
    this.isCurrentlyMounted = false;
    unbind(this.handleClickAway);
  }
  isCurrentlyMounted = undefined;
  handleClickAway = (event) => {
    if (event.defaultPrevented) {
      return;
    }

    // IE11 support, which trigger the handleClickAway even after the unbind
    if (this.isCurrentlyMounted) {
      const el = ReactDOM.findDOMNode(this);
      if (event.target !== null && document.documentElement) {
        if (document.documentElement.contains(event.target) && !isDescendant(el, event.target)) {
          this.props.onClickAway(event);
        }
      }
    }
  };

  render() {
    return this.props.children;
  }
}

export default ClickAwayListener;
