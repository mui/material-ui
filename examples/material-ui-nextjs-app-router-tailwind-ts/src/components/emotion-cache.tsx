'use client';
import * as React from 'react';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider as DefaultCacheProvider } from '@emotion/react';
import type { EmotionCache, Options as OptionsOfCreateCache } from '@emotion/cache';

export type NextAppDirEmotionCacheProviderProps = {
  /** This is the options passed to createCache() from 'import createCache from "@emotion/cache"' */
  options: Omit<OptionsOfCreateCache, 'insertionPoint'>;
  /** By default <CacheProvider /> from 'import { CacheProvider } from "@emotion/react"' */
  CacheProvider?: (props: {
    value: EmotionCache;
    children: React.ReactNode;
  }) => React.JSX.Element | null;
  children: React.ReactNode;
};

// Adapted from https://github.com/garronej/tss-react/blob/main/src/next/appDir.tsx
export default function NextAppDirEmotionCacheProvider(props: NextAppDirEmotionCacheProviderProps) {
  const { options, CacheProvider = DefaultCacheProvider, children } = props;

  const [registry] = React.useState(() => {
    const cache = createCache(options);
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: { name: string; isGlobal: boolean }[] = [];
    cache.insert = (...args) => {
      const [selector, serialized] = args;
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push({
          name: serialized.name,
          isGlobal: !selector,
        });
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const inserted = registry.flush();
    if (inserted.length === 0) {
      return null;
    }
    let styles = '';
    let dataEmotionAttribute = registry.cache.key;

    const globals: {
      name: string;
      style: string;
    }[] = [];

    inserted.forEach(({ name, isGlobal }) => {
      const style = registry.cache.inserted[name];

      if (typeof style !== 'boolean') {
        if (isGlobal) {
          globals.push({ name, style });
        } else {
          styles += style;
          dataEmotionAttribute += ` ${name}`;
        }
      }
    });

    return (
      <React.Fragment>
        {globals.map(({ name, style }) => (
          <style
            key={name}
            data-emotion={`${registry.cache.key}-global ${name}`}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: style }}
          />
        ))}
        {styles && (
          <style
            data-emotion={dataEmotionAttribute}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: styles }}
          />
        )}
      </React.Fragment>
    );
  });

  return <CacheProvider value={registry.cache}>{children}</CacheProvider>;
}
