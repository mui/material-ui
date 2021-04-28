import { ParseableDate } from '../internal/pickers/constants/prop-types';
import { MuiPickersAdapter } from '../internal/pickers/hooks/useUtils';
import { DateValidationProps, validateDate } from '../internal/pickers/date-utils';
import { TimeValidationProps, validateTime } from '../internal/pickers/time-utils';

export function validateDateAndTime<TDate>(
  utils: MuiPickersAdapter<TDate>,
  value: ParseableDate<TDate>,
  {
    minDate,
    maxDate,
    disableFuture,
    shouldDisableDate,
    disablePast,
    ...timeValidationProps
  }: DateValidationProps<TDate> & TimeValidationProps<TDate>,
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

export type DateAndTimeValidationError = ReturnType<typeof validateDateAndTime>;
