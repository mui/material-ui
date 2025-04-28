import createCache from '@emotion/cache';

const isBrowser = typeof document !== 'undefined';

function isMuiLayerAsParent(element: any) {
  return element.parent && element.parent.value === '@layer mui';
}

function plugin(element: any) {
  if (element.type === '@layer') {
    return;
  }
  if (isMuiLayerAsParent(element) && element.type !== '@layer' && element.type !== 'decl') {
    const child = { ...element, parent: element, root: element };
    Object.assign(element, {
      children: [child],
      length: 6,
      props: ['mui.base'],
      return: '',
      type: '@layer',
      value: `@layer mui.base`,
    });
  }

  // wrap all elements in the root selector to @layer mui.base
  if (!element.parent && !element.root && element.type === 'rule' && element.children.length) {
    const children = [];
    for (let i = element.children.length - 1; i >= 0; i -= 1) {
      const child = element.children[i];
      if (child.type === 'decl') {
        children.unshift(element.children.splice(i, 1)[0]);
      }
    }
    element.children.unshift({
      root: null,
      length: 6,
      props: ['mui.base'],
      return: '',
      type: '@layer',
      value: `@layer mui.base`,
      parent: element,
      children,
    });
  }

  // for root pseudo selector and other @* selectors
  if (
    element.parent &&
    !element.parent.parent &&
    !element.parent.root &&
    element.parent.type === 'rule'
  ) {
    if (element.type === 'rule' && !element.root) {
      const child = { ...element, parent: element, root: element };
      Object.assign(element, {
        children: [child],
        length: 6,
        props: ['mui.base'],
        return: '',
        type: '@layer',
        value: `@layer mui.base`,
        parent: null,
        root: null,
      });
    }
  }
  if (
    (!element.parent || (element.parent && element.parent.type !== '@layer')) &&
    element.type.startsWith('@') &&
    element.type !== '@layer'
  ) {
    const child = {
      children: element.children,
      length: 6,
      props: ['mui.base'],
      return: '',
      type: '@layer',
      value: `@layer mui.base`,
      parent: element,
      root: null,
    };
    Object.assign(element, {
      children: [child],
    });
  }
}

// On the client side, Create a meta tag at the top of the <head> and set it as insertionPoint.
// This assures that MUI styles are loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
export default function createEmotionCache(
  options?: { enableCssLayer?: boolean } & Parameters<typeof createCache>[0],
) {
  let insertionPoint;

  if (isBrowser) {
    const emotionInsertionPoint = document.querySelector<HTMLMetaElement>(
      'meta[name="emotion-insertion-point"]',
    );
    insertionPoint = emotionInsertionPoint ?? undefined;
  }

  const { enableCssLayer, ...rest } = options ?? {};

  const emotionCache = createCache({
    key: 'mui',
    insertionPoint,
    ...rest,
    stylisPlugins: [plugin],
  });
  if (enableCssLayer) {
    const prevInsert = emotionCache.insert;
    emotionCache.insert = (...args) => {
      if (!args[1].styles.startsWith('@layer')) {
        args[1].styles = `@layer mui {${args[1].styles}}`;
      }
      return prevInsert(...args);
    };
  }
  return emotionCache;
}
