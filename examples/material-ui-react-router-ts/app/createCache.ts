import createCache from '@emotion/cache';

// On the client side, Create a meta tag at the top of the <head> and set it as insertionPoint.
// This assures that MUI styles are loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
export default function createEmotionCache(options?: Parameters<typeof createCache>[0]) {
  const emotionCache = createCache({ key: 'mui', ...options });
  const prevInsert = emotionCache.insert;
  emotionCache.insert = (...args) => {
    // ignore styles that contain layer order (`@layer ...` without `{`)
    if (!args[1].styles.match(/^@layer\s+[^{]*$/)) {
      args[1].styles = `@layer mui {${args[1].styles}}`;
    }
    return prevInsert(...args);
  };

  return emotionCache;
}
