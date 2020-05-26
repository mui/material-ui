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
/**
 * Utility component that locks focus inside the component.
 * API:
 *
 * - [TrapFocus API](https://material-ui.com/api/trap-focus/)
 */
declare const TrapFocus: React.ComponentType<TrapFocusProps>;

export default TrapFocus;
