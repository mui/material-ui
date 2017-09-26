// @flow weak

function shallowRecursively(wrapper, selector, options = {}) {
  if (wrapper.isEmptyRender() || typeof wrapper.getNode().type === 'string') {
    return wrapper;
  }

  const newContext = options.context;
  const nextWrapper = wrapper.shallow({ ...options, context: newContext });

  if (selector && wrapper.is(selector)) {
    return nextWrapper;
  }

  return shallowRecursively(nextWrapper, selector, { ...options, context: newContext });
}

export default function until(selector, options) {
  return this.single('until', () => shallowRecursively(this, selector, options));
}
