export interface MenuButtonProps {
  /**
   * Class name applied to the root element.
   */
  className?: string;
  /**
   * Label of the button
   */
  label?: string;
  children?: React.ReactNode;
  /**
   * The props used for each slot inside the MenuButton.
   * @default {}
   */
  slots?: {
    root?: React.ElementType;
  };
  /**
   * The components used for each slot inside the MenuButton.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slotProps?: {
    root?: React.HTMLAttributes<HTMLButtonElement>;
  };
}
