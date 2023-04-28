import * as React from 'react';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const Root = styled('div')((props) => ({
  width: '100%',
  marginTop: props.theme?.spacing(6),
}));

const AffectedText = styled('div')`
  text-align: left;
`;

const UnaffectedText = styled('div')`
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
    <React.Fragment>
      <div>
        <FormControlLabel
          control={<Switch checked={rtl} onChange={handleChange} />}
          label="RTL"
        />
      </div>
      <CacheProvider value={rtl ? rtlCache : ltrCache}>
        <Root {...(rtl ? { dir: 'rtl' } : {})}>
          <AffectedText>Affected</AffectedText>
          <UnaffectedText>Unaffected</UnaffectedText>
        </Root>
      </CacheProvider>
    </React.Fragment>
  );
}
