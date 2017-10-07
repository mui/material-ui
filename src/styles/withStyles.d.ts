import * as React from 'react';
import { ClassNameMap, StyledComponentProps, StyledComponent } from '..';
import { Theme } from './createMuiTheme';

/**
   * This is basically the API of JSS. It defines a Map<string, CSS>,
   * where
   *
   * - the `keys` are the class (names) that will be created
   * - the `values` are objects that represent CSS rules (`React.CSSProperties`).
   */
export type StyleRules<ClassKey extends string = string> = Record<ClassKey, Partial<React.CSSProperties>>;

export type StyleRulesCallback<ClassKey extends string = string> = (theme: Theme) => StyleRules<ClassKey>;

export interface WithStylesOptions {
  flip?: boolean;
  withTheme?: boolean;
  name?: string;
}

export type WithStyles<ClassKey extends string = string> = {
  classes: ClassNameMap<ClassKey>
  theme?: Theme
};

export default function withStyles<ClassKey extends string>(
  style: StyleRules<ClassKey> | StyleRulesCallback<ClassKey>,
  options?: WithStylesOptions
): <P>(
  component: React.ComponentType<P & WithStyles<ClassKey>>
) => StyledComponent<P, ClassKey>;
