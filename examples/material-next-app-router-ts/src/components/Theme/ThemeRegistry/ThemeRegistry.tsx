'use client';

import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { NextAppDirEmotionCacheProvider } from 'tss-react/next/appDir';

import theme from './theme';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <CssBaseline />
      <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </NextAppDirEmotionCacheProvider>
    </React.Fragment>
  );
}
