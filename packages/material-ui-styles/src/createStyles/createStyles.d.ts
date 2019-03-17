import { StyleRules } from '@material-ui/styles/withStyles';

/**
 * This function doesn't really "do anything" at runtime, it's just the identity
 * function. Its only purpose is to defeat TypeScript's type widening when providing
 * style rules to `withStyles` which are a function of the `Theme`.
 *
 * @param styles a set of style mappings
 * @returns the same styles that were passed in
 */
export default function createStyles<C extends string, P extends object>(
  styles: StyleRules<P, C>,
): StyleRules<P, C>;
