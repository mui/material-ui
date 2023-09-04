import { declare } from '@babel/helper-plugin-utils';
import defaultSxConfig from '@mui/system/styleFunctionSx/defaultSxConfig';
import get from 'lodash.get';
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
    options: { cssVariablesPrefix = 'mui', themeArgs: { theme } = {} },
    styleKey,
  } = pluginOptions;
  const config = theme?.unstable_sxConfig ?? defaultSxConfig;
  const cssPropOptions = config[styleKey];
  const { themeKey } = cssPropOptions;
  if (!theme || !config || !cssPropOptions || !themeKey) {
    return {
      name: '@mui/zero-internal/cssFunctionTransformerPlugin',
      visitor: {},
    };
  }
  const finalPrefix = cssVariablesPrefix ? `${cssVariablesPrefix}-` : '';

  return {
    name: '@mui/zero-internal/cssFunctionTransformerPlugin',
    visitor: {
      Program: {
        exit(programPath) {
          const expression = programPath.get('body')[0];
          if (!expression.isExpressionStatement()) {
            return;
          }
          const arrowFnExpression = expression.get('expression');
          if (
            !arrowFnExpression.isArrowFunctionExpression() &&
            !arrowFnExpression.isFunctionExpression()
          ) {
            return;
          }
          // @NOTE: Very quick and dirty way of checking usage of `theme`
          // variable inside the function. May give false positives in
          // some cases. Refine over time as bugs are reported.
          arrowFnExpression.traverse({
            Identifier(path) {
              const name = path.node.name;
              const binding = path.scope.getBinding(name);
              if (name === 'theme' && !binding) {
                throw new Error(
                  'You cannot use `theme` or other arguments inside runtime functions. Please use token shorthands (like `primary.main` for `theme.palette.primary.main`) if you want to access theme values.',
                );
              }
            },
          });
        },
      },
      // @TODO - Maybe add support for plain strings in template
      // literals as well.
      StringLiteral(path) {
        const val = path.node.value;
        if (themeKey === 'typography' && val === 'inherit') {
          return;
        }
        const themeValue = get(theme, `${themeKey}.${val}`);
        if (typeof themeValue === 'undefined') {
          return;
        }
        const themeKeyArr = val.split('.').join('-');
        path.replaceWith(t.stringLiteral(`var(--${finalPrefix}${themeKey}-${themeKeyArr})`));
      },
    },
  };
});

export { cssFunctionTransformerPlugin };
