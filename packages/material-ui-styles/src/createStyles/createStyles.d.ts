import { StyleRules } from '@material-ui/styles/withStyles';

/**
 * This function doesn't really "do anything" at runtime, it's just the identity
 * function. Its only purpose is to defeat TypeScript's type widening when providing
 * style rules to `withStyles` which are a function of the `Theme`.
 *
 * @param styles a set of style mappings
 * @returns the same styles that were passed in
 */
// For TypeScript v3.5 Props has to extend {} instead of object
// See https://github.com/mui-org/material-ui/issues/15942
// and https://github.com/microsoft/TypeScript/issues/31735
export default function createStyles<ClassKey extends string, Props extends {}>(
  styles: StyleRules<Props, ClassKey>,
): StyleRules<Props, ClassKey>;
