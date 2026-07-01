/* eslint-disable @typescript-eslint/naming-convention, import/prefer-default-export */
/**
 * InputAdornment density token identities — internal designer knobs (`private_*`
 * per the density RFC). Static literals shared by the styled component AND the
 * `enhance*Density` presets. `gap` = the input-facing margin (start adornment's
 * marginRight / end adornment's marginLeft, one token both sides); `marginTop` =
 * the filled positionStart top offset. Per-size (medium default / small).
 */
export const private_inputAdornmentVars = {
  mediumGap: '--InputAdornment-medium-gap',
  smallGap: '--InputAdornment-small-gap',
  mediumMarginTop: '--InputAdornment-medium-marginTop',
  smallMarginTop: '--InputAdornment-small-marginTop',
} as const;
