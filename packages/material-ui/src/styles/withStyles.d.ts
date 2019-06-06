import * as React from 'react';
import { PropInjector } from '@material-ui/types';
import { Theme } from './createMuiTheme';
import {
  CreateCSSProperties,
  CSSProperties,
  ClassNameMap,
  StyledComponentProps,
  WithStylesOptions,
  StyleRules,
  StyleRulesCallback as DefaultStyleRulesCallback,
  Styles as DefaultStyles,
  ClassKeyOfStyles,
} from '@material-ui/styles/withStyles';

export {
  CreateCSSProperties,
  CSSProperties,
  ClassNameMap,
  StyledComponentProps,
  StyleRules,
  WithStylesOptions,
};

/**
 * @internal
 */
export type StyleRulesCallback<
  ClassKey extends string = string,
  Props extends object = {}
> = DefaultStyleRulesCallback<Theme, Props, ClassKey>;

export type Styles<ClassKey extends string = string, Props extends object = {}> = DefaultStyles<
  Theme,
  Props,
  ClassKey
>;

export type WithStyles<
  T extends string | Styles = string,
  IncludeTheme extends boolean | undefined = false
> = (IncludeTheme extends true ? { theme: Theme } : {}) & {
  classes: ClassNameMap<ClassKeyOfStyles<T>>;
};

export default function withStyles<
  ClassKey extends string,
  Options extends WithStylesOptions<Theme> = {},
  Props extends object = {}
>(
  style: Styles<ClassKey, Props>,
  options?: Options,
): PropInjector<WithStyles<ClassKey, Options['withTheme']>, StyledComponentProps<ClassKey>>;
