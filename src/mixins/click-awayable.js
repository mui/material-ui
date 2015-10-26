let React = require('react');
let ReactDOM = require('react-dom');
let Events = require('../utils/events');
let Dom = require('../utils/dom');


module.exports = {

  //When the component mounts, listen to click events and check if we need to
  //Call the componentClickAway function.
  componentDidMount() {
    if (!this.manuallyBindClickAway) this._bindClickAway();
  },

  componentWillUnmount() {
    this._unbindClickAway();
  },

  _checkClickAway(event) {
    let el = ReactDOM.findDOMNode(this);

    // Check if the target is inside the current component
    if (event.target !== el &&
        !Dom.isDescendant(el, event.target) &&
        document.documentElement.contains(event.target)) {
      if (this.componentClickAway) this.componentClickAway(event);
    }
  },

  _bindClickAway() {
    // On touch-enabled devices, both events fire, and the handler is called twice,
    // but it's fine since all operations for which the mixin is used
    // are idempotent.
    Events.on(document, 'mouseup', this._checkClickAway);
    Events.on(document, 'touchend', this._checkClickAway);
  },

  _unbindClickAway() {
    Events.off(document, 'mouseup', this._checkClickAway);
    Events.off(document, 'touchend', this._checkClickAway);
  },

};
