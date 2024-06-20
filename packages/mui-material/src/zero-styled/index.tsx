import * as React from 'react';
import { extendSxProp } from '@mui/system/styleFunctionSx';
import useTheme from '../styles/useTheme';
import GlobalStyles, { GlobalStylesProps } from '../GlobalStyles';

export { css, keyframes } from '@mui/system';

export { default as styled } from '../styles/styled';

export function globalCss(styles: GlobalStylesProps['styles']) {
  return function GlobalStylesWrapper() {
    return <GlobalStyles styles={styles} />;
  };
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function internal_createExtendSxProp() {
  return extendSxProp;
}

export { useTheme };
