'use client';
import * as React from 'react';
import { GlobalStyles as SystemGlobalStyles, GlobalStylesProps } from '@mui/system';
import defaultTheme from '../styles/defaultTheme';
import THEME_ID from '../styles/identifier';
import { Theme } from '../styles/types';

function GlobalStyles(props: GlobalStylesProps<Theme>) {
  return <SystemGlobalStyles {...props} defaultTheme={defaultTheme} themeId={THEME_ID} />;
}

export default GlobalStyles;
