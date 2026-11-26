import type { Interpolation } from '@mui/system';
import { extendSxProp } from '@mui/system/styleFunctionSx';
import type { Theme } from '../styles/createTheme';
import muiUseTheme from '../styles/useTheme';
import muiStyled from '../styles/styled';
import GlobalStyles from '../GlobalStyles';
import type { GlobalStylesProps } from '../GlobalStyles';

export { css, keyframes } from '@mui/system';

// Local bindings, not re-exports: the bundler would point importers at `../styles/*`,
// and Pigment CSS only transforms `styled`/`useTheme` imported from a `zero-styled` path.
export const styled = muiStyled;

export function globalCss(styles: Interpolation<{ theme: Theme }>) {
  return function GlobalStylesWrapper(props: Record<string, any>) {
    return (
      // Pigment CSS `globalCss` support callback with theme inside an object but `GlobalStyles` support theme as a callback value.
      <GlobalStyles
        styles={
          (typeof styles === 'function'
            ? (theme) => styles({ theme, ...props })
            : styles) as GlobalStylesProps['styles']
        }
      />
    );
  };
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function internal_createExtendSxProp() {
  return extendSxProp;
}

export const useTheme = muiUseTheme;
