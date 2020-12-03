import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheetManager } from 'styled-components';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { useTheme } from '@material-ui/core/styles';

// Cache for the ltr version of the styles
export const cacheLtr = createCache({ key: 'css' });
cacheLtr.compat = true;

// Cache for the rtl version of the styles
const cacheRtl = createCache({
  key: 'rtl',
  stylisPlugins: [rtlPlugin],
});
cacheRtl.compat = true;

const StyledEngineProvider = (props) => {
  const theme = useTheme();

  const rtl = theme.direction === 'rtl';

  return (
    <StyleSheetManager stylisPlugins={rtl ? [rtlPlugin] : []}>
      <CacheProvider value={rtl ? cacheRtl : cacheLtr}>{props.children}</CacheProvider>
    </StyleSheetManager>
  );
};

StyledEngineProvider.propTypes = {
  children: PropTypes.node,
};

export default StyledEngineProvider;
