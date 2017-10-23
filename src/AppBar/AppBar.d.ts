import { PropTypes, StandardProps } from '..';
import { PaperProps, PaperClassKey } from '../Paper/Paper';

export interface AppBarProps extends StandardProps<
  PaperProps,
  AppBarClassKey
> {
  color?: PropTypes.Color;
  position?: 'static' | 'fixed' | 'absolute';
}

export type AppBarClassKey =
  | PaperClassKey
  | 'positionFixed'
  | 'positionAbsolute'
  | 'positionStatic'
  | 'colorDefault'
  | 'colorPrimary'
  | 'colorAccent'
  ;

declare const AppBar: React.ComponentType<AppBarProps>;

export default AppBar;
