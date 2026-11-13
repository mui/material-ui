import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import { createEmotionCache as createCache } from '@mui/material-nextjs/v15-pagesRouter';
import { prefixer } from 'stylis';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/material/utils';
import { ThemeOptionsContext } from '../ThemeContext';

type EmotionCache = ReturnType<typeof createCache>;

type StyledEngineProviderProps = {
  cacheLtr: EmotionCache;
  children: React.ReactNode;
};

let rtlCachePromise: Promise<EmotionCache> | undefined;
function loadRtlCache() {
  rtlCachePromise ??= import('@mui/stylis-plugin-rtl').then(({ default: rtlPlugin }) =>
    createCache({
      key: 'rtl',
      prepend: true,
      enableCssLayer: true,
      stylisPlugins: [prefixer, rtlPlugin],
    }),
  );
  return rtlCachePromise;
}

export default function StyledEngineProvider(props: StyledEngineProviderProps) {
  const { children, cacheLtr } = props;
  const { direction } = React.useContext(ThemeOptionsContext);
  const rtl = direction === 'rtl';
  const [cacheRtl, setCacheRtl] = React.useState<EmotionCache | null>(null);

  React.useEffect(() => {
    if (rtl && !cacheRtl) {
      loadRtlCache().then(setCacheRtl);
    }
  }, [rtl, cacheRtl]);

  const cache = rtl && cacheRtl ? cacheRtl : cacheLtr;

  // A cache inserts its first style at the top of <head>, above the layer order that Material UI
  // declares there. Move the order back above the RTL cache's styles, or `mui` would come first.
  useEnhancedEffect(() => {
    const layerOrder = document.head.querySelector('style[data-mui-layer-order]');
    if (layerOrder && document.head.firstChild !== layerOrder) {
      document.head.prepend(layerOrder);
    }
  }, [cache]);

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
