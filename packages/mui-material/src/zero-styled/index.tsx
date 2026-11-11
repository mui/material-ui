import type { Interpolation } from '@mui/system';
import { GlobalStyles as SystemGlobalStyles } from '@mui/system';
import { extendSxProp } from '@mui/system/styleFunctionSx';
import type { Theme } from '../styles/createTheme';
import useTheme from '../styles/useTheme';
import type { GlobalStylesProps } from '../GlobalStyles';
import defaultTheme from '../styles/defaultTheme';
import THEME_ID from '../styles/identifier';

export { css, keyframes } from '@mui/system';

export { default as styled } from '../styles/styled';

export function globalCss(styles: Interpolation<{ theme: Theme }>) {
  return function GlobalStylesWrapper(props: Record<string, any>) {
    return (
      // Pigment CSS `globalCss` support callback with theme inside an object but `GlobalStyles` support theme as a callback value.
      <SystemGlobalStyles
        styles={
          (typeof styles === 'function'
            ? (theme: Theme) => styles({ theme, ...props })
            : styles) as GlobalStylesProps['styles']
        }
        defaultTheme={defaultTheme}
        themeId={THEME_ID}
        // Material UI's own global styles, like `CssBaseline`, go in `mui.global`, below the app's.
        internal_baseline
      />
    );
  };
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function internal_createExtendSxProp() {
  return extendSxProp;
}

export { useTheme };
