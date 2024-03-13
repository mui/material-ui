import * as React from 'react';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';

const theme = extendTheme({
  direction: 'rtl',
});

const cacheRtl = createCache({
  key: 'joyrtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function RtlDemo() {
  return (
    <CacheProvider value={cacheRtl}>
      <CssVarsProvider theme={theme}>
        <div dir="rtl">
          <FormControl>
            <FormLabel>ملصق</FormLabel>
            <Input placeholder="العنصر النائب" />
            <FormHelperText>هذا نص مساعد</FormHelperText>
          </FormControl>
        </div>
      </CssVarsProvider>
    </CacheProvider>
  );
}
