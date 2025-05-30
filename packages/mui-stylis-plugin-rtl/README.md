# @mui/stylis-plugin-rtl

Stylis RTL plugin for Material UI.

> Note: this is a fork of [stylis-plugin-rtl](https://github.com/styled-components/stylis-plugin-rtl) to fix issues with CSS layers and to support the latest version of Stylis.

## Installation

```bash
npm install @mui/stylis-plugin-rtl @emotion/cache stylis
```

## Usage

```js
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import rtlPlugin from '@mui/stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const theme = createTheme({
  direction: 'rtl',
});

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function RtlDemo() {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div dir="rtl">
          <TextField
            label="ملصق"
            placeholder="العنصر النائب"
            helperText="هذا نص مساعد"
            variant="outlined"
          />
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}
```

For more information, see the [RTL documentation](https://mui.com/material-ui/guides/right-to-left/).
