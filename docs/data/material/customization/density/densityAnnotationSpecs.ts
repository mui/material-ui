import { Annotation } from './densityAnnotations';

/**
 * What to measure on each family, and what the preset authored for it. Every
 * entry is cross-checked against the emit table, so a `token` is the expression
 * `enhanceDensity` actually writes — never a private `--_*` var, and left off
 * entirely when the authored value is a composite of them.
 *
 * A spec is a function of the toolbar's values, because some rows only exist
 * under one variant.
 */
export const DENSITY_ANNOTATIONS: Record<
  string,
  (values: Record<string, string | boolean>) => Annotation[]
> = {
  Accordion: () => [
    {
      on: '.MuiAccordionSummary-root',
      aspect: 'touch-target',
      token: 'touch-target',
      root: true,
      label: 'Summary',
    },
    {
      on: '.MuiAccordionSummary-root',
      aspect: 'padding',
      axis: 'inline',
      token: 'x-small',
      root: true,
      label: 'Summary',
    },
    { on: '.MuiAccordionSummary-content', aspect: 'gap', token: 'x-small', label: 'Summary content' },
    {
      on: '.MuiAccordionDetails-root',
      aspect: 'padding',
      axis: 'inline',
      token: 'small',
      root: true,
      label: 'Details',
    },
    // `xx-small` on top, `small` underneath — the two bands get their own captions.
    {
      on: '.MuiAccordionDetails-root',
      aspect: 'padding',
      axis: 'block',
      root: true,
      label: 'Details',
    },
  ],
};

/** What to draw for a family at the toolbar's current values. */
export function annotationsFor(
  family: string,
  values: Record<string, string | boolean>,
): Annotation[] {
  return DENSITY_ANNOTATIONS[family]?.(values) ?? [];
}
