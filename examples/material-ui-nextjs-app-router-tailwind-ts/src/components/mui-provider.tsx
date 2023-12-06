'use client';

import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import NextAppDirEmotionCacheProvider from '@/components/emotion-cache';
import theme from '@/lib/theme';

export type MuiProviderProps = {
  children?: React.ReactNode;
};

export function MuiProvider({ children }: MuiProviderProps) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
