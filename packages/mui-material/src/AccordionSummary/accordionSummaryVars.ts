/* eslint-disable @typescript-eslint/naming-convention, import/prefer-default-export */
/**
 * AccordionSummary density token identities — internal designer knobs
 * (`private_*` per the density RFC). The header's collapsed/expanded min-height
 * (sizing → raw px) + inline padding + the content's block margin (spacing).
 * The content margin must reduce alongside min-height, else it (not min-height)
 * binds the header height. Seams (`--comp-*`) + defaults (`--_*`) are plumbing.
 */
export const private_accordionSummaryVars = {
  minHeight: '--AccordionSummary-minHeight',
  expandedMinHeight: '--AccordionSummary-expandedMinHeight',
  inlinePad: '--AccordionSummary-inlinePad',
  marginBlock: '--AccordionSummary-marginBlock',
  expandedMarginBlock: '--AccordionSummary-expandedMarginBlock',
} as const;
