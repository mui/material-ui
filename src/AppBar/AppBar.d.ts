import { StyledComponent, PropTypes } from '..';
import { PaperProps } from '../Paper/Paper';

export interface AppBarProps extends PaperProps {
  color?: PropTypes.Color;
  position?: 'static' | 'fixed' | 'absolute';
}

export type AppBarClassKey =
  | 'root'
  | 'positionFixed'
  | 'positionAbsolute'
  | 'positionStatic'
  | 'colorDefault'
  | 'colorPrimary'
  | 'colorAccent'
  ;

declare const AppBar: StyledComponent<AppBarProps, AppBarClassKey>;

export default AppBar;
