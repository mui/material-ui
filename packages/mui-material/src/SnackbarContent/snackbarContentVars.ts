/* eslint-disable @typescript-eslint/naming-convention, import/prefer-default-export */
/**
 * SnackbarContent density token identities — the root block/inline padding
 * (`6px 16px`), over the agnostic `--comp-*` seams (no size axis). The message
 * vertical alignment padding + action gap stay literal. `private_*`.
 */
export const private_snackbarContentVars = {
  blockPad: '--SnackbarContent-blockPad',
  inlinePad: '--SnackbarContent-inlinePad',
} as const;
