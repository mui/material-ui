import { Theme } from './createMuiTheme';

declare const withTheme: <P = {}>() => (
  component: React.ComponentType<P & { theme: Theme }>
) => React.ComponentClass<P>;

export default withTheme
