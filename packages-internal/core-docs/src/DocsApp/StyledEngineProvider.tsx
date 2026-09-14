import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import { createEmotionCache as createCache } from '@mui/material-nextjs/v15-pagesRouter';
import { prefixer } from 'stylis';
import GlobalStyles from '@mui/material/GlobalStyles';
import { ThemeOptionsContext } from '../ThemeContext';
import type { StyleEngineWrapperProps } from '../DemoContext/DemoContext';

type EmotionCache = ReturnType<typeof createCache>;

type StyledEngineProviderProps = {
  cacheLtr: EmotionCache;
  children: React.ReactNode;
  StyleEngineWrapper?: React.ComponentType<StyleEngineWrapperProps>;
};

let rtlCachePromise: Promise<EmotionCache> | undefined;
function loadRtlCache() {
  if (!rtlCachePromise) {
    rtlCachePromise = import('../utils/rtlPlugin').then(({ rtlPlugin }) =>
      createCache({
        key: 'rtl',
        prepend: true,
        enableCssLayer: true,
        stylisPlugins: [prefixer, rtlPlugin],
      }),
    );
  }
  return rtlCachePromise;
}

export default function StyledEngineProvider(props: StyledEngineProviderProps) {
  const { children, cacheLtr, StyleEngineWrapper } = props;
  const { direction } = React.useContext(ThemeOptionsContext);
  const rtl = direction === 'rtl';
  const [cacheRtl, setCacheRtl] = React.useState<EmotionCache | null>(null);

  React.useEffect(() => {
    if (rtl && !cacheRtl) {
      loadRtlCache().then(setCacheRtl);
    }
  }, [rtl, cacheRtl]);

  if (rtl && cacheRtl) {
    const tree = (
      <CacheProvider value={cacheRtl}>
        <GlobalStyles styles="@layer theme, docsearch, mui, utilities;" />
        {children}
      </CacheProvider>
    );
    if (StyleEngineWrapper) {
      return <StyleEngineWrapper direction="rtl">{tree}</StyleEngineWrapper>;
    }
    return tree;
  }
  return (
    <CacheProvider value={cacheLtr}>
      <GlobalStyles styles="@layer theme, docsearch, mui, utilities;" />
      {children}
    </CacheProvider>
  );
}
