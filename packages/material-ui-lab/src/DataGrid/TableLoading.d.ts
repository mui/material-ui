import * as React from 'react';
import { StandardProps } from '@material-ui/core';
import { BackdropProps } from '@material-ui/core/Backdrop';

export interface TableLoadingProps
  extends StandardProps<Partial<BackdropProps>, TableLoadingClassKey> {
  /**
   * If `true`, the loading state is displayed.
   */
  loading?: boolean;
}

export type TableLoadingClassKey = 'root';

export default function TableLoading(props: TableLoadingProps): JSX.Element;
