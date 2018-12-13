import * as React from 'react';
import { Omit, PropInjector, PropsOf } from '..';
import { Theme } from './createMuiTheme';
import * as CSS from 'csstype';
import * as JSS from 'jss';

export interface CSSProperties extends CSS.Properties<number | string> {
  // Allow pseudo selectors and media queries
  [k: string]: CSS.Properties<number | string>[keyof CSS.Properties] | CSSProperties;
}

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

export interface WithStylesOptions<ClassKey extends string = string>
  extends JSS.CreateStyleSheetOptions<ClassKey> {
  flip?: boolean;
  withTheme?: boolean;
  name?: string;
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
  innerRef?: React.Ref<any> | React.RefObject<any>;
};

export interface StyledComponentProps<ClassKey extends string = string> {
  classes?: Partial<ClassNameMap<ClassKey>>;
  innerRef?: React.Ref<any> | React.RefObject<any>;
}

export default function withStyles<
  ClassKey extends string,
  Options extends WithStylesOptions<ClassKey> = {}
>(
  style: StyleRulesCallback<ClassKey> | StyleRules<ClassKey>,
  options?: Options,
): PropInjector<WithStyles<ClassKey, Options['withTheme']>, StyledComponentProps<ClassKey>>;
