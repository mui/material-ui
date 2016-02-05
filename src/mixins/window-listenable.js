import Events from '../utils/events';


export default {

  componentDidMount() {
    let listeners = this.windowListeners;

    for (let eventName in listeners) {
      let callbackName = listeners[eventName];
      Events.on(window, eventName, this[callbackName]);
    }
  },

  componentWillUnmount() {
    let listeners = this.windowListeners;

    for (let eventName in listeners) {
      let callbackName = listeners[eventName];
      Events.off(window, eventName, this[callbackName]);
    }
  },

};
