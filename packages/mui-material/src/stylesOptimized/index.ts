import { DistributiveOmit } from '@mui/types';

export { default as createTheme } from './createTheme';
export {
  BaseTheme,
  CssThemeVariables,
  CssVarsThemeOptions,
  ThemeComponents,
  ThemeOptions,
  Theme,
} from './createTheme';

export type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>;
export interface StyledComponentProps<ClassKey extends string = string> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ClassNameMap<ClassKey>>;
}

/**
 * All standard components exposed by `material-ui` are `StyledComponents` with
 * certain `classes`, on which one can also set a top-level `className` and inline
 * `style`.
 * @deprecated will be removed in v5 for internal usage only
 */
export type StandardProps<
  ComponentProps,
  ClassKey extends string,
  Removals extends keyof ComponentProps = never,
> = DistributiveOmit<ComponentProps, 'classes' | Removals> &
  StyledComponentProps<ClassKey> & {
    className?: string;
    ref?: ComponentProps extends { ref?: infer RefType } ? RefType : React.Ref<unknown>;
    style?: React.CSSProperties;
  };
