import React from 'react';
import { IUtils } from '@date-io/core/IUtils';
import { IconButtonProps } from '@material-ui/core/IconButton';

export const createRegressionDay = (utils: IUtils<any>) => (
  day: any,
  selectedDate: any,
  dayInCurrentMonth: boolean,
  dayComponent: React.ReactElement<IconButtonProps>
) => {
  return <span data-day={utils.formatByString(day, 'dd/MM/yyyy')}>{dayComponent}</span>;
};
