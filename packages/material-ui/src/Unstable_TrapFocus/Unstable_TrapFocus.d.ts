import * as React from 'react';

export interface TrapFocusProps {
  /**
   * If `true`, focus will be locked.
   */
  open: boolean;
  /**
   * Return the document to consider.
   * We use it to implement the restore focus between different browser documents.
   */
  getDoc: () => Document;
  /**
   * Do we still want to enforce the focus?
   * This prop helps nesting TrapFocus elements.
   */
  isEnabled: () => boolean;
  /**
   * A single child content element.
   */
  children: React.ReactNode;
  /**
   * If `true`, the trap focus will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any trap focus children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the trap focus less
   * accessible to assistive technologies, like screen readers.
   */
  disableAutoFocus?: boolean;
  /**
   * If `true`, the trap focus will not prevent focus from leaving the trap focus while open.
   *
   * Generally this should never be set to `true` as it makes the trap focus less
   * accessible to assistive technologies, like screen readers.
   */
  disableEnforceFocus?: boolean;
  /**
   * If `true`, the trap focus will not restore focus to previously focused element once
   * trap focus is hidden.
   */
  disableRestoreFocus?: boolean;
}

/**
 * Utility component that locks focus inside the component.
 * API:
 *
 * - [Unstable_TrapFocus API](https://material-ui.com/api/unstable-trap-focus/)
 */
export default function Unstable_TrapFocus(props: TrapFocusProps): JSX.Element;
