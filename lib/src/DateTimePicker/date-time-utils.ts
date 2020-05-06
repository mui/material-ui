import { ParsableDate } from '../constants/prop-types';
import { MaterialUiPickersDate } from '../typings/date';
import { MuiPickersAdapter } from '../_shared/hooks/useUtils';
import { DateValidationProps, validateDate } from '../_helpers/date-utils';
import { TimeValidationProps, validateTime } from '../_helpers/time-utils';

export function validateDateAndTime(
  utils: MuiPickersAdapter,
  value: MaterialUiPickersDate | ParsableDate,
  {
    minDate,
    maxDate,
    disableFuture,
    shouldDisableDate,
    disablePast,
    ...timeValidationProps
  }: DateValidationProps & TimeValidationProps
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
