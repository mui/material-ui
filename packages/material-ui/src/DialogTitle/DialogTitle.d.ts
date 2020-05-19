import * as React from 'react';
import { StandardProps } from '..';

export interface DialogTitleProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, DialogTitleClassKey> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * If `true`, the children won't be wrapped by a typography component.
   * For instance, this can be useful to render an h4 instead of the default h2.
   */
  disableTypography?: boolean;
}

export type DialogTitleClassKey = 'root';

/**
 *
 * Demos:
 *
 * - [Dialogs](https://material-ui.com/components/dialogs/)
 *
 * API:
 *
 * - [DialogTitle API](https://material-ui.com/api/dialog-title/)
 */
export default function DialogTitle(props: DialogTitleProps): JSX.Element;
