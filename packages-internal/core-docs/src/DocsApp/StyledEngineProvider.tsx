import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import { createEmotionCache as createCache } from '@mui/material-nextjs/v15-pagesRouter';
import { once } from 'es-toolkit/function';
import { prefixer } from 'stylis';
import GlobalStyles from '@mui/material/GlobalStyles';
import { ThemeOptionsContext } from '../ThemeContext';
import { StyleEngineContext } from '../styleEngine';

type EmotionCache = ReturnType<typeof createCache>;

type StyledEngineProviderProps = {
  cacheLtr: EmotionCache;
  children: React.ReactNode;
};

const loadRtlCache = once(() =>
  import('@mui/stylis-plugin-rtl').then(({ default: rtlPlugin }) =>
    createCache({
      key: 'rtl',
      prepend: true,
      enableCssLayer: true,
      stylisPlugins: [prefixer, rtlPlugin],
    }),
  ),
);

export default function StyledEngineProvider(props: StyledEngineProviderProps) {
  const { children, cacheLtr } = props;
  const { direction } = React.useContext(ThemeOptionsContext);
  const styleEngine = React.useContext(StyleEngineContext);
  const rtl = direction === 'rtl';
  const [cacheRtl, setCacheRtl] = React.useState<EmotionCache | null>(null);

  React.useEffect(() => {
    if (rtl && !cacheRtl) {
      loadRtlCache().then(setCacheRtl);
    }
  }, [rtl, cacheRtl]);

  const tree = (
    <CacheProvider value={rtl && cacheRtl ? cacheRtl : cacheLtr}>
      <GlobalStyles styles="@layer theme, docsearch, mui, utilities;" />
      {children}
    </CacheProvider>
  );

  const StyleEngineWrapper = styleEngine?.Wrapper;
  if (rtl && StyleEngineWrapper) {
    return <StyleEngineWrapper direction="rtl">{tree}</StyleEngineWrapper>;
  }
  return tree;
}
