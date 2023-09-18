const cssVars = {
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
  return Object.entries(cssVars).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: `--CircularProgress-${value}`,
    };
  }, {}) as {
    [key in keyof typeof cssVars]: `--CircularProgress-${(typeof cssVars)[key]}`;
  };
}

export default getCssVars();
