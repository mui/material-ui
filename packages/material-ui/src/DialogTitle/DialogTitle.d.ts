import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { InternalStandardProps as StandardProps, Theme } from '..';

export interface DialogTitleProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
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
  };
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * If `true`, the children won't be wrapped by a typography component.
   * For instance, this can be useful to render an h4 instead of the default h2.
   * @default false
   */
  disableTypography?: boolean;
}

export type DialogTitleClassKey = keyof NonNullable<DialogTitleProps['classes']>;

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
