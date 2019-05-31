import * as React from 'react';
import { PropInjector, Omit } from '@material-ui/types';
import { Theme } from './createMuiTheme';
import * as CSS from 'csstype';
import * as JSS from 'jss';
import {
  CreateCSSProperties,
  CSSProperties,
  ClassNameMap,
  StyledComponentProps,
  WithStylesOptions as DefaultWithStylesOptions,
} from '@material-ui/styles/withStyles';

export { CreateCSSProperties, CSSProperties, ClassNameMap, StyledComponentProps };

/**
 * This is basically the API of JSS. It defines a Map<string, CSS>,
 * where
 *
 * - the `keys` are the class (names) that will be created
 * - the `values` are objects that represent CSS rules (`React.CSSProperties`).
 */
export type StyleRules<ClassKey extends string = string, Props extends object = {}> = Record<
  ClassKey,
  CreateCSSProperties<Props> | ((props: Props) => CreateCSSProperties<Props>)
>;

export type StyleRulesCallback<ClassKey extends string = string, Props extends object = {}> = (
  theme: Theme,
) => StyleRules<ClassKey, Props>;

export type WithStylesOptions = Omit<DefaultWithStylesOptions<Theme>, 'defaultTheme'>;

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

export default function withStyles<
  ClassKey extends string,
  Options extends WithStylesOptions = {},
  Props extends object = {}
>(
  style: StyleRulesCallback<ClassKey, Props> | StyleRules<ClassKey, Props>,
  options?: Options,
): PropInjector<WithStyles<ClassKey, Options['withTheme']>, StyledComponentProps<ClassKey>>;
