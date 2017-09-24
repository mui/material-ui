import { StyledComponent } from '..';

import { ButtonBaseProps } from '../ButtonBase';

export interface TabScrollButtonProps extends ButtonBaseProps {
  direction?: 'left' | 'right';
  visible?: boolean;
}

declare const TabScrollButton: StyledComponent<TabScrollButtonProps>;

export default TabScrollButton;
