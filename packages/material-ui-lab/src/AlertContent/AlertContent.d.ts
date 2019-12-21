import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface AlertContentProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, AlertContentClassKey> {
  variant?: 'text' | 'container';
}

export type AlertContentClassKey = 'root';

export default function AlertContent(props: AlertContentProps): JSX.Element;
