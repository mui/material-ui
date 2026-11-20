import createCache from '@emotion/cache';

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
  // The styles go at the end of the `<head>`, after the app's CSS, as on the server.
  return createCache({ key: 'mui', ...options });
}
