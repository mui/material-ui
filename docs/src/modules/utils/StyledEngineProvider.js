import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheetManager } from 'styled-components';
import { CacheProvider } from '@emotion/react';
import { createEmotionCache as createCache } from '@mui/material-nextjs/v15-pagesRouter';
import { prefixer } from 'stylis';
import rtlPlugin from '@mui/stylis-plugin-rtl';
import GlobalStyles from '@mui/material/GlobalStyles';
import { ThemeOptionsContext } from 'docs/src/modules/components/ThemeContext';
import globalSelector from './globalSelector';

// Cache for the rtl version of the styles
const cacheRtl = createCache({
  key: 'rtl',
  prepend: true,
  enableCssLayer: true,
  stylisPlugins: [prefixer, rtlPlugin, globalSelector],
});

/**
 * @param {object} props
 * @param {object} props.cacheLtr
 * @param {React.ReactNode} [props.children]
 */
export default function StyledEngineProvider(props) {
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

StyledEngineProvider.propTypes = {
  cacheLtr: PropTypes.object.isRequired,
  children: PropTypes.node,
};
