import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheetManager } from 'styled-components';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import rtlPluginSc from 'stylis-plugin-rtl-sc';
import { useTheme } from '@mui/material/styles';
import { globalSelector } from 'docs/src/createEmotionCache';

// Cache for the rtl version of the styles
const cacheRtl = createCache({
  key: 'rtl',
  prepend: true,
  stylisPlugins: [prefixer, globalSelector, rtlPlugin],
});

export default function StyledEngineProvider(props) {
  const { children, cacheLtr } = props;
  const theme = useTheme();

  const rtl = theme.direction === 'rtl';
  const emotionCache = theme.direction === 'rtl' ? cacheRtl : cacheLtr;

  return (
    <StyleSheetManager stylisPlugins={rtl ? [rtlPluginSc] : []}>
      <CacheProvider value={emotionCache}>{children}</CacheProvider>
    </StyleSheetManager>
  );
}

StyledEngineProvider.propTypes = {
  cacheLtr: PropTypes.object.isRequired,
  children: PropTypes.node,
};
