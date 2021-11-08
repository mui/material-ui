import { OverrideProps } from '@mui/types';
import { ButtonUnstyledOwnerState } from '../ButtonUnstyled/ButtonUnstyled';

export interface TabUnstyledOwnProps extends Omit<ButtonUnstyledOwnerState, 'onChange'> {
  /**
   * You can provide your own value. Otherwise, we fallback to the child position index.
   */
  value?: number | string;
  /**
   * Callback invoked when new value is being set.
   */
  onChange?: (event: React.SyntheticEvent, value: number | string) => void;
  /**
   * If `true` the selected tab changes on focus. Otherwise it only
   * changes on activation.
   */
  selectionFollowsFocus?: boolean;
}

type TabUnstyledProps<
  D extends React.ElementType = TabUnstyledTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<TabUnstyledTypeMap<P, D>, D> & {
  /**
   * The component used for the Root slot.
   * Either a string to use a HTML element or a component.
   * This is equivalent to `components.Root`. If both are provided, the `component` is used.
   */
  component?: D;
};

export interface TabUnstyledTypeMap<P = {}, D extends React.ElementType = 'button'> {
  props: P & TabUnstyledOwnProps;
  defaultComponent: D;
}

export default TabUnstyledProps;
