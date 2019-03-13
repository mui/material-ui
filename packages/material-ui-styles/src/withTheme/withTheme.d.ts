import { PropInjector } from '@material-ui/core';

export interface WithTheme<Theme> {
  theme: Theme;
  innerRef?: React.Ref<any>;
}

export default function withTheme<Theme>(): PropInjector<
  WithTheme<Theme>,
  Partial<WithTheme<Theme>>
>;
