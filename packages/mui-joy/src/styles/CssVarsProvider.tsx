import { deepmerge } from '@mui/utils';
import {
  unstable_createCssVarsProvider as createCssVarsProvider,
  unstable_styleFunctionSx as styleFunctionSx,
} from '@mui/system';
import extendTheme from './extendTheme';
import { createSoftInversion, createSolidInversion } from './variantUtils';
import type { Theme, DefaultColorScheme, ExtendedColorScheme, SxProps } from './types';

const shouldSkipGeneratingVar = (keys: string[]) =>
  !!keys[0].match(/^(typography|variants|breakpoints|colorInversion|colorInversionConfig)$/) ||
  (keys[0] === 'palette' && !!keys[1]?.match(/^(mode)$/)) ||
  (keys[0] === 'focus' && keys[1] !== 'thickness');

const { CssVarsProvider, useColorScheme, getInitColorSchemeScript } = createCssVarsProvider<
  DefaultColorScheme | ExtendedColorScheme
>({
  theme: extendTheme(),
  attribute: 'data-joy-color-scheme',
  modeStorageKey: 'joy-mode',
  colorSchemeStorageKey: 'joy-color-scheme',
  defaultColorScheme: {
    light: 'light',
    dark: 'dark',
  },
  resolveTheme: (mergedTheme: Theme) => {
    // `colorInversion` need to be generated after the theme's palette has been calculated.
    mergedTheme.colorInversion = deepmerge(
      {
        soft: createSoftInversion(mergedTheme),
        solid: createSolidInversion(mergedTheme),
      },
      mergedTheme.colorInversion,
      { clone: false },
    );

    // TOOD remove this intermediary function call.
    mergedTheme.unstable_sx = function sx(props: SxProps) {
      return styleFunctionSx({ sx: props, theme: this });
    };
    return mergedTheme;
  },
  shouldSkipGeneratingVar,
});

export { CssVarsProvider, useColorScheme, getInitColorSchemeScript, shouldSkipGeneratingVar };
