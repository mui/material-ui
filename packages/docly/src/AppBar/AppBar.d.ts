import { PropTypes, StandardProps } from '..';
import { PaperProps } from '../Paper';

export interface AppBarProps extends StandardProps<PaperProps, AppBarClassKey> {
  color?: PropTypes.Color;
  position?: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
}

export type AppBarClassKey =
  | 'root'
  | 'positionFixed'
  | 'positionAbsolute'
  | 'positionSticky'
  | 'positionStatic'
  | 'positionRelative'
  | 'colorDefault'
  | 'colorPrimary'
  | 'colorSecondary';

declare const AppBar: React.ComponentType<AppBarProps>;

export default AppBar;
