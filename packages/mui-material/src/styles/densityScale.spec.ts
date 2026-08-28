import { createTheme, SxProps, Theme } from '@mui/material/styles';
import { AliasesCSSProperties, OverwriteCSSProperties, SpacingKey } from '@mui/system';

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
  'touch-target',
  '-xx-small',
  '-x-small',
  '-small',
  '-medium',
  '-large',
  '-x-large',
  '-xx-large',
  '-touch-target',
];
keys.forEach((key) => takesKey(key));
// @ts-expect-error — not a registered spacing key
takesKey('tiny');

// Keys, negated keys, numbers, raw CSS and mixed args all type-check on
// theme.spacing() — with or without a density preset applied — and return string.
function takesString(value: string) {
  return value;
}
const theme = createTheme();
takesString(theme.spacing('small'));
takesString(theme.spacing('-x-small'));
takesString(theme.spacing('touch-target', 2));
takesString(theme.spacing(1, 'auto'));
// raw CSS stays first-class — unregistered strings pass through by design
takesString(theme.spacing('12px'));
takesString(theme.spacing('small', 2, 'auto', '3px'));

// The scale names also reach the sx spacing props. `Extract` only matches a
// LITERAL union member, so these fail to compile if `SpacingKey` ever stops
// being wired into the alias / standard property types — which is exactly what
// surfaces the names in autocompletion (csstype's `string & {}` cannot).
const sxAlias: Extract<AliasesCSSProperties['p'], 'small'> = 'small';
const sxNegated: Extract<AliasesCSSProperties['mx'], '-x-small'> = '-x-small';
const sxStandard: Extract<OverwriteCSSProperties['gap'], 'touch-target'> = 'touch-target';
const sxProp: SxProps<Theme> = { p: 'small', mx: '-x-small', gap: 'touch-target' };

export { sxAlias, sxNegated, sxStandard, sxProp };

// Raw CSS, multipliers and keywords stay assignable on the same props.
const sxRaw: SxProps<Theme> = { p: '2rem', m: 'auto', gap: 8, px: 0, py: '50%' };

export { sxRaw };
