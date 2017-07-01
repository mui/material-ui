// @flow weak

function shallowRecursively(wrapper, selector, { context }) {
  if (wrapper.isEmptyRender() || typeof wrapper.node.type === 'string') {
    return wrapper;
  }

  let newContext = context;

  const instance = wrapper.root.instance();
  if (instance.getChildContext) {
    newContext = {
      ...context,
      ...instance.getChildContext(),
    };
  }

  const nextWrapper = wrapper.shallow({ context: newContext });

  if (selector && wrapper.is(selector)) {
    return nextWrapper;
  }

  return shallowRecursively(nextWrapper, selector, { context: newContext });
}

export default function until(selector, { context } = this.options) {
  return this.single('until', () => shallowRecursively(this, selector, { context }));
}
