import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface AlertTitleProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, AlertTitleClassKey> {}

export type AlertTitleClassKey = 'root';

export default function AlertTitle(props: AlertTitleProps): JSX.Element;
