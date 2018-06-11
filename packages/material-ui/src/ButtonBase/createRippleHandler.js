function createRippleHandler(instance, eventName, action, cb) {
  return function handleEvent(event) {
    if (cb) {
      cb.call(instance, event);
    }

    let ignore = false;

    if (event.defaultPrevented) {
      ignore = true;
    }

    if (instance.props.disableTouchRipple && eventName !== 'Blur') {
      ignore = true;
    }

    if (!ignore && instance.ripple) {
      instance.ripple[action](event);
    }

    if (typeof instance.props[`on${eventName}`] === 'function') {
      instance.props[`on${eventName}`](event);
    }

    return true;
  };
}

export default createRippleHandler;
