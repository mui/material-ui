import * as React from 'react';
import { Theme } from './theme';

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

export default function withStyles<P = {}, ClassNames = {}>(
  style: StyleRules | StyleRulesCallback,
  options?: WithStylesOptions
): (
  component: React.ComponentType<P & { classes: ClassNames }>
) => React.ComponentClass<P>;
