let Events = require('../utils/events');


module.exports = {

  componentDidMount() {
    let listeners = this.windowListeners;
    var stackListeners = this.stackWindowListeners;

    for (let eventName in listeners) {
       let callbackName = listeners[eventName];
       Events.on(window, eventName, this[callbackName]);
    }

    for (var eventName in stackListeners) {
      var callbackName = stackListeners[eventName];
      Events.onstack(window, eventName, this[callbackName]);
    }
  },

  componentWillUnmount() {
    let listeners = this.windowListeners;
    var stackListeners = this.stackWindowListeners;

    for (let eventName in listeners) {
       let callbackName = listeners[eventName];
       Events.off(window, eventName, this[callbackName]);
    }

    for (var eventName in stackListeners) {
      var callbackName = stackListeners[eventName];
      Events.offstack(window, eventName, this[callbackName]);
    }
  },

};
