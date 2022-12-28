import * as mdTheme from '@mui/md-theme';

type KeysEquivalent<T, U> = keyof T extends keyof U
  ? keyof U extends keyof T
    ? true
    : false
  : false;

function colorTypeMatches(variants: keyof mdTheme.Color) {
  // Checking that each color has the exact shape as Color
  // we don't use the Color type for these to provide JSDoc for each color
  // in which we preview the color
  const amber: KeysEquivalent<mdTheme.Color, typeof mdTheme.amber> = true;
  const blue: KeysEquivalent<mdTheme.Color, typeof mdTheme.blue> = true;
  const blueGrey: KeysEquivalent<mdTheme.Color, typeof mdTheme.blueGrey> = true;
  const brown: KeysEquivalent<mdTheme.Color, typeof mdTheme.brown> = true;
  // common does not have the `Common` type (nice pun)
  // const common: KeysEquivalent<mdTheme.Color, typeof mdTheme.common> = true;
  const cyan: KeysEquivalent<mdTheme.Color, typeof mdTheme.cyan> = true;
  const deepOrange: KeysEquivalent<mdTheme.Color, typeof mdTheme.deepOrange> = true;
  const deepPurple: KeysEquivalent<mdTheme.Color, typeof mdTheme.deepPurple> = true;
  const green: KeysEquivalent<mdTheme.Color, typeof mdTheme.green> = true;
  const grey: KeysEquivalent<mdTheme.Color, typeof mdTheme.grey> = true;
  const indigo: KeysEquivalent<mdTheme.Color, typeof mdTheme.indigo> = true;
  const lightBlue: KeysEquivalent<mdTheme.Color, typeof mdTheme.lightBlue> = true;
  const lightGreen: KeysEquivalent<mdTheme.Color, typeof mdTheme.lightGreen> = true;
  const lime: KeysEquivalent<mdTheme.Color, typeof mdTheme.lime> = true;
  const orange: KeysEquivalent<mdTheme.Color, typeof mdTheme.orange> = true;
  const pink: KeysEquivalent<mdTheme.Color, typeof mdTheme.pink> = true;
  const purple: KeysEquivalent<mdTheme.Color, typeof mdTheme.purple> = true;
  const red: KeysEquivalent<mdTheme.Color, typeof mdTheme.red> = true;
  const teal: KeysEquivalent<mdTheme.Color, typeof mdTheme.teal> = true;
  const yellow: KeysEquivalent<mdTheme.Color, typeof mdTheme.yellow> = true;
}
