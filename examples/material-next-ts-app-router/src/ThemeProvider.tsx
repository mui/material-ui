'use client';

import * as React from 'react';
import createCache from '@emotion/cache';
import { CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import { useServerInsertedHTML } from 'next/navigation';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import theme from './theme';

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [emotionCache] = React.useState(() => {
    const cache = createCache({ key: 'css' });
    cache.compat = true;
    return cache;
  });

  useServerInsertedHTML(() => {
    return (
      <style
        data-emotion={`${emotionCache.key} ${Object.keys(emotionCache.inserted).join(' ')}`}
        /* eslint-disable-next-line react/no-danger */
        dangerouslySetInnerHTML={{
          __html: Object.values(emotionCache.inserted).join(' '),
        }}
      />
    );
  });

  return (
    <CacheProvider value={emotionCache}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </CacheProvider>
  );
}

export default ThemeProvider;
