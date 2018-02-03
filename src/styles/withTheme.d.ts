import { Theme } from './createMuiTheme';

export interface WithTheme {
  theme: Theme;
}

declare const withTheme: () => <P>(
  component: React.ComponentType<P & WithTheme>,
) => React.ComponentClass<P>;

export default withTheme;
