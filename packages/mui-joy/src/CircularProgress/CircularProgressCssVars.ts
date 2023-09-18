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

const aa = Object.values(cssVars);

type Aaa = typeof aa extends (infer T)[] ? T : never;

export type CssVarsValuesType = {
  [key in Aaa]?: string | number;
};

export default cssVars;
