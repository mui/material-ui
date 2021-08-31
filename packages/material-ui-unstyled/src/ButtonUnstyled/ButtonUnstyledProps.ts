import { OverrideProps } from '@material-ui/types';
import UseButtonProps from './UseButtonProps';

export interface ButtonUnstyledActions {
  focusVisible(): void;
}

export interface ButtonUnstyledOwnProps extends Omit<UseButtonProps, 'ref'> {
  /**
   * A ref for imperative actions. It currently only supports `focusVisible()` action.
   */
  action?: React.Ref<ButtonUnstyledActions>;
  children?: React.ReactNode;
  className?: string;
  componentsProps?: {
    root?: Record<string, any>;
  };
}

type ButtonUnstyledProps<
  D extends React.ElementType = ButtonUnstyledTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<ButtonUnstyledTypeMap<P, D>, D> & {
  /**
   * The component used for the Root slot.
   * Either a string to use a HTML element or a component.
   * This is equivalent to `components.Root`. If both are provided, the `component` is used.
   */
  component?: D;
};

export interface ButtonUnstyledTypeMap<P = {}, D extends React.ElementType = 'button'> {
  props: P & ButtonUnstyledOwnProps;
  defaultComponent: D;
}

export default ButtonUnstyledProps;
