import * as React from 'react';
import { hydrate } from 'react-dom';
import { RemixBrowser } from 'remix';
import { CacheProvider } from '@emotion/react';

// Client-side cache, shared for the whole session of the user in the browser.
import createEmotionCache from './createEmotionCache';

const clientSideCache = createEmotionCache();

hydrate(
  <CacheProvider value={clientSideCache}>
    <RemixBrowser />
  </CacheProvider>,
  document,
);
