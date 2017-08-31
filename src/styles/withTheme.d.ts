import { Theme } from './createMuiTheme';

interface withTheme<P = {}, T extends Theme = Theme> {
  (component: React.ComponentType<P & { theme: T }>): React.ComponentClass<P>;
}

export default withTheme;
