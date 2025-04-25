import createCache from '@emotion/cache';

const isBrowser = typeof document !== 'undefined';

function plugin(element: any) {
  if (
    // case I: not wrapped by `@layer mui`
    (!element.root && element.type !== '@layer') ||
    // case II: wrapped by `@layer mui`
    (element.parent &&
      element.parent.value === '@layer mui' &&
      element.type !== '@layer' &&
      element.type !== 'decl')
  ) {
    const child = { ...element, parent: element, root: element };
    Object.assign(element, {
      children: [child],
      length: 6,
      parent: !element.root ? null : element.parent,
      root: !element.root ? null : element.root,
      props: ['base'],
      return: '',
      type: '@layer',
      value: `@layer base`,
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
