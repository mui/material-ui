'use client';
import * as React from 'react';

export interface Menu2SubmenuClosingContextValue {
  /**
   * True from the moment the submenu starts to close until its trigger is
   * focused again or the popup is gone. Base UI drops the trigger's open state
   * at once but returns focus only after the popup unmounts, so the trigger
   * keeps its open tint until then.
   */
  closing: boolean;
  /** Clears `closing`. The trigger calls it when it receives focus. */
  settle: () => void;
}

const Menu2SubmenuClosingContext = React.createContext<Menu2SubmenuClosingContextValue>({
  closing: false,
  settle: () => {},
});

if (process.env.NODE_ENV !== 'production') {
  Menu2SubmenuClosingContext.displayName = 'Menu2SubmenuClosingContext';
}

export default Menu2SubmenuClosingContext;
