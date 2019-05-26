import { ExtendButtonBase } from '../ButtonBase';
import { SimplifiedPropsOf } from '../OverridableComponent';

declare const TabScrollButton: ExtendButtonBase<{
  props: {
    direction?: 'left' | 'right';
    visible?: boolean;
  };
  defaultComponent: 'div';
  classKey: TabScrollButtonClassKey;
}>;

export type TabScrollButtonClassKey = 'root';

export type TabScrollButtonProps = SimplifiedPropsOf<typeof TabScrollButton>;

export default TabScrollButton;
