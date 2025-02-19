import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheetManager } from 'styled-components';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { useTheme } from '@mui/material/styles';
import globalSelector from './globalSelector';

// Cache for the rtl version of the styles
const cacheRtl = createCache({
  key: 'rtl',
  prepend: true,
  stylisPlugins: [prefixer, rtlPlugin, globalSelector],
});

export default function StyledEngineProvider(props) {
  const { children } = props;
  const theme = useTheme();
  const rtl = theme.direction === 'rtl';

  let Wrapper = React.Fragment;
  let wraperProps = {};

  // Only happens client-side after the hydration
  if (rtl) {
    Wrapper = CacheProvider;
    wraperProps = {
      value: cacheRtl,
    };
  }
  return (
    <StyleSheetManager stylisPlugins={rtl ? [rtlPlugin] : []}>
      <Wrapper {...wraperProps}>{props.children}</Wrapper>
    </StyleSheetManager>
  );
}

StyledEngineProvider.propTypes = {
  cacheLtr: PropTypes.object.isRequired,
  children: PropTypes.node,
};
