import { PropInjector } from '@material-ui/core';

export interface WithThemeCreatorOption<Theme> {
  defaultTheme?: Theme;
}

export type WithThemeCreator<Theme> = (
  option?: WithThemeCreatorOption<Theme>,
) => PropInjector<WithTheme<Theme>, Partial<WithTheme<Theme>>>;

export function withThemeCreator<Theme>(
  option?: WithThemeCreatorOption<Theme>,
): WithThemeCreator<Theme>;

export interface WithTheme<Theme> {
  theme: Theme;
  innerRef?: React.Ref<any>;
}

export default function withTheme<Theme>(): PropInjector<
  WithTheme<Theme>,
  Partial<WithTheme<Theme>>
>;
