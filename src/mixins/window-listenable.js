import Events from '../utils/events';


export default {

  componentDidMount() {
    const listeners = this.windowListeners;

    for (const eventName in listeners) {
      const callbackName = listeners[eventName];
      Events.on(window, eventName, this[callbackName]);
    }
  },

  componentWillUnmount() {
    const listeners = this.windowListeners;

    for (const eventName in listeners) {
      const callbackName = listeners[eventName];
      Events.off(window, eventName, this[callbackName]);
    }
  },

};
