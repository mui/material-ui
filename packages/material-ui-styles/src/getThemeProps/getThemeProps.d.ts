export {};

interface ThemeWithProps<Components> {
  props?: { [K in keyof Components]: Partial<Components[K]> };
}

type ThemedProps<Theme, Name extends keyof any> = Theme extends { props: Record<Name, infer Props> }
  ? Props
  : {};

export default function getThemeProps<
  Theme extends ThemeWithProps<any>,
  Props,
  Name extends keyof any
>(params: { props: Props; name: Name; theme?: Theme }): Props & ThemedProps<Theme, Name>;
