import * as React from 'react';
import { PropInjector, CoerceEmptyInterface, IsEmptyInterface } from '@material-ui/types';
import * as CSS from 'csstype';
import * as JSS from 'jss';

export interface CSSProperties extends CSS.Properties<number | string> {
  // Allow pseudo selectors and media queries
  [k: string]: CSS.Properties<number | string>[keyof CSS.Properties] | CSSProperties;
}

export type BaseCreateCSSProperties<Props extends object = {}> = {
  [P in keyof CSS.Properties<number | string>]:
    | CSS.Properties<number | string>[P]
    | ((props: Props) => CSS.Properties<number | string>[P])
};

export interface CreateCSSProperties<Props extends object = {}>
  extends BaseCreateCSSProperties<Props> {
  // Allow pseudo selectors and media queries
  [k: string]:
    | BaseCreateCSSProperties<Props>[keyof BaseCreateCSSProperties<Props>]
    | CreateCSSProperties<Props>;
}

/**
 * This is basically the API of JSS. It defines a Map<string, CSS>,
 * where
 * - the `keys` are the class (names) that will be created
 * - the `values` are objects that represent CSS rules (`React.CSSProperties`).
 *
 * if only `CSSProperties` are matched `Props` are inferred to `any`
 */
export type StyleRules<Props extends object = {}, ClassKey extends string = string> = Record<
  ClassKey,
  IsEmptyInterface<Props> extends true
    ? CSSProperties | (() => CSSProperties)
    : CreateCSSProperties<Props> | ((props: Props) => CreateCSSProperties<Props>)
>;

/**
 * @internal
 */
export type StyleRulesCallback<Theme, Props extends object, ClassKey extends string = string> = (
  theme: Theme,
) => StyleRules<Props, ClassKey>;

export type Styles<Theme, Props extends object, ClassKey extends string = string> =
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
export type ClassKeyInferable<Theme, Props extends object> = string | Styles<Theme, Props>;
export type ClassKeyOfStyles<StylesOrClassKey> = StylesOrClassKey extends string
  ? StylesOrClassKey
  : StylesOrClassKey extends StyleRulesCallback<any, any, infer ClassKey>
  ? ClassKey
  : StylesOrClassKey extends StyleRules<any, infer ClassKey>
  ? ClassKey
  : never;

/**
 * infers the type of the theme used in the styles
 */
export type PropsOfStyles<StylesType> = StylesType extends Styles<any, infer Props>
  ? CoerceEmptyInterface<Props>
  : {};
/**
 * infers the type of the props used in the styles
 */
export type ThemeOfStyles<StylesType> = StylesType extends Styles<infer Theme, any> ? Theme : {};

export type WithStyles<
  StylesType extends ClassKeyInferable<any, any>,
  IncludeTheme extends boolean | undefined = false
> = (IncludeTheme extends true ? { theme: ThemeOfStyles<StylesType> } : {}) & {
  classes: ClassNameMap<ClassKeyOfStyles<StylesType>>;
  innerRef?: React.Ref<any> | React.RefObject<any>;
} & PropsOfStyles<StylesType>;

export interface StyledComponentProps<ClassKey extends string = string> {
  classes?: Partial<ClassNameMap<ClassKey>>;
  innerRef?: React.Ref<any> | React.RefObject<any>;
}

export default function withStyles<
  StylesType extends Styles<any, any>,
  Options extends WithStylesOptions<ThemeOfStyles<StylesType>> = {}
>(
  style: StylesType,
  options?: Options,
): PropInjector<
  WithStyles<StylesType, Options['withTheme']>,
  StyledComponentProps<ClassKeyOfStyles<StylesType>> & PropsOfStyles<StylesType>
>;
