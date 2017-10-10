import { Theme } from './createMuiTheme';

export default function withTheme<P = {}, T extends Theme = Theme>():
  (component: React.ComponentType<P & { theme: T }>
  ) => React.ComponentClass<P>;
