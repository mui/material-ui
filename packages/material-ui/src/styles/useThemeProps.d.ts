import { Theme as MuiTheme } from '@material-ui/core/styles';

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
  Theme extends MuiTheme,
  Props,
  Name extends keyof any
>(params: {
  props: Props;
  name: Name;
}): Props & ThemedProps<Theme, Name> & AdditionalThemeProps<Theme>;
