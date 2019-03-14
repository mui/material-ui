import { ComponentsPropsList } from '@material-ui/core/styles/props';
import { Theme as MuiTheme } from '@material-ui/core';

export interface NamedParams<K extends keyof ComponentsPropsList, Theme> {
  name: K;
  props: ComponentsPropsList[K];
  theme?: Theme;
}
export default function getThemeProps<Name extends keyof ComponentsPropsList, Theme = MuiTheme>(
  params: NamedParams<Name, Theme>,
): ComponentsPropsList[Name];
