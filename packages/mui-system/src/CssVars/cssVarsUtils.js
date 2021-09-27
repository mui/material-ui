export const toCssVar = (key, prefix) => {
  let cssVar = Array.isArray(key)
    ? `--${key.join('-')}`
    : `--${key.toString().replace(/\./g, '-')}`;
  if (prefix) {
    cssVar = cssVar.replace('--', `--${prefix}-`);
  }
  return cssVar;
};

export const CssVarsBuilder = (object, options = {}) => {
  const { prefix, formatter = toCssVar, shouldSkipKey } = options || {};
  const result = { css: {}, vars: Array.isArray(object) ? [] : {} };
  Object.entries(object).forEach(([key, value]) => {
    if (shouldSkipKey && shouldSkipKey(key)) {
      return;
    }
    if (['number', 'string'].indexOf(typeof value) !== -1) {
      const cssVar = formatter(key, prefix);
      result.css[cssVar] = value;
      result.vars[cssVar.replace('--', '').replace(`${prefix}-`, '')] = `var(${cssVar})`;
    }
  });
  return result;
};
