import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface VisuallyHiddenProps extends StandardProps<{}, VisuallyHiddenClassKey> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
}

export type VisuallyHiddenClassKey = 'root';

/**
 *
 * Demos:
 *
 * - [Visually Hidden](https://material-ui.com/components/visually-hidden/)
 *
 * API:
 *
 * - [VisuallyHidden API](https://material-ui.com/api/visually-hidden/)
 */
export default function VisuallyHidden(props: VisuallyHiddenProps): JSX.Element;
