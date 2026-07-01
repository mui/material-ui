/* eslint-disable @typescript-eslint/naming-convention, import/prefer-default-export */
/**
 * StepLabel density token identity — the icon→label gap (icon container
 * `paddingRight` 8px), over `--comp-iconGap`. The alternativeLabel/vertical
 * position overrides stay literal. `private_*` per the density RFC.
 */
export const private_stepLabelVars = {
  iconGap: '--StepLabel-iconGap',
} as const;
