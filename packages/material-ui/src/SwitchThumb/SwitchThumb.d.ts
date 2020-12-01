import { InternalStandardProps as StandardProps } from '..';

export interface SwitchThumbProps extends StandardProps<React.HTMLAttributes<HTMLSpanElement>> {
  /**
   * the thumb contents. For example, icons can be passed in here to decorate the thumb.
   */
  children?: React.ReactNode;
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: React.ElementType<React.HTMLAttributes<HTMLElement>>;

  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
  };
}

export type SwitchThumbClassKey = keyof NonNullable<SwitchThumbProps['classes']>;

export default function SwitchThumb(props: SwitchThumbProps): JSX.Element;
