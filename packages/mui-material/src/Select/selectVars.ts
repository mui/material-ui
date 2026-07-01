/* eslint-disable @typescript-eslint/naming-convention, import/prefer-default-export */
/**
 * Select density token identity — the content-box `min-height` floor (`1.4375em`
 * today, the text line-height). A single agnostic seam (no size layer). Sizing →
 * raw px per preset; the Select's real padding density comes from its input
 * variant (OutlinedInput/FilledInput/Input, all tokenized). `private_*`.
 */
export const private_selectVars = {
  minHeight: '--Select-minHeight',
} as const;
