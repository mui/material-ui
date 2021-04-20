import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheetManager } from 'styled-components';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import rtlPluginSc from 'stylis-plugin-rtl-sc';
import { useTheme } from '@material-ui/core/styles';

export default function StyledEngineProvider(props) {
  const theme = useTheme();

  const rtl = theme.direction === 'rtl';

  return (
    <StyleSheetManager stylisPlugins={rtl ? [rtlPluginSc] : []}>
      <CacheProvider
        value={
          rtl
            ? createCache({
                key: 'rtl',
                prepend: true,
                stylisPlugins: [rtlPlugin],
              })
            : createCache({ key: 'css', prepend: true })
        }
      >
        {props.children}
      </CacheProvider>
    </StyleSheetManager>
  );
}

StyledEngineProvider.propTypes = {
  children: PropTypes.node,
};
