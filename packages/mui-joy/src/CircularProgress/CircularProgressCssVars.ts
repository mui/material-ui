import { CssVarsValuesType } from '../utils/CssVarsType';

const circularProgressCssVars = {
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

export type CircularProgressCssVarsType = CssVarsValuesType<
  keyof typeof circularProgressCssVars,
  'CircularProgress'
>;

export default circularProgressCssVars;
