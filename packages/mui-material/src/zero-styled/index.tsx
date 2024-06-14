import * as React from 'react';
import { extendSxProp } from '@mui/system/styleFunctionSx';
import useThemeProps from '../styles/useThemeProps';
import useTheme from '../styles/useTheme';
import GlobalStyles from '../GlobalStyles';

export { css, keyframes } from '@mui/system';

export { default as styled } from '../styles/styled';

export function globalCss(styles: any) {
  return function GlobalStylesWrapper() {
    return (
      // Pigment CSS `globalCss` support callback with theme inside an object but `GlobalStyles` support theme as a callback value.
      <GlobalStyles styles={typeof styles === 'function' ? (theme) => styles({ theme }) : styles} />
    );
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createUseThemeProps(name: string) {
  return useThemeProps;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function internal_createExtendSxProp() {
  return extendSxProp;
}

export { useTheme };
