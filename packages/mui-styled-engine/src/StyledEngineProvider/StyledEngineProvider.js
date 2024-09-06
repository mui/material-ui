'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { StyleSheet } from '@emotion/sheet';

const createEmotionCache = (options) => {
  const cache = createCache(options);

  /**
   * This is for client-side apps only.
   * A custom sheet is required to make the GlobalStyles API work with `prepend: true`.
   * This is because the [sheet](https://github.com/emotion-js/emotion/blob/main/packages/react/src/global.js#L94-L99) does not consume the options.
   */
  class MyStyleSheet extends StyleSheet {
    constructor(args) {
      super(args);
      this.prepend = cache.sheet.prepend;
    }
  }

  // Do the same as https://github.com/emotion-js/emotion/blob/main/packages/cache/src/index.js#L238-L245
  cache.sheet = new MyStyleSheet({
    key: cache.key,
    nonce: cache.sheet.nonce,
    container: cache.sheet.container,
    speedy: cache.sheet.isSpeedy,
    prepend: cache.sheet.prepend,
    insertionPoint: cache.sheet.insertionPoint,
  });

  return cache;
};

// prepend: true moves MUI styles to the top of the <head> so they're loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
let cache;
if (typeof document === 'object') {
  cache = createEmotionCache({ key: 'css', prepend: true });
}

export default function StyledEngineProvider(props) {
  const { injectFirst, children } = props;
  return injectFirst && cache ? <CacheProvider value={cache}>{children}</CacheProvider> : children;
}

StyledEngineProvider.propTypes = {
  /**
   * Your component tree.
   */
  children: PropTypes.node,
  /**
   * By default, the styles are injected last in the <head> element of the page.
   * As a result, they gain more specificity than any other style sheet.
   * If you want to override MUI's styles, set this prop.
   */
  injectFirst: PropTypes.bool,
};
