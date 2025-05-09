import { Theme } from './createTheme';
import { Components } from './components';

export interface ThemeWithProps {
  components?: Components<Omit<Theme, 'components'>>;
}

export type ThemedProps<Theme, Name extends keyof any> = Theme extends {
  components: Record<Name, { defaultProps: infer Props }>;
}
  ? Props
  : {};

/**
 * Merges input `props` with the `defaultProps` for a component that were defined in the theme.
 *
 * The `defaultProps` are defined in the theme under `theme.components[componentName].defaultProps`.
 *
 * @example
 *
 * ```tsx
 * const createTheme = () => ({
 *   components: {
 *     MuiStat: {
 *       defaultProps: {
 *         variant: 'outlined',
 *       },
 *     },
 *   },
 * });
 *
 * function Stat(props) {
 *   const themeProps = useThemeProps({ props, name: 'MuiStat' });
 *   return <div {...themeProps} />;
 * }
 * ```
 *
 * @param params.props The input props
 * @param params.name The name of the component as defined in the theme
 */
export default function useThemeProps<
  Theme extends ThemeWithProps,
  Props,
  Name extends keyof any,
>(params: { props: Props; name: Name }): Props & ThemedProps<Theme, Name>;
