const cssVarsConsts = {
  thickness: 'thickness',
  trackThickness: 'trackThickness',
  progressThickness: 'progressThickness',
  trackColor: 'trackColor',
  progressColor: 'progressColor',
  percent: 'percent',
  linecap: 'linecap',
  size: 'size',
  margin: 'margin',
  circulation: 'circulation',
} as const;

function getCssVars() {
  return Object.entries(cssVarsConsts).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: `--CircularProgress-${value}`,
    };
  }, {}) as {
    [key in keyof typeof cssVarsConsts]: `--CircularProgress-${(typeof cssVarsConsts)[key]}`;
  };
}

const cssVars = getCssVars();

type Keys = keyof typeof cssVarsConsts extends infer Key
  ? Key extends string
    ? `--CircularProgress-${Key}`
    : never
  : never;

export type CssVarsValuesType = {
  [key in Keys]?: string | number;
};

export default cssVars;
