import { createTheme } from '@mui/material/styles';
import { SpacingKey } from '@mui/system';

// densityScale.ts augments @mui/system's SpacingKeyOverrides with the scale keys
// (+ their negated pulls) so `theme.spacing()` surfaces them in autocompletion.
// If the module augmentation ever stops merging, SpacingKey collapses to `never`
// and every call below fails to compile.
function takesKey(key: SpacingKey) {
  return key;
}
const keys: SpacingKey[] = [
  'xx-small',
  'x-small',
  'small',
  'medium',
  'large',
  'x-large',
  'xx-large',
  '-xx-small',
  '-x-small',
  '-small',
  '-medium',
  '-large',
  '-x-large',
  '-xx-large',
];
keys.forEach((key) => takesKey(key));
// @ts-expect-error — not a registered spacing key
takesKey('tiny');
// The sizing constants are emitted as plain px and are deliberately NOT
// spacing keys, so neither ever reaches theme.spacing() or sx.
// @ts-expect-error — sizing constant, not a spacing key
takesKey('touch-target');
// @ts-expect-error — sizing constant, not a spacing key
takesKey('icon-target');

// Keys, negated keys, numbers, raw CSS and mixed args all type-check on
// theme.spacing() — with or without a density preset applied — and return string.
function takesString(value: string) {
  return value;
}
const theme = createTheme();
takesString(theme.spacing('small'));
takesString(theme.spacing('-x-small'));
takesString(theme.spacing('x-large', 2));
takesString(theme.spacing(1, 'auto'));
// raw CSS stays first-class — unregistered strings pass through by design
takesString(theme.spacing('12px'));
takesString(theme.spacing('small', 2, 'auto', '3px'));
