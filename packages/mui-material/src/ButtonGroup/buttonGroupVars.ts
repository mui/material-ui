/* eslint-disable @typescript-eslint/naming-convention, import/prefer-default-export */
/**
 * ButtonGroup density token identity — the grouped buttons' `min-width` floor
 * (40px today), over `--comp-minWidth` (raw px per preset). The buttons' own
 * padding density comes from Button (already tokenized). `private_*`.
 */
export const private_buttonGroupVars = {
  minWidth: '--ButtonGroup-minWidth',
} as const;
