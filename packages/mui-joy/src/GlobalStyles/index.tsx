import * as React from 'react';
import { GlobalStyles as SystemGlobalStyles, GlobalStylesProps } from '@mui/system';
import defaultTheme from '../styles/defaultTheme';
import IDENTIFIER from '../styles/identifier';
import { Theme } from '../styles/types';

function GlobalStyles(props: GlobalStylesProps<Theme>) {
  return <SystemGlobalStyles {...props} defaultTheme={defaultTheme} identifier={IDENTIFIER} />;
}

export default GlobalStyles;
