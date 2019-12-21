import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface AlertActionsProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, AlertActionsClassKey> {
  disableSpacing?: boolean;
}

export type AlertActionsClassKey = 'root';

export default function AlertActions(props: AlertActionsProps): JSX.Element;
