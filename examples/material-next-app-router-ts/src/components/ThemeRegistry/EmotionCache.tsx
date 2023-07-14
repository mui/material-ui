'use client';

import * as React from 'react';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider as DefaultCacheProvider } from '@emotion/react';
import type { EmotionCache, Options as OptionsOfCreateCache } from '@emotion/cache';

export type NextAppDirEmotionCacheProviderProps = {
  /** This is the options passed to createCache() from 'import createCache from "@emotion/cache"' */
  options?: Omit<OptionsOfCreateCache, 'insertionPoint'>;
  /** By default <CacheProvider /> from 'import { CacheProvider } from "@emotion/react"' */
  CacheProvider?: (props: {
    value: EmotionCache;
    children: React.ReactNode;
  }) => React.JSX.Element | null;
  children: React.ReactNode;
};

export default function NextAppDirEmotionCacheProvider(props: NextAppDirEmotionCacheProviderProps) {
  const { options, CacheProvider = DefaultCacheProvider, children } = props;

  const [registry] = React.useState(() => {
    const cache = createCache({ key: 'mui-style', ...options });

    // Adapted from `extractCriticalToChunks` from emotion server
    // https://github.com/emotion-js/emotion/blob/main/packages/server/src/create-instance/extract-critical-to-chunks.js
    const flush = () => {
      const styles = [];
      const regularCssIds: string[] = [];
      let regularCss = '';

      Object.keys(cache.inserted).forEach((id) => {
        if (cache.registered[`${cache.key}-${id}`]) {
          // regular css can be added in one style tag
          regularCssIds.push(id);
          regularCss += cache.inserted[id];
        } else {
          // each global styles require a new entry so it can be independently flushed
          styles.push({
            key: `${cache.key}-global`,
            ids: [id],
            css: cache.inserted[id],
          });
        }
      });

      styles.push({ key: cache.key, ids: regularCssIds, css: regularCss });

      return styles;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const styles = registry.flush();
    return styles.map((style) => (
      <style
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
        key={style.key}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ));
  });

  return <CacheProvider value={registry.cache}>{children}</CacheProvider>;
}
