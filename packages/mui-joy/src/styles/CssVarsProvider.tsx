import { deepmerge } from '@mui/utils';
import { unstable_createCssVarsProvider as createCssVarsProvider } from '@mui/system';
import extendTheme from './extendTheme';
import { createSoftOverride, createSolidOverride } from './variantUtils';
import type { Theme, DefaultColorScheme, ExtendedColorScheme } from './types';

const shouldSkipGeneratingVar = (keys: string[]) =>
  !!keys[0].match(/^(typography|variants|breakpoints|variantOverrides|variantOverrideConfig)$/) ||
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
    // `variantOverrides` need to be generated after the theme's palette has been calculated.
    mergedTheme.variantOverrides = deepmerge(
      {
        soft: createSoftOverride(mergedTheme),
        solid: createSolidOverride(mergedTheme),
      },
      mergedTheme.variantOverrides,
      { clone: false },
    );
    return mergedTheme;
  },
  shouldSkipGeneratingVar,
});

export { CssVarsProvider, useColorScheme, getInitColorSchemeScript, shouldSkipGeneratingVar };
