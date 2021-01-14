import { Theme } from './createMuiTheme';

export type ThemedProps<T, Name extends keyof any> = T extends {
  components: Record<Name, { defaultProps: infer Props }>;
}
  ? Props
  : {};

export interface AdditionalThemeProps<T> {
  isRtl: boolean;
  theme: T;
}

export default function useThemeProps<T = Theme, Props = {}, Name extends keyof any = any>(params: {
  props: Props;
  name: Name;
}): Props & ThemedProps<T, Name> & AdditionalThemeProps<T>;
