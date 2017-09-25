import { StyledComponent, PropTypes } from '..';
import { PaperProps } from '../Paper/Paper';
export interface AppBarProps extends PaperProps {
  color?: PropTypes.Color;
  position?: 'static' | 'fixed' | 'absolute';
}

declare const AppBar: StyledComponent<AppBarProps>;

export default AppBar;
