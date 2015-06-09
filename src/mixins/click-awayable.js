var React = require('react');
var Events = require('../utils/events');
var Dom = require('../utils/dom');

module.exports = {

  //When the component mounts, listen to click events and check if we need to
  //Call the componentClickAway function.
  componentDidMount: function() {
    if (!this.manuallyBindClickAway) this._bindClickAway();
  },

  componentWillUnmount: function() {
    this._unbindClickAway();
  },

  _checkClickAway: function(e) {
    var el = React.findDOMNode(this); 
    
    // Check if the target is inside the current component
    if (e.target != el &&
        !Dom.isDescendant(el, e.target) &&
        document.documentElement.contains(e.target)) {
      if (this.componentClickAway) this.componentClickAway();
    }
  },

  _bindClickAway: function() {
    // On touch-enabled devices, both events fire, and the handler is called twice,
    // but it's fine since all operations for which the mixin is used
    // are idempotent.
    Events.on(document, 'mouseup', this._checkClickAway);
    Events.on(document, 'touchend', this._checkClickAway);
  },

  _unbindClickAway: function() {
    Events.off(document, 'mouseup', this._checkClickAway);
    Events.off(document, 'touchend', this._checkClickAway);
  }

};
