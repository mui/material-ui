import { Theme } from './theme';

interface withTheme<P = {}, T extends Theme = Theme> {
  (component: React.ComponentType<P & { theme: T }>): React.ComponentClass<P>;
}

export default withTheme;
