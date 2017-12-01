export { default as MuiThemeProvider } from './MuiThemeProvider';
export { default as withStyles, WithStyles, StyleRules, StyleRulesCallback, StyledComponentProps } from './withStyles';
export { default as withTheme } from './withTheme';
export { default as createMuiTheme, Theme, Direction } from './createMuiTheme';

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
}
