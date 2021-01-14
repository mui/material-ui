import { Theme } from './createMuiTheme';

export type ThemedProps<Theme, Name extends keyof any> = Theme extends {
  components: Record<Name, { defaultProps: infer Props }>;
}
  ? Props
  : {};

export interface AdditionalThemeProps<Theme> {
  isRtl: boolean;
  theme: Theme;
}

export default function useThemeProps<T = Theme, Props = {}, Name extends keyof any = any>(params: {
  props: Props;
  name: Name;
}): Props & ThemedProps<T, Name> & AdditionalThemeProps<T>;
