'use client';

import React from 'react';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {NextAppDirEmotionCacheProvider} from 'tss-react/next/appDir';

import theme from './theme';

const ThemeRegistry = ({children}: React.PropsWithChildren) => {
  return (
    <>
      <CssBaseline />
      <NextAppDirEmotionCacheProvider options={{key: 'mui'}}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </NextAppDirEmotionCacheProvider>
    </>
  );
};

export default ThemeRegistry;
