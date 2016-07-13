// @flow
export function createRippleHandler(instance: Object, eventName: string, action: string, cb: any): EventListener {
  return function handleEvent(event) {
    if (cb) {
      cb.call(instance, event);
    }

    if (event.defaultPrevented) {
      return false;
    }

    if (instance.ripple) {
      instance.ripple[action](event);
    }
    if (instance.props && typeof instance.props[`on${eventName}`] === 'function') {
      instance.props[`on${eventName}`](event);
    }
  };
}
