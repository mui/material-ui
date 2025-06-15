import { StylisPlugin } from '@emotion/cache';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import GlobalStyles from '@mui/material/GlobalStyles';
import rtlPlugin from '@mui/stylis-plugin-rtl';
import { ThemeOptionsContext } from 'docs/src/modules/components/ThemeContext';
import * as React from 'react';
import { StyleSheetManager } from 'styled-components';
import { prefixer } from 'stylis';
import globalSelector from './globalSelector';

interface Props {
  children: React.ReactNode;
}

export default function StyledEngineProviderApp(props: Props) {
  const { children } = props;
  const { direction } = React.useContext(ThemeOptionsContext);

  const rtl = direction === 'rtl';

  const plugins: StylisPlugin[] = [prefixer, globalSelector];
  if (direction === 'rtl') {
    plugins.push(rtlPlugin);
  }

  return (
    <StyleSheetManager stylisPlugins={rtl ? [rtlPlugin] : []}>
      <AppRouterCacheProvider
        options={{
          key: direction,
          prepend: true,
          enableCssLayer: true,
          stylisPlugins: plugins,
        }}
      >
        <GlobalStyles styles="@layer theme, docsearch, mui, utilities;" />
        {children}
      </AppRouterCacheProvider>
    </StyleSheetManager>
  );
}
