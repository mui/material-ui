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
): {
  /**
   * Decorating a stateless functional component.
   */
  <P>(
    component: React.StatelessComponent<P & WithStyles<ClassKey>>
  ): StyledComponent<P, ClassKey>;

  /**
   * Decorating a class component. This is slightly less type safe than the
   * function decoration case, due to current restrictions on TypeScript
   * decorators (https://github.com/Microsoft/TypeScript/issues/4881). The
   * upshot is that one has to use the non-null assertion operator (`!`) when
   * accessing `props.classes`.
   */
  <P, C extends React.ComponentClass<P & StyledComponentProps<ClassKey>>>(
    component: C
  ): C;
};
