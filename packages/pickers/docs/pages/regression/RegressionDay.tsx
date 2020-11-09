import React from 'react';
import { IUtils } from '@date-io/core/IUtils';
import { PickersDay, PickersDayProps } from '@material-ui/pickers';

export const createRegressionDay = <TDate extends any>(utils: IUtils<TDate>) => (
  day: any,
  selectedDate: any,
  dayProps: PickersDayProps<TDate>
) => {
  return <PickersDay {...dayProps} data-day={utils.formatByString(day, 'dd/MM/yyyy')} />;
};
