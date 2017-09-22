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
export type StyleRules<Names extends string> = {
  [Name in Names]: Partial<React.CSSProperties>;
}

export type StyleRulesCallback<Names extends string> = (theme: Theme) => StyleRules<Names>;

export interface WithStylesOptions {
  withTheme?: boolean;
  name?: string;
}

declare function withStyles<Names extends string>(
  style: StyleRules<Names> | StyleRulesCallback<Names>,
  options?: WithStylesOptions
): <P>(
  component: React.ComponentType<P & { classes: Record<Names, string>; theme?: Theme }>
) => React.ComponentType<P & StyledComponentProps<Record<Names, string>>>

export default withStyles;
