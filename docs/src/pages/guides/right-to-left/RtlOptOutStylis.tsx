import * as React from 'react';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { styled } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

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
  // @ts-ignore external dependency
  stylisPlugins: [rtlPlugin],
});

const ltrCache = createCache({
  key: 'mui',
});

export default function RtlOptOut() {
  const [rtl, setRtl] = React.useState(false);

  const handleChage = () => {
    setRtl(!rtl);
  };

  return (
    <React.Fragment>
      <div>
        <FormControlLabel
          control={<Switch checked={rtl} onChange={handleChage} />}
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
