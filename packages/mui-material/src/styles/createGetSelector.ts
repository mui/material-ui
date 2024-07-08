import excludeVariablesFromRoot from './excludeVariablesFromRoot';

export default <
    T extends {
      cssRule?: 'media' | string;
      colorSchemes?: Record<string, any>;
      defaultColorScheme?: string;
      cssVarPrefix?: string;
    },
  >(
    theme: T,
  ) =>
  (colorScheme: keyof T['colorSchemes'] | undefined, css: Record<string, any>) => {
    let rule = theme.cssRule;
    if (theme.cssRule?.startsWith('data-') && !theme.cssRule.includes('%s')) {
      // 'data-mui-color-scheme' -> '[data-mui-color-scheme="%s"]'
      rule = `[${theme.cssRule}="%s"]`;
    }
    if (theme.defaultColorScheme === colorScheme) {
      if (colorScheme === 'dark') {
        const excludedVariables: typeof css = {};
        excludeVariablesFromRoot(theme.cssVarPrefix).forEach((cssVar) => {
          excludedVariables[cssVar] = css[cssVar];
          delete css[cssVar];
        });
        if (rule === 'media') {
          return {
            ':root': css,
            '@media (prefers-color-scheme: dark) { :root': excludedVariables,
          };
        }
        if (rule) {
          return {
            [rule.replace('%s', colorScheme)]: excludedVariables,
            ':root': css,
          };
        }
        return { ':root': { ...css, ...excludedVariables } };
      }
    } else if (colorScheme) {
      if (rule === 'media') {
        return `@media (prefers-color-scheme: ${String(colorScheme)}) { :root`;
      }
      if (rule) {
        return rule.replace('%s', String(colorScheme));
      }
    }
    return ':root';
  };
