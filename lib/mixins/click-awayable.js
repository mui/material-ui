'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Events = require('../utils/events');
var Dom = require('../utils/dom');

module.exports = {

  //When the component mounts, listen to click events and check if we need to
  //Call the componentClickAway function.
  componentDidMount: function componentDidMount() {
    if (!this.manuallyBindClickAway) this._bindClickAway();
  },

  componentWillUnmount: function componentWillUnmount() {
    this._unbindClickAway();
  },

  _checkClickAway: function _checkClickAway(event) {
    var el = ReactDOM.findDOMNode(this);

    // Check if the target is inside the current component
    if (event.target !== el && !Dom.isDescendant(el, event.target) && document.documentElement.contains(event.target)) {
      if (this.componentClickAway) this.componentClickAway(event);
    }
  },

  _bindClickAway: function _bindClickAway() {
    // On touch-enabled devices, both events fire, and the handler is called twice,
    // but it's fine since all operations for which the mixin is used
    // are idempotent.
    Events.on(document, 'mouseup', this._checkClickAway);
    Events.on(document, 'touchend', this._checkClickAway);
  },

  _unbindClickAway: function _unbindClickAway() {
    Events.off(document, 'mouseup', this._checkClickAway);
    Events.off(document, 'touchend', this._checkClickAway);
  }

};