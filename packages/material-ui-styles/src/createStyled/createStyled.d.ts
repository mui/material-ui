import {
  ClassKeyOfStyles,
  ClassNameMap,
  Styles,
  ThemeOfStyles,
  WithStylesOptions,
} from '@material-ui/styles/withStyles';

export type ThemeOfRenderProps<R> = unknown;

export type RenderProps<Theme, IncludeTheme extends boolean | undefined> = {
  classes: ClassNameMap<'root'>;
} & (IncludeTheme extends true ? { theme: Theme } : {});

export interface StyledProps<Theme, IncludeTheme extends boolean | undefined = false> {
  children: (props: RenderProps<Theme, IncludeTheme>) => React.ReactNode;
  classes?: ClassNameMap<'root'>;
  theme?: Theme;
}

export default function createStyled<
  S extends Styles<any, any, 'root'>,
  Options extends WithStylesOptions<ClassKeyOfStyles<S>>
>(
  styles: S,
  options?: Options,
): React.ComponentType<StyledProps<ThemeOfStyles<S>, Options['withTheme']>>;
