'use client';
import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { useState } from 'react';
import BrandingProvider from './BrandingProvider';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { green, deepPurple } from '@mui/material/colors';

// const theme = createTheme({
//   palette: {
//     primary: green,
//     secondary: deepPurple
//   }
// });

export default function RootStyleRegistry({ children }: { children: JSX.Element }) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: 'my' });
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
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
    const names = flush();
    if (names.length === 0) return null;
    let styles = '';
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <BrandingProvider>{children}</BrandingProvider>
    </CacheProvider>
  );
}
