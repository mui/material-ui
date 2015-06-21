let Events = require('../utils/events');

module.exports = {

  componentDidMount: function() {
    let listeners = this.windowListeners;

    for (let eventName in listeners) {
       let callbackName = listeners[eventName];
       Events.on(window, eventName, this[callbackName]);
    }
  },

  componentWillUnmount: function() {
    let listeners = this.windowListeners;

    for (let eventName in listeners) {
       let callbackName = listeners[eventName];
       Events.off(window, eventName, this[callbackName]);
    }
  }

}
