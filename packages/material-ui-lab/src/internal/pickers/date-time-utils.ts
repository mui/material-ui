import { ParseableDate } from './constants/prop-types';
import { MuiPickersAdapter } from './hooks/useUtils';
import { DateValidationProps, validateDate } from './date-utils';
import { TimeValidationProps, validateTime } from './time-utils';

export interface DateTimeValidationProps<TDate>
  extends DateValidationProps<TDate>,
    TimeValidationProps<TDate> {}

export function validateDateTime<TDate>(
  utils: MuiPickersAdapter<TDate>,
  value: ParseableDate<TDate>,
  {
    minDate,
    maxDate,
    disableFuture,
    shouldDisableDate,
    disablePast,
    ...timeValidationProps
  }: DateTimeValidationProps<TDate>,
) {
  const dateValidationResult = validateDate(utils, value, {
    minDate,
    maxDate,
    disableFuture,
    shouldDisableDate,
    disablePast,
  });

  if (dateValidationResult !== null) {
    return dateValidationResult;
  }

  return validateTime(utils, value, timeValidationProps);
}

export type DateTimeValidationError = ReturnType<typeof validateDateTime>;
