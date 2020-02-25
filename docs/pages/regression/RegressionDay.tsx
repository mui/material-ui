import React from 'react';
import { IUtils } from '@date-io/core/IUtils';
import { Day, DayProps } from '@material-ui/pickers';

export const createRegressionDay = (utils: IUtils<any>) => (
  day: any,
  selectedDate: any,
  dayProps: DayProps
) => {
  return <Day {...dayProps} data-day={utils.formatByString(day, 'dd/MM/yyyy')} />;
};
