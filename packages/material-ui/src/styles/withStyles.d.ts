import * as React from 'react';
import { CSSProperties, WithStylesOptions } from '@material-ui/styles/withStyles';
import { PropInjector } from '@material-ui/types';
import { Theme } from './createMuiTheme';

export { CSSProperties, WithStylesOptions };

/**
 * This is basically the API of JSS. It defines a Map<string, CSS>,
 * where
 *
 * - the `keys` are the class (names) that will be created
 * - the `values` are objects that represent CSS rules (`React.CSSProperties`).
 */
export type StyleRules<ClassKey extends string = string> = Record<ClassKey, CSSProperties>;

export type StyleRulesCallback<ClassKey extends string = string> = (
  theme: Theme,
) => StyleRules<ClassKey>;

export interface StylesCreator {
  create(theme: Theme, name: string): StyleRules;
  options: { index: number };
  themingEnabled: boolean;
}

export type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>;

export type WithStyles<
  T extends string | StyleRules | StyleRulesCallback = string,
  IncludeTheme extends boolean | undefined = false
> = (IncludeTheme extends true ? { theme: Theme } : {}) & {
  classes: ClassNameMap<
    T extends string
      ? T
      : T extends StyleRulesCallback<infer K>
      ? K
      : T extends StyleRules<infer K>
      ? K
      : never
  >;
};

export interface StyledComponentProps<ClassKey extends string = string> {
  classes?: Partial<ClassNameMap<ClassKey>>;
  innerRef?: React.Ref<any> | React.RefObject<any>;
}

export default function withStyles<
  ClassKey extends string,
  Options extends WithStylesOptions<Theme> = {}
>(
  style: StyleRulesCallback<ClassKey> | StyleRules<ClassKey>,
  options?: Options,
): PropInjector<WithStyles<ClassKey, Options['withTheme']>, StyledComponentProps<ClassKey>>;
