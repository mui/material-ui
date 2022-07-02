import { deepmerge } from '@mui/utils';
import { unstable_createCssVarsProvider as createCssVarsProvider } from '@mui/system';
import extendTheme from './extendTheme';
import { createTextOverrides, createContainedOverrides } from './variantUtils';
import type { Theme, DefaultColorScheme, ExtendedColorScheme } from './types';

const { CssVarsProvider, useColorScheme, getInitColorSchemeScript } = createCssVarsProvider<
  DefaultColorScheme | ExtendedColorScheme,
  Theme
>({
  theme: extendTheme(),
  attribute: 'data-joy-color-scheme',
  modeStorageKey: 'joy-mode',
  colorSchemeStorageKey: 'joy-color-scheme',
  defaultColorScheme: {
    light: 'light',
    dark: 'dark',
  },
  prefix: 'joy',
  resolveTheme: (mergedTheme: Theme) => {
    mergedTheme.variants = deepmerge(
      {
        // variant overrides
        plainOverrides: createTextOverrides(mergedTheme),
        outlinedOverrides: createTextOverrides(mergedTheme),
        softOverrides: createTextOverrides(mergedTheme),
        solidOverrides: createContainedOverrides(mergedTheme),
      } as typeof mergedTheme.variants,
      mergedTheme.variants,
      { clone: false },
    );
    return mergedTheme;
  },
  shouldSkipGeneratingVar: (keys) =>
    keys[0] === 'typography' ||
    keys[0] === 'variants' ||
    keys[0] === 'focus' ||
    keys[0] === 'breakpoints',
});

export { CssVarsProvider, useColorScheme, getInitColorSchemeScript };
