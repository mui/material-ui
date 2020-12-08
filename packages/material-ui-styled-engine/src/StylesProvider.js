import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// Cache with option to prepend emotion's style tag 
export const cache = createCache({ key: 'css', prepend: true });

export function StylesProvider(props) {
  return <CacheProvider value={cache}>{props.children}</CacheProvider>
}

export default StylesProvider;