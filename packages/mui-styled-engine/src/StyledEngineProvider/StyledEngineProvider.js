'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// prepend: true moves MUI styles to the top of the <head> so they're loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
let cache;
if (typeof document === 'object') {
  cache = createCache({ key: 'css', prepend: true });
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
