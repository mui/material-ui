import { StandardProps } from '..';
import { ButtonBaseProps, ButtonBaseClassKey } from '../ButtonBase/ButtonBase';

export interface TabScrollButtonProps
  extends StandardProps<ButtonBaseProps, TabScrollButtonClassKey> {
  direction?: 'left' | 'right';
  visible?: boolean;
}

export type TabScrollButtonClassKey = ButtonBaseClassKey | 'root';

declare const TabScrollButton: React.ComponentType<TabScrollButtonProps>;

export default TabScrollButton;
