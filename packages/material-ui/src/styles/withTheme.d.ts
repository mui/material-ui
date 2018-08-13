import { Theme } from './createMuiTheme';
import { AnyComponent, ConsistentWith, Overwrite } from '..';

export interface WithTheme {
  theme: Theme;
  innerRef?: React.Ref<any> | React.RefObject<any>;
}

declare const withTheme: () => <P extends ConsistentWith<P, WithTheme>>(
  component: AnyComponent<P & WithTheme>,
) => React.ComponentType<Overwrite<P, Partial<WithTheme>>>;

export default withTheme;
