import prepareCssVars, { DefaultCssVarsTheme } from './prepareCssVars';

interface Theme extends DefaultCssVarsTheme {
  cssVarPrefix?: string;
  shouldSkipGeneratingVar?: (objectPathKeys: Array<string>, value: string | number) => boolean;
}

function createCssVarsTheme<T extends Theme>(theme: T) {
  const { colorSchemes, cssVarPrefix, shouldSkipGeneratingVar, ...otherTheme } = theme;

  const parserConfig = {
    prefix: cssVarPrefix,
    shouldSkipGeneratingVar,
  };
  const { vars, generateCssVars } = prepareCssVars({ colorSchemes, ...otherTheme }, parserConfig);
  return {
    ...theme,
    vars,
    generateCssVars,
  };
}

export default createCssVarsTheme;
