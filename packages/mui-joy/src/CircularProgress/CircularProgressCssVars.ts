const cssVars = {
  thickness: '--CircularProgress-thickness',
  trackThickness: '--CircularProgress-trackThickness',
  progressThickness: '--CircularProgress-progressThickness',
  trackColor: '--CircularProgress-trackColor',
  progressColor: '--CircularProgress-progressColor',
  percent: '--CircularProgress-percent',
  linecap: '--CircularProgress-linecap',
  size: '--CircularProgress-size',
  margin: '--CircularProgress-margin',
  circulation: '--CircularProgress-circulation',
} as const;

type Keys = keyof typeof cssVars extends infer Key
  ? Key extends string
    ? `--CircularProgress-${Key}`
    : never
  : never;

export type CssVarsValuesType = {
  [key in Keys]?: string | number;
};

export default cssVars;
