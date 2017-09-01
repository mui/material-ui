// @flow

function createRippleHandler(instance: Object, eventName: string, action: string, cb: ?Function) {
  return function handleEvent(event: SyntheticUIEvent<>) {
    /**
      do not ripple on right clicks
    */
    const clicks = {left: 1, right: 3}
    if (event.nativeEvent.which === clicks.right) {
      instance.ripple['stop'](event);
      return;
    }

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

    return true;
  };
}

export default createRippleHandler;
