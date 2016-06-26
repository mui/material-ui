
export function createRippleHandler(instance, eventName, action) {
  return function handleEvent(event) {
    if (instance.ripple) {
      instance.ripple[action](event);
    }
    if (instance.props && typeof instance.props[`handle${eventName}`] === 'function') {
      instance.props[`on${eventName}`](event);
    }
  };
}
