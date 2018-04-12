import { Theme } from './createMuiTheme';
import { Omit } from '..';

export interface WithTheme {
  theme: Theme;
}

declare const withTheme: () => <P extends WithTheme>(
  component: React.ComponentType<P>,
) => React.ComponentClass<Omit<P, keyof WithTheme>>;

export default withTheme;
