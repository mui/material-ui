export interface ThemeWithProps {
  components?: any;
}

export type ThemedProps<Theme, Name extends keyof any> = Theme extends {
  components: Record<Name, { defaultProps: infer Props }>;
}
  ? Props
  : {};

export interface AdditionalThemeProps<Theme> {
  isRtl: boolean;
  theme: Theme;
}

export default function useThemeProps<
  Theme extends ThemeWithProps,
  Props,
  Name extends keyof any,
>(params: {
  props: Props;
  name: Name;
  defaultTheme?: Theme;
}): Props & ThemedProps<Theme, Name> & AdditionalThemeProps<Theme>;
