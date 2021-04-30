import { PropInjector } from '@material-ui/types';
import { Theme } from './createTheme';
import {
  CreateCSSProperties,
  CSSProperties,
  ClassNameMap,
  StyledComponentProps,
  WithStylesOptions,
  StyleRules as ActualStyleRules,
  StyleRulesCallback,
  Styles,
  ClassKeyOfStyles,
  BaseCSSProperties,
} from '@material-ui/styles/withStyles';

export {
  CreateCSSProperties,
  CSSProperties,
  ClassNameMap,
  StyledComponentProps,
  Styles,
  WithStylesOptions,
  StyleRulesCallback,
  BaseCSSProperties,
};

/**
 * Adapter for `StyleRules` from `@material-ui/styles` for backwards compatibility.
 * Order of generic arguments is just reversed.
 *
 * TODO: to normalize in v5
 */
export type StyleRules<
  ClassKey extends string = string,
  Props extends object = {}
> = ActualStyleRules<Props, ClassKey>;

export type WithStyles<
  StylesOrClassKey extends string | Styles<any, any, any> = string,
  IncludeTheme extends boolean | undefined = false
> = (IncludeTheme extends true ? { theme: Theme } : {}) & {
  classes: ClassNameMap<ClassKeyOfStyles<StylesOrClassKey>>;
};

export default function withStyles<
  ClassKey extends string,
  Options extends WithStylesOptions<Theme> = {},
  Props extends object = {}
>(
  style: Styles<Theme, Props, ClassKey>,
  options?: Options
): PropInjector<WithStyles<ClassKey, Options['withTheme']>, StyledComponentProps<ClassKey> & Props>;
