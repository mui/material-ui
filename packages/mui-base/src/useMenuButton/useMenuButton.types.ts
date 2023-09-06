import { EventHandlers } from '../utils';

export interface UseMenuButtonParameters {
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, allows a disabled button to receive focus.
   * @default false
   */
  focusableWhenDisabled?: boolean;
  /**
   * The ref to the root element.
   */
  rootRef?: React.Ref<HTMLElement>;
}

interface UseMenuButtonRootSlotProps {
  'aria-haspopup': 'menu';
  'aria-expanded': boolean;
  'aria-controls': string;
  /**
   * Callback fired when the button is clicked.
   */
  onClick: React.MouseEventHandler;
  /**
   * The ref to the button element.
   */
  ref: React.RefCallback<Element> | null;
}

export interface UseMenuButtonReturnValue {
  /**
   * If `true`, the component is active (pressed).
   */
  active: boolean;
  /**
   * Resolver for the root slot's props.
   */
  getRootProps: (otherHandlers?: EventHandlers) => UseMenuButtonRootSlotProps;
  /*
   * If `true`, the menu is open.
   */
  open: boolean;
  /**
   * The ref to the root element.
   */
  rootRef: React.RefCallback<Element> | null;
}
