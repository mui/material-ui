import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';

export type TabScrollButtonTypeMap<
  P = {},
  D extends React.ElementType = 'div'
> = ExtendButtonBaseTypeMap<{
  props: P & {
    direction?: 'left' | 'right';
    visible?: boolean;
  };
  defaultComponent: D;
  classKey: TabScrollButtonClassKey;
}>;

declare const TabScrollButton: ExtendButtonBase<TabScrollButtonTypeMap>;

export type TabScrollButtonClassKey = 'root';

export type TabScrollButtonProps<
  D extends React.ElementType = TabScrollButtonTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<TabScrollButtonTypeMap<P, D>, D>;

export default TabScrollButton;
