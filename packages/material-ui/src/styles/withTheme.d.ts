import { Theme } from './createMuiTheme';
import { ConsistentWith } from '..';

export interface WithTheme {
  theme: Theme;
  innerRef?: React.Ref<any> | React.RefObject<any>;
}

declare const withTheme: () => <P extends ConsistentWith<P, WithTheme>>(
  component: React.ComponentType<P & WithTheme>,
) => React.ComponentClass<P>;

export default withTheme;
