import * as React from 'react';
import { StyleSheetManager } from 'styled-components';
import { CacheProvider } from '@emotion/react';
import { createEmotionCache as createCache } from '@mui/material-nextjs/v15-pagesRouter';
import { prefixer } from 'stylis';
import rtlPlugin from '@mui/stylis-plugin-rtl';
import GlobalStyles from '@mui/material/GlobalStyles';
import { ThemeOptionsContext } from '../ThemeContext';
import globalSelector from '../globalSelector';

type StyledEngineProviderProps = {
  cacheLtr: ReturnType<typeof createCache>;
  children: React.ReactNode;
};

// Cache for the rtl version of the styles
const cacheRtl = createCache({
  key: 'rtl',
  prepend: true,
  enableCssLayer: true,
  stylisPlugins: [prefixer, rtlPlugin, globalSelector],
});

export default function StyledEngineProvider(props: StyledEngineProviderProps) {
  const { children, cacheLtr } = props;
  const { direction } = React.useContext(ThemeOptionsContext);

  const rtl = direction === 'rtl';
  const emotionCache = direction === 'rtl' ? cacheRtl : cacheLtr;

  return (
    <StyleSheetManager stylisPlugins={rtl ? [rtlPlugin] : []}>
      <CacheProvider value={emotionCache}>
        <GlobalStyles styles="@layer theme, docsearch, mui, utilities;" />
        {children}
      </CacheProvider>
    </StyleSheetManager>
  );
}
