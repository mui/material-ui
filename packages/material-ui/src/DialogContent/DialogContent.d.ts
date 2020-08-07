import * as React from 'react';
import { StandardProps } from '..';

export interface DialogContentProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, DialogContentClassKey> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Display the top and bottom dividers.
   */
  dividers?: boolean;
}

export type DialogContentClassKey = 'root' | 'dividers';

/**
 *
 * Demos:
 *
 * - [Dialogs](https://material-ui.com/components/dialogs/)
 *
 * API:
 *
 * - [DialogContent API](https://material-ui.com/api/dialog-content/)
 */
export default function DialogContent(props: DialogContentProps): JSX.Element;
