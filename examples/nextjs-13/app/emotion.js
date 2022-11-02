'use client';
import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import { useServerInsertedHTML } from 'next/navigation';
import createEmotionCache from '../src/createEmotionCache';

export default function RootStyleRegistry({ children }) {
  const [cache] = React.useState(() => {
    const cache = createEmotionCache();
    cache.compat = true;
    return cache;
  });

  useServerInsertedHTML(() => {
    return (
      <style
        data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: Object.values(cache.inserted).join(' '),
        }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
