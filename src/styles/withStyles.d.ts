import * as React from 'react';
import { ClassNameMap, StyledComponentProps } from '..';
import { Theme } from './createMuiTheme';

/**
   * This is basically the API of JSS. It defines a Map<string, CSS>,
   * where
   *
   * - the `keys` are the class (names) that will be created
   * - the `values` are objects that represent CSS rules (`React.CSSProperties`).
   */
export type StyleRules<Names extends string = string> = Record<Names, Partial<React.CSSProperties>>;

export type StyleRulesCallback<Names extends string = string> = (theme: Theme) => StyleRules<Names>;

export interface WithStylesOptions {
  withTheme?: boolean;
  name?: string;
}

export type WithStyles<Names extends string = string> = {
  classes: ClassNameMap<Names>
  theme?: Theme
};

export default function withStyles<Names extends string>(
  style: StyleRules<Names> | StyleRulesCallback<Names>,
  options?: WithStylesOptions
): {
  <P>(
    component: React.StatelessComponent<P & WithStyles<Names>>
  ): React.ComponentType<P & StyledComponentProps<Names>>;
  <P, C extends React.ComponentClass<P & StyledComponentProps<Names>>>(
    component: C
  ): C;
};
