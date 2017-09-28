import { StyledComponent } from '..';

import { ButtonBaseProps } from '../ButtonBase';

export interface TabScrollButtonProps extends ButtonBaseProps {
  direction?: 'left' | 'right';
  visible?: boolean;
}

export type TabScrollButtonClassKey =
  | 'root'
  ;

declare const TabScrollButton: StyledComponent<TabScrollButtonProps, TabScrollButtonClassKey>;

export default TabScrollButton;
