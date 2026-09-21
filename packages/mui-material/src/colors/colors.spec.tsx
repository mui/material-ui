import { Color, colors } from '@mui/material';

type KeysEquivalent<T, U> = keyof T extends keyof U
  ? keyof U extends keyof T
    ? true
    : false
  : false;

type ValuesAreLiteral<T> = string extends T[keyof T] ? false : true;

function colorTypeMatches(variants: keyof Color) {
  // Checking that each color has the exact shape as Color
  // we don't use the Color type for these to provide JSDoc for each color
  // in which we preview the color
  const amber: KeysEquivalent<Color, typeof colors.amber> = true;
  const blue: KeysEquivalent<Color, typeof colors.blue> = true;
  const blueGrey: KeysEquivalent<Color, typeof colors.blueGrey> = true;
  const brown: KeysEquivalent<Color, typeof colors.brown> = true;
  // common does not have the `Common` type (nice pun)
  // const common: KeysEquivalent<Color, typeof colors.common> = true;
  const cyan: KeysEquivalent<Color, typeof colors.cyan> = true;
  const deepOrange: KeysEquivalent<Color, typeof colors.deepOrange> = true;
  const deepPurple: KeysEquivalent<Color, typeof colors.deepPurple> = true;
  const green: KeysEquivalent<Color, typeof colors.green> = true;
  const grey: KeysEquivalent<Color, typeof colors.grey> = true;
  const indigo: KeysEquivalent<Color, typeof colors.indigo> = true;
  const lightBlue: KeysEquivalent<Color, typeof colors.lightBlue> = true;
  const lightGreen: KeysEquivalent<Color, typeof colors.lightGreen> = true;
  const lime: KeysEquivalent<Color, typeof colors.lime> = true;
  const orange: KeysEquivalent<Color, typeof colors.orange> = true;
  const pink: KeysEquivalent<Color, typeof colors.pink> = true;
  const purple: KeysEquivalent<Color, typeof colors.purple> = true;
  const red: KeysEquivalent<Color, typeof colors.red> = true;
  const teal: KeysEquivalent<Color, typeof colors.teal> = true;
  const yellow: KeysEquivalent<Color, typeof colors.yellow> = true;
}

function colorValuesAreLiteral() {
  // `as const` on each object keeps the hex literal types the hand-written
  // declarations had, so that e.g. `blue[500]` does not widen to `string`.
  const amber: ValuesAreLiteral<typeof colors.amber> = true;
  const blue: ValuesAreLiteral<typeof colors.blue> = true;
  const blueGrey: ValuesAreLiteral<typeof colors.blueGrey> = true;
  const brown: ValuesAreLiteral<typeof colors.brown> = true;
  const common: ValuesAreLiteral<typeof colors.common> = true;
  const cyan: ValuesAreLiteral<typeof colors.cyan> = true;
  const deepOrange: ValuesAreLiteral<typeof colors.deepOrange> = true;
  const deepPurple: ValuesAreLiteral<typeof colors.deepPurple> = true;
  const green: ValuesAreLiteral<typeof colors.green> = true;
  const grey: ValuesAreLiteral<typeof colors.grey> = true;
  const indigo: ValuesAreLiteral<typeof colors.indigo> = true;
  const lightBlue: ValuesAreLiteral<typeof colors.lightBlue> = true;
  const lightGreen: ValuesAreLiteral<typeof colors.lightGreen> = true;
  const lime: ValuesAreLiteral<typeof colors.lime> = true;
  const orange: ValuesAreLiteral<typeof colors.orange> = true;
  const pink: ValuesAreLiteral<typeof colors.pink> = true;
  const purple: ValuesAreLiteral<typeof colors.purple> = true;
  const red: ValuesAreLiteral<typeof colors.red> = true;
  const teal: ValuesAreLiteral<typeof colors.teal> = true;
  const yellow: ValuesAreLiteral<typeof colors.yellow> = true;
}
