/* eslint-disable @typescript-eslint/naming-convention, import/prefer-default-export */
/**
 * AccordionDetails density token identities — the content padding (top / inline
 * / bottom differ: `8px 16px 16px` today), over the agnostic `--comp-*` seams.
 * No size axis. `private_*` per the density RFC.
 */
export const private_accordionDetailsVars = {
  topPad: '--AccordionDetails-topPad',
  inlinePad: '--AccordionDetails-inlinePad',
  bottomPad: '--AccordionDetails-bottomPad',
} as const;
