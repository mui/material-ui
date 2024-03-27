import { GenerateCssVarsType } from '../utils/GenerateCssVarsType';

const linearProgressCssVars = {
  thickness: '--LinearProgress-thickness',
  radius: '--LinearProgress-radius',
  progressThickness: '--LinearProgress-progressThickness',
  progressRadius: '--LinearProgress-progressRadius',
  progressMinWidth: '--LinearProgress-progressMinWidth',
  progressMaxWidth: '--LinearProgress-progressMaxWidth',
  percent: '--LinearProgress-percent',
  circulation: '--LinearProgress-circulation',
} as const;

export type LinearProgressCssVarsType = GenerateCssVarsType<typeof linearProgressCssVars>;

export default linearProgressCssVars;
