import { EventHandlers } from '../utils';

export interface UseMenuButtonParameters {
  /**
   * The ref to the root element.
   */
  rootRef?: React.Ref<HTMLElement>;
}

interface UseMenuButtonRootSlotProps {
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
