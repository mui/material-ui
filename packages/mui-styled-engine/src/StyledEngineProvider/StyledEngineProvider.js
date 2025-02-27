'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { StyleSheet } from '@emotion/sheet';

// We might be able to remove this when this issue is fixed:
// https://github.com/emotion-js/emotion/issues/2790
const createEmotionCache = (options, CustomSheet) => {
  const cache = createCache(options);

  // Do the same as https://github.com/emotion-js/emotion/blob/main/packages/cache/src/index.js#L238-L245
  cache.sheet = new CustomSheet({
    key: cache.key,
    nonce: cache.sheet.nonce,
    container: cache.sheet.container,
    speedy: cache.sheet.isSpeedy,
    prepend: cache.sheet.prepend,
    insertionPoint: cache.sheet.insertionPoint,
  });

  return cache;
};

let insertionPoint;
if (typeof document === 'object') {
  // Use `insertionPoint` over `prepend`(deprecated) because it can be controlled for GlobalStyles injection order
  // For more information, see https://github.com/mui/material-ui/issues/44597
  insertionPoint = document.querySelector('[name="emotion-insertion-point"]');
  if (!insertionPoint) {
    insertionPoint = document.createElement('meta');
    insertionPoint.setAttribute('name', 'emotion-insertion-point');
    insertionPoint.setAttribute('content', '');
    const head = document.querySelector('head');
    if (head) {
      head.prepend(insertionPoint);
    }
  }
}

function getCache(injectFirst, enableCssLayer) {
  if (injectFirst || enableCssLayer) {
    /**
     * This is for client-side apps only.
     * A custom sheet is required to make the GlobalStyles API injected above the insertion point.
     * This is because the [sheet](https://github.com/emotion-js/emotion/blob/main/packages/react/src/global.js#L94-L99) does not consume the options.
     */
    class MyStyleSheet extends StyleSheet {
      insert(rule, options) {
        if (this.key && this.key.endsWith('global')) {
          this.before = insertionPoint;
        }
        return super.insert(rule, options);
      }
    }
    const emotionCache = createEmotionCache(
      {
        key: 'css',
        insertionPoint: injectFirst ? insertionPoint : undefined,
      },
      MyStyleSheet,
    );
    if (enableCssLayer) {
      const prevInsert = emotionCache.insert;
      emotionCache.insert = (...args) => {
        if (!args[1].styles.startsWith('@layer')) {
          // avoid nested @layer
          args[1].styles = `@layer mui {${args[1].styles}}`;
        }
        return prevInsert(...args);
      };
    }
    return emotionCache;
  }
  return undefined;
}

export default function StyledEngineProvider(props) {
  const { injectFirst, enableCssLayer, children } = props;
  const cache = React.useMemo(
    () => getCache(injectFirst, enableCssLayer),
    [injectFirst, enableCssLayer],
  );
  return cache ? <CacheProvider value={cache}>{children}</CacheProvider> : children;
}

StyledEngineProvider.propTypes = {
  /**
   * Your component tree.
   */
  children: PropTypes.node,
  /**
   * If `true`, the styles are wrapped in `@layer mui`.
   * Learn more about [Cascade layers](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Cascade_layers).
   */
  enableCssLayer: PropTypes.bool,
  /**
   * By default, the styles are injected last in the <head> element of the page.
   * As a result, they gain more specificity than any other style sheet.
   * If you want to override MUI's styles, set this prop.
   */
  injectFirst: PropTypes.bool,
};
