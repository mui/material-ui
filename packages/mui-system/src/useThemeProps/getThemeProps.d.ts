export {};

type ThemedProps<Theme, Name extends keyof any> = Theme extends {
  components: Record<Name, { defaultProps: infer Props }>;
}
  ? Props
  : {};

export default function getThemeProps<Theme, Props, Name extends keyof any>(params: {
  props: Props;
  name: Name;
  theme?: Theme;
}): Props & ThemedProps<Theme, Name>;
