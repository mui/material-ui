import * as React from 'react';

export interface TrapFocusProps {
  open: boolean;
  getDoc: () => Document;
  isEnabled: () => boolean;
  children: React.ReactNode;
  disableAutoFocus?: boolean;
  disableEnforceFocus?: boolean;
  disableRestoreFocus?: boolean;
}

declare const TrapFocus: React.ComponentType<TrapFocusProps>;

export default TrapFocus;
