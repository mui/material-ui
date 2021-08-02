import { OverrideProps } from '@material-ui/types';

export interface ButtonBaseActions {
  focusVisible(): void;
}

export interface ButtonUnstyledOwnProps {
  action?: React.Ref<ButtonBaseActions>;
  children?: React.ReactNode;
  className?: string;
  components?: {
    Root?: React.ElementType;
  };
  componentsProps?: {
    root?: Record<string, any>;
  };
  disabled?: boolean;
  href?: string;
  onBlur?: React.FocusEventHandler;
  onClick?: React.MouseEventHandler;
  onFocus?: React.FocusEventHandler;
  onFocusVisible?: React.FocusEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
  onKeyUp?: React.KeyboardEventHandler;
  onMouseLeave?: React.MouseEventHandler;
  tabIndex?: number | string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
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
