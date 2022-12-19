import { BoxTypeMap } from './Box';
import { OverridableComponent } from '@mui/types';
import { Theme as SystemTheme } from './createTheme';

export default function createBox<
  Theme extends object = SystemTheme,
  AdditionalProps extends {} = {},
>(options?: {
  defaultTheme: object;
  defaultClassName?: string;
  generateClassName?: (componentName: string) => string;
}): OverridableComponent<BoxTypeMap<AdditionalProps, 'div', Theme>>;
