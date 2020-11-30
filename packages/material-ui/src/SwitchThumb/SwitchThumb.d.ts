import { StandardProps } from '..';

export interface SwitchThumbProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, SwitchThumbClassKey> {
  /**
   * the thumb contents. For example, icons can be passed in here to decorate the thumb.
   */
  children?: React.ReactNode;
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: React.ElementType<React.HTMLAttributes<HTMLElement>>;
}

export type SwitchThumbClassKey = 'root';

export default function SwitchThumb(props: SwitchThumbProps): JSX.Element;
