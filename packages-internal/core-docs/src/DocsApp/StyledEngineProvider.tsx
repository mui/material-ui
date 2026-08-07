import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import { createEmotionCache as createCache } from '@mui/material-nextjs/v15-pagesRouter';
import { prefixer } from 'stylis';
import GlobalStyles from '@mui/material/GlobalStyles';
import { ThemeOptionsContext } from '../ThemeContext';
import globalSelector from '../globalSelector';
import type * as RtlBundleModule from '../utils/rtlBundle';

type StyledEngineProviderProps = {
  cacheLtr: ReturnType<typeof createCache>;
  children: React.ReactNode;
};

type RtlBundle = typeof RtlBundleModule;
type RtlState = {
  bundle: RtlBundle;
  cacheRtl: ReturnType<typeof createCache>;
};

let rtlPromise: Promise<RtlState> | undefined;
function loadRtl() {
  if (!rtlPromise) {
    rtlPromise = import('../utils/rtlBundle').then((bundle) => ({
      bundle,
      cacheRtl: createCache({
        key: 'rtl',
        prepend: true,
        enableCssLayer: true,
        stylisPlugins: [prefixer, bundle.rtlPlugin, globalSelector],
      }),
    }));
  }
  return rtlPromise;
}

export default function StyledEngineProvider(props: StyledEngineProviderProps) {
  const { children, cacheLtr } = props;
  const { direction } = React.useContext(ThemeOptionsContext);
  const rtl = direction === 'rtl';
  const [rtlState, setRtlState] = React.useState<RtlState | null>(null);

  React.useEffect(() => {
    if (rtl && !rtlState) {
      loadRtl().then(setRtlState);
    }
  }, [rtl, rtlState]);

  if (rtl && rtlState) {
    const { bundle, cacheRtl } = rtlState;
    return (
      <bundle.StyleSheetManager stylisPlugins={[bundle.rtlPlugin]}>
        <CacheProvider value={cacheRtl}>
          <GlobalStyles styles="@layer theme, docsearch, mui, utilities;" />
          {children}
        </CacheProvider>
      </bundle.StyleSheetManager>
    );
  }
  return (
    <CacheProvider value={cacheLtr}>
      <GlobalStyles styles="@layer theme, docsearch, mui, utilities;" />
      {children}
    </CacheProvider>
  );
}
