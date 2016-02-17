import React from 'react';
import ReactDOM from 'react-dom';
import events from './utils/events';

const isDescendant = (el, target) => {
  if (target !== null) {
    return el === target || isDescendant(el, target.parentNode);
  }
  return false;
};

const clickAwayEvents = ['mousedown', 'touchstart'];
const bind = (callback) => clickAwayEvents.forEach((event) => events.on(document, event, callback));
const unbind = (callback) => clickAwayEvents.forEach((event) => events.off(document, event, callback));

export default class ClickAwayListener extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    onClickAway: React.PropTypes.any,
  };

  componentDidMount() {
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
    unbind(this.handleClickAway);
  }

  handleClickAway = (event) => {
    if (event.defaultPrevented) {
      return;
    }

    const el = ReactDOM.findDOMNode(this);

    if (document.documentElement.contains(event.target) && !isDescendant(el, event.target)) {
      this.props.onClickAway(event);
    }
  };

  render() {
    return this.props.children;
  }
}
