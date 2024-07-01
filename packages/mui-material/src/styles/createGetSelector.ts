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
    if (theme.defaultColorScheme === colorScheme) {
      if (colorScheme === 'dark') {
        const excludedVariables: typeof css = {};
        excludeVariablesFromRoot(theme.cssVarPrefix).forEach((cssVar) => {
          excludedVariables[cssVar] = css[cssVar];
          delete css[cssVar];
        });
        if (theme.strategy === 'media') {
          return {
            ':root': css,
            '@media (prefers-color-scheme: dark) { :root': excludedVariables,
          };
        }
        if (theme.strategy) {
          return {
            [theme.strategy.replace('%s', colorScheme)]: excludedVariables,
            ':root': css,
          };
        }
        return { ':root': { ...css, ...excludedVariables } };
      }
      if (theme.strategy && theme.strategy !== 'media') {
        return theme.strategy.replace('%s', String(colorScheme));
      }
    } else if (colorScheme) {
      if (theme.strategy === 'media') {
        return `@media (prefers-color-scheme: ${String(colorScheme)}) { :root`;
      }
      if (theme.strategy) {
        return theme.strategy.replace('%s', String(colorScheme));
      }
    }
    return ':root';
  };
