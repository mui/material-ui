import { PropInjector } from '@material-ui/types';
import { Theme } from './createMuiTheme';
import {
  CreateCSSProperties,
  CSSProperties,
  ClassNameMap,
  StyledComponentProps,
  WithStylesOptions,
  StyleRules,
  StyleRulesCallback,
  Styles,
  ClassKeyOfStyles,
} from '@material-ui/styles/withStyles';

export {
  CreateCSSProperties,
  CSSProperties,
  ClassNameMap,
  StyledComponentProps,
  StyleRules,
  Styles,
  WithStylesOptions,
  StyleRulesCallback,
};

export type WithStyles<
  T extends string | Styles<any, any, any> = string,
  IncludeTheme extends boolean | undefined = false
> = (IncludeTheme extends true ? { theme: Theme } : {}) & {
  classes: ClassNameMap<ClassKeyOfStyles<T>>;
};

export default function withStyles<
  ClassKey extends string,
  Options extends WithStylesOptions<Theme> = {},
  Props extends object = {}
>(
  style: Styles<Theme, Props, ClassKey>,
  options?: Options,
): PropInjector<WithStyles<ClassKey, Options['withTheme']>, StyledComponentProps<ClassKey>>;
