import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';

export interface DialogContentProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the root element if `dividers={true}`. */
    dividers?: string;
  };
  /**
   * Display the top and bottom dividers.
   */
  dividers?: boolean;
}

export type DialogContentClassKey = keyof NonNullable<DialogContentProps['classes']>;

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
