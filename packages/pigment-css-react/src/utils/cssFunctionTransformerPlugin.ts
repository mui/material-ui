import { declare } from '@babel/helper-plugin-utils';
import { unstable_defaultSxConfig as defaultSxConfig } from '@mui/system/styleFunctionSx';
import get from 'lodash/get';
import type { PluginCustomOptions } from './cssFnValueToVariable';

type BabelPluginOptions = {
  styleKey: string;
  options: PluginCustomOptions;
};

/**
 * Replaces all usage of theme key strings inside runtime functions with it's equivalent css variable.
 * For ex, for this function
 * ```ts
 * (props: any) => (props.isRed ? 'primary.main' : 'secondary.main')
 * ```
 * The output will be
 * ```ts
 * (props) => (props.isRed ? 'var(--mui-palette-primary-main)' : 'var(--mui-palette-secondary-main)')
 * ```
 */
const cssFunctionTransformerPlugin = declare<BabelPluginOptions>((api, pluginOptions) => {
  const { types: t } = api;
  const {
    options: { themeArgs: { theme } = {} },
    styleKey,
  } = pluginOptions;
  const config = theme?.unstable_sxConfig ?? defaultSxConfig;
  const cssPropOptions = config[styleKey];
  const themeKey = cssPropOptions?.themeKey;
  const finalPrefix = theme?.cssVarPrefix || '';

  return {
    name: '@pigmentcss/zero-internal/cssFunctionTransformerPlugin',
    visitor: {
      // @TODO - Maybe add support for plain strings in template
      // literals as well.
      StringLiteral(path) {
        const val = path.node.value;
        if (val.startsWith('var(') || !val.includes('.')) {
          return;
        }
        if (themeKey === 'typography' && val === 'inherit') {
          return;
        }
        const propertyThemeKey = themeKey ?? val.split('.')[0];
        const themeValue =
          get(theme, `${propertyThemeKey}.${val}`) ??
          (theme?.vars ? get(theme.vars, `${propertyThemeKey}.${val}`) : undefined);
        if (!themeValue) {
          console.warn(
            `MUI: Value for key: ${val} does not exist in "theme.${propertyThemeKey}" or "theme.vars.${propertyThemeKey}"`,
          );
        }
        const themeKeyArr = val.split('.').join('-');
        path.replaceWith(
          t.stringLiteral(`var(--${finalPrefix}${propertyThemeKey}-${themeKeyArr})`),
        );
      },
    },
  };
});

export { cssFunctionTransformerPlugin };
