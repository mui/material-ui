import * as React from 'react';
import { PropInjector } from '@material-ui/core';
import * as CSS from 'csstype';
import * as JSS from 'jss';

export type CorrectedProperties<Props extends object> = {
  [P in keyof CSS.Properties<number | string>]:
    | CSS.Properties<number | string>[P]
    | ((prop: Props) => CSS.Properties<number | string>[P])
};

export interface CSSProperties<Props extends object> extends CorrectedProperties<Props> {
  // Allow pseudo selectors and media queries
  [k: string]: CorrectedProperties<Props>[keyof CorrectedProperties<Props>] | CSSProperties<Props>;
}

/**
 * This is basically the API of JSS. It defines a Map<string, CSS>,
 * where
 * - the `keys` are the class (names) that will be created
 * - the `values` are objects that represent CSS rules (`React.CSSProperties`).
 *
 * if only `CSSProperties` are matched `Props` are inferred to `any`
 */
export type StyleRules<Props extends object, ClassKey extends string = string> = Record<
  ClassKey,
  CSSProperties<Props> | ((props: Props) => CSSProperties<Props>)
>;

/**
 * @internal
 */
export type StyleRulesCallback<Theme, Props extends object, ClassKey extends string = string> = (
  theme: Theme,
) => StyleRules<Props, ClassKey>;

export type Styles<Theme, Props extends {}, ClassKey extends string = string> =
  | StyleRules<Props, ClassKey>
  | StyleRulesCallback<Theme, Props, ClassKey>;

export interface WithStylesOptions<Theme> extends JSS.StyleSheetFactoryOptions {
  defaultTheme?: Theme;
  flip?: boolean;
  withTheme?: boolean;
  name?: string;
}

export type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>;

/**
 * @internal
 */
export type ClassKeyInferable<Theme, Props extends {}> = string | Styles<Theme, Props>;
export type ClassKeyOfStyles<S> = S extends string
  ? S
  : S extends StyleRulesCallback<any, any, infer K>
  ? K
  : S extends StyleRules<any, infer K>
  ? K
  : never;

/**
 * infers the type of the theme used in the styles
 */
export type PropsOfStyles<S> = S extends Styles<any, infer Props> ? Props : {};
/**
 * infers the type of the props used in the styles
 */
export type ThemeOfStyles<S> = S extends Styles<infer Theme, any> ? Theme : {};

export type WithStyles<
  S extends ClassKeyInferable<any, any>,
  IncludeTheme extends boolean | undefined = false
> = (IncludeTheme extends true ? { theme: ThemeOfStyles<S> } : {}) & {
  classes: ClassNameMap<ClassKeyOfStyles<S>>;
  innerRef?: React.Ref<any> | React.RefObject<any>;
} & PropsOfStyles<S>;

export interface StyledComponentProps<ClassKey extends string = string> {
  classes?: Partial<ClassNameMap<ClassKey>>;
  innerRef?: React.Ref<any> | React.RefObject<any>;
}

export default function withStyles<
  S extends Styles<any, any>,
  Options extends WithStylesOptions<ThemeOfStyles<S>> = {}
>(
  style: S,
  options?: Options,
): PropInjector<WithStyles<S, Options['withTheme']>, StyledComponentProps<ClassKeyOfStyles<S>>>;
