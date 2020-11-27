export interface SwitchThumbProps {
  /**
   * the thumb contents. For example, icons can be passed in here to decorate the thumb.
   */
  children?: React.ReactNode;
  classes?: SwitchThumbClassKey;
  className?: string;
}

export type SwitchThumbClassKey = 'root';

export default function SwitchThumb(props: SwitchThumbProps): JSX.Element;
