export interface MenuItemUnstyledComponentsPropsOverrides {}

export default interface MenuItemUnstyledProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * If `true`, the menu item will be disabled.
   * @default false
   */
  disabled?: boolean;
  component?: React.ElementType;
  components?: {
    Root?: React.ElementType;
  };
  componentsProps?: {
    root?: React.ComponentPropsWithRef<'li'> & MenuItemUnstyledComponentsPropsOverrides;
  };
}
