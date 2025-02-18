import * as React from 'react';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { styled } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Switch from '@mui/joy/Switch';

const Normal = styled('div')`
  text-align: left;
`;

const Noflip = styled('div')`
  /* @noflip */
  text-align: left;
`;

const rtlCache = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const ltrCache = createCache({
  key: 'mui',
});

export default function RtlOptOut() {
  const [rtl, setRtl] = React.useState(false);

  const handleChange = () => {
    setRtl(!rtl);
  };

  return (
    <Box sx={{ width: '100%', display: 'flex' }}>
      <Switch onChange={handleChange} endDecorator="Toggle RTL" />
      <CacheProvider value={rtl ? rtlCache : ltrCache}>
        <Box sx={{ flexGrow: 1, mx: 2 }} dir={rtl ? 'rtl' : ''}>
          <Normal>RTL normal behavior</Normal>
          <Noflip>RTL noflip</Noflip>
        </Box>
      </CacheProvider>
    </Box>
  );
}
