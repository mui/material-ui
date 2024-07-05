import excludeVariablesFromRoot from './excludeVariablesFromRoot';

export default <
    T extends {
      strategy?: 'media' | string;
      colorSchemes?: Record<string, any>;
      defaultColorScheme?: string;
      cssVarPrefix?: string;
    },
  >(
    theme: T,
  ) =>
  (colorScheme: keyof T['colorSchemes'] | undefined, css: Record<string, any>) => {
    let strategy = theme.strategy;
    if (theme.strategy?.startsWith('data-') && !theme.strategy.includes('%s')) {
      // 'data-mui-color-scheme' -> '[data-mui-color-scheme="%s"]'
      strategy = `[${theme.strategy}="%s"]`;
    }
    if (theme.defaultColorScheme === colorScheme) {
      if (colorScheme === 'dark') {
        const excludedVariables: typeof css = {};
        excludeVariablesFromRoot(theme.cssVarPrefix).forEach((cssVar) => {
          excludedVariables[cssVar] = css[cssVar];
          delete css[cssVar];
        });
        if (strategy === 'media') {
          return {
            ':root': css,
            '@media (prefers-color-scheme: dark) { :root': excludedVariables,
          };
        }
        if (strategy) {
          return {
            [strategy.replace('%s', colorScheme)]: excludedVariables,
            ':root': css,
          };
        }
        return { ':root': { ...css, ...excludedVariables } };
      }
    } else if (colorScheme) {
      if (strategy === 'media') {
        return `@media (prefers-color-scheme: ${String(colorScheme)}) { :root`;
      }
      if (strategy) {
        return strategy.replace('%s', String(colorScheme));
      }
    }
    return ':root';
  };
