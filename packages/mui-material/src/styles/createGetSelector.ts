import excludeVariablesFromRoot from './excludeVariablesFromRoot';

export default <
    T extends {
      attribute: string;
      colorSchemeSelector: string;
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
        return {
          [`[${theme.attribute}="${String(colorScheme)}"]`]: excludedVariables,
          [theme.colorSchemeSelector!]: css,
        };
      }
      return `${theme.colorSchemeSelector}, [${theme.attribute}="${String(colorScheme)}"]`;
    }
    if (colorScheme) {
      return `[${theme.attribute}="${String(colorScheme)}"]`;
    }
    return theme.colorSchemeSelector;
  };
