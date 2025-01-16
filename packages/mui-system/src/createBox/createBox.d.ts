import type { OverridableComponent } from '@mui/types';
import type { BoxTypeMap } from '../Box';
import type { Theme as SystemTheme } from '../createTheme';

export default function createBox<
  T extends object = SystemTheme,
  AdditionalProps extends Record<string, unknown> = {},
>(options?: {
  themeId?: string;
  defaultTheme: T;
  defaultClassName?: string;
  generateClassName?: (componentName: string) => string;
}): OverridableComponent<BoxTypeMap<AdditionalProps, 'div', T>>;
