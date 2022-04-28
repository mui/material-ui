import { deepmerge } from '@mui/utils';
import { unstable_createCssVarsProvider as createCssVarsProvider } from '@mui/system';
import { Theme, DefaultColorScheme, ExtendedColorScheme, FontSize } from './types';
import { Components } from './components';
import extendTheme from './extendTheme';
import { createVariant, createTextOverrides, createContainedOverrides } from './variantUtils';

const { CssVarsProvider, useColorScheme, getInitColorSchemeScript } = createCssVarsProvider<
  DefaultColorScheme | ExtendedColorScheme,
  Theme
>({
  theme: {
    ...extendTheme(),
    components: {
      // TODO: find a way to abstract SvgIcon out of @mui/material
      MuiSvgIcon: {
        defaultProps: {
          fontSize: 'xl',
        },
        styleOverrides: {
          root: ({ ownerState, theme }) => {
            const instanceFontSize = ownerState.instanceFontSize as 'inherit' | keyof FontSize;
            return {
              color: 'var(--Icon-color)',
              ...(ownerState.fontSize &&
                ownerState.fontSize !== 'inherit' && {
                  fontSize: `var(--Icon-fontSize, ${theme.fontSize[ownerState.fontSize]})`,
                }),
              ...(ownerState.color &&
                ownerState.color !== 'inherit' && {
                  color: theme.vars.palette[ownerState.color].plainColor,
                }),
              ...(instanceFontSize &&
                instanceFontSize !== 'inherit' && {
                  '--Icon-fontSize': theme.vars.fontSize[instanceFontSize],
                }),
            };
          },
        },
      },
    } as Components<Theme>,
  },
  defaultColorScheme: {
    light: 'light',
    dark: 'dark',
  },
  prefix: 'joy',
  resolveTheme: (mergedTheme: Theme) => {
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
