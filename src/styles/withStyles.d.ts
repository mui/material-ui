import * as React from 'react';
import { StyledComponentProps } from '..';
import { Theme } from './createMuiTheme';

/**
   * This is basically the API of JSS. It defines a Map<string, CSS>,
   * where
   *
   * - the `keys` are the class (names) that will be created
   * - the `values` are objects that represent CSS rules (`React.CSSProperties`).
   */
export interface StyleRules {
  [displayName: string]: Partial<React.CSSProperties>;
}

export type StyleRulesCallback = (theme: Theme) => StyleRules;

export interface WithStylesOptions {
  withTheme?: boolean;
  name?: string;
}

declare function withStyles(
  style: StyleRules | StyleRulesCallback,
  options?: WithStylesOptions
): <
  C extends React.ComponentType<P & { classes: ClassNames; theme?: Theme }>,
  P = {},
  ClassNames = {}
>(
  component: C
) => C & React.ComponentClass<P & StyledComponentProps<ClassNames>>

declare function withStyles<P = {}, ClassNames = {}>(
  style: StyleRules | StyleRulesCallback,
  options?: WithStylesOptions
): (
  component: React.ComponentType<P & { classes: ClassNames; theme?: Theme }>
) => React.ComponentClass<P & StyledComponentProps<ClassNames>>

export default withStyles;
