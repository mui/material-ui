import { PaperProps, PaperClassKey } from '../Paper/Paper';
import { Color, StandardProps } from '../MuiProps';

export interface AppBarProps extends StandardProps<PaperProps, AppBarClassKey> {
  color?: Color;
  position?: 'static' | 'fixed' | 'absolute';
}

export type AppBarClassKey =
  | PaperClassKey
  | 'positionFixed'
  | 'positionAbsolute'
  | 'positionStatic'
  | 'colorDefault'
  | 'colorPrimary'
  | 'colorAccent';

declare const AppBar: React.ComponentType<AppBarProps>;

export default AppBar;
