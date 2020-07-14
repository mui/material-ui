import React from 'react';
import { IUtils } from '@date-io/core/IUtils';
import { PickersDay, PickersDayProps } from '@material-ui/pickers';

export const createRegressionDay = (utils: IUtils<any>) => (
  day: any,
  selectedDate: any,
  dayProps: PickersDayProps
) => {
  return <PickersDay {...dayProps} data-day={utils.formatByString(day, 'dd/MM/yyyy')} />;
};
