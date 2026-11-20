import createCache from '@emotion/cache';

const isBrowser = typeof document !== 'undefined';

// On the client side, Create a meta tag at the top of the <head> and set it as insertionPoint.
// This assures that MUI styles are loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
let warnedEnableCssLayer = false;

export default function createEmotionCache(options?: Parameters<typeof createCache>[0]) {
  if (process.env.NODE_ENV !== 'production') {
    // JavaScript apps get no type error.
    if (options && 'enableCssLayer' in options && !warnedEnableCssLayer) {
      warnedEnableCssLayer = true;
      console.error(
        [
          'MUI: The `enableCssLayer` option of `createEmotionCache()` was removed in v10.',
          "Material UI's styles are always in the `mui` layer, so remove the option.",
          'See https://mui.com/material-ui/migration/upgrade-to-v10/#enablecsslayer-removed',
        ].join('\n'),
      );
    }
  }
  let insertionPoint;

  if (isBrowser) {
    const emotionInsertionPoint = document.querySelector<HTMLMetaElement>(
      'meta[name="emotion-insertion-point"]',
    );
    insertionPoint = emotionInsertionPoint ?? undefined;
  }

  return createCache({ key: 'mui', insertionPoint, ...options });
}
