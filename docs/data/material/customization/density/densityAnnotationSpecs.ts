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
  BottomNavigation: () => [
    { on: '.MuiBottomNavigation-root', aspect: 'touch-target', token: 'xx-large', root: true, label: 'Bar' },
    { on: '.MuiBottomNavigationAction-root', aspect: 'padding', axis: 'inline', token: 'small', label: 'Action' },
    // Icon over label — a row gap, not a column one.
    { on: '.MuiBottomNavigationAction-root', aspect: 'gap', token: 'xx-small', label: 'Action' },
  ],
  Button: (values) => {
    const height = {
      small: 'touch-target - x-small',
      medium: 'touch-target',
      large: 'touch-target + small',
    }[values.size as string];
    const inline = { small: 'small', medium: 'medium', large: 'large' }[values.size as string];
    return [
      { on: '.MuiButton-root', aspect: 'touch-target', token: height, root: true, label: 'Root' },
      { on: '.MuiButton-root', aspect: 'padding', axis: 'inline', token: inline, root: true, label: 'Root' },
      { on: '.MuiButton-root', aspect: 'gap', token: 'x-small', root: true, label: 'Root' },
      { on: '.MuiButton-startIcon', aspect: 'icon', token: '0.8lh', label: 'Start icon' },
    ];
  },
  Card: () => [
    { on: '.MuiCardHeader-root', aspect: 'padding', axis: 'inline', token: 'medium', root: true, label: 'Header' },
    { on: '.MuiCardHeader-root', aspect: 'gap', token: 'small', root: true, label: 'Header' },
    // Negative: the action is pulled back out of the header's own padding.
    { on: '.MuiCardHeader-action', aspect: 'margin', axis: 'inline', token: '-x-small', label: 'Header action' },
    { on: '.MuiCardHeader-action', aspect: 'margin', axis: 'block', token: '-xx-small', label: 'Header action' },
    { on: '.MuiCardContent-root', aspect: 'padding', axis: 'inline', token: 'medium', root: true, label: 'Content' },
    // `padding: medium` with `paddingTop: 0` — only the bottom band is live.
    { on: '.MuiCardActions-root', aspect: 'padding', axis: 'block', token: 'medium', root: true, label: 'Actions' },
    { on: '.MuiCardActions-root', aspect: 'gap', token: 'x-small', root: true, label: 'Actions' },
  ],
  TextField: (values) => {
    const small = values.size === 'small';
    // The bare InputBase is the only root carrying none of the variant classes.
    const base = '.MuiInputBase-root:not(.MuiInput-root):not(.MuiFilledInput-root):not(.MuiOutlinedInput-root)';
    const baseInput = '.MuiInputBase-input:not(.MuiInput-input):not(.MuiFilledInput-input):not(.MuiOutlinedInput-input)';
    return [
      // Measured, not emitted — four different inputs landing on one number is
      // the whole claim, so each row carries its own beam.
      { on: base, aspect: 'touch-target', root: true, label: 'InputBase' },
      { on: baseInput, aspect: 'padding', axis: 'block', token: small ? 'xx-small' : 'x-small', label: 'InputBase' },
      { on: '.MuiInput-root', aspect: 'touch-target', root: true, label: 'Standard' },
      { on: '.MuiInput-input', aspect: 'padding', axis: 'block', token: small ? 'xx-small' : 'x-small', label: 'Standard' },
      { on: '.MuiFilledInput-root', aspect: 'touch-target', root: true, label: 'Filled' },
      // Asymmetric: `large` on top, `small` underneath — two captions.
      { on: '.MuiFilledInput-input', aspect: 'padding', axis: 'block', label: 'Filled' },
      { on: '.MuiOutlinedInput-root', aspect: 'touch-target', root: true, label: 'Outlined' },
      { on: '.MuiOutlinedInput-input', aspect: 'padding', axis: 'block', token: small ? 'xx-small' : '(touch-target - 1lh) / 2', label: 'Outlined' },
      { on: '.MuiOutlinedInput-root', aspect: 'gap', token: small ? 'xx-small' : 'x-small', root: true, label: 'Outlined' },
      { on: '.MuiFormHelperText-root', aspect: 'margin', axis: 'block', token: 'x-small', label: 'Helper text' },
    ];
  },
};

/** What to draw for a family at the toolbar's current values. */
export function annotationsFor(
  family: string,
  values: Record<string, string | boolean>,
): Annotation[] {
  return DENSITY_ANNOTATIONS[family]?.(values) ?? [];
}
