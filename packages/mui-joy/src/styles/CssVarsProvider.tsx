import { deepmerge } from '@mui/utils';
import { unstable_createCssVarsProvider as createCssVarsProvider } from '@mui/system';
import extendTheme from './extendTheme';
import {
  createVariant,
  createPlainOverride,
  createSoftOverride,
  createSolidOverride,
} from './variantUtils';
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
    // `variants` need to be generated after the theme's palette has been calculated.
    mergedTheme.variants = deepmerge(
      {
        plain: createVariant('plain', mergedTheme),
        plainHover: createVariant('plainHover', mergedTheme),
        plainActive: createVariant('plainActive', mergedTheme),
        plainDisabled: createVariant('plainDisabled', mergedTheme),
        outlined: createVariant('outlined', mergedTheme),
        outlinedHover: createVariant('outlinedHover', mergedTheme),
        outlinedActive: createVariant('outlinedActive', mergedTheme),
        outlinedDisabled: createVariant('outlinedDisabled', mergedTheme),
        soft: createVariant('soft', mergedTheme),
        softHover: createVariant('softHover', mergedTheme),
        softActive: createVariant('softActive', mergedTheme),
        softDisabled: createVariant('softDisabled', mergedTheme),
        solid: createVariant('solid', mergedTheme),
        solidHover: createVariant('solidHover', mergedTheme),
        solidActive: createVariant('solidActive', mergedTheme),
        solidDisabled: createVariant('solidDisabled', mergedTheme),
      },
      mergedTheme.variants,
      { clone: false },
    );

    // `variantOverrides` need to be generated after the theme's palette has been calculated.
    mergedTheme.variantOverrides = deepmerge(
      {
        plain: createPlainOverride(mergedTheme),
        outlined: createPlainOverride(mergedTheme),
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
