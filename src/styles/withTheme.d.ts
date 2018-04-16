import { Theme } from './createMuiTheme';
import { Omit, ConsistentWith } from '..';

export interface WithTheme {
  theme: Theme;
}

declare const withTheme: () => <P extends ConsistentWith<WithTheme>>(
  component: React.ComponentType<P & WithTheme>,
) => React.ComponentClass<P>;

export default withTheme;
