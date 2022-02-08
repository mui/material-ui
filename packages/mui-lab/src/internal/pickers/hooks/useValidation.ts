import * as React from 'react';
import { useUtils, MuiPickersAdapter } from './useUtils';
import { DateValidationProps, RangeInput, validateDate, validateDateRange } from '../date-utils';
import { DateTimeValidationProps, validateDateTime } from '../date-time-utils';
import { TimeValidationProps, validateTime } from '../time-utils';

export interface ValidationProps<TError, TDateValue> {
  /**
   * Callback that fired when input value or new `value` prop validation returns **new** validation error (or value is valid after error).
   * In case of validation error detected `reason` prop return non-null value and `TextField` must be displayed in `error` state.
   * This can be used to render appropriate form error.
   *
   * [Read the guide](https://next.material-ui-pickers.dev/guides/forms) about form integration and error displaying.
   * @DateIOType
   */
  onError?: (reason: TError, value: TDateValue) => void;
  value: TDateValue;
}
type InferError<Props> = Props extends ValidationProps<infer TError, any> ? TError : never;
type InferDate<Props> = Props extends ValidationProps<any, infer TDate> ? TDate : never;

function isSameDateOrTimeError(a: unknown, b: unknown) {
  return a === b;
}
function isSameDateRangeError(a: DateRangeValidationError, b: DateRangeValidationError | null) {
  return b !== null && a[1] === b[1] && a[0] === b[0];
}

function useValidation<TProps extends ValidationProps<any, any>>(
  props: TProps,
  validate: (
    // TDate inference impossible from TDateValue given that date ranges exists
    // It's unclear whether [Date, Date] is a custom date type or a date range.
    utils: MuiPickersAdapter<any>,
    value: InferDate<TProps>,
    props: TProps,
  ) => InferError<TProps>,
  isSameError: (
    a: InferError<TProps>,
    b: InferError<TProps> | null,
  ) => boolean = isSameDateOrTimeError,
): InferError<TProps> {
  const { value, onError } = props;
  const utils = useUtils();
  const previousValidationErrorRef = React.useRef<InferError<TProps> | null>(null);

  const validationError = validate(utils, value, props);

  React.useEffect(() => {
    if (onError && !isSameError(validationError, previousValidationErrorRef.current)) {
      onError(validationError, value);
    }

    previousValidationErrorRef.current = validationError;
  }, [isSameError, onError, previousValidationErrorRef, validationError, value]);

  return validationError;
}

export type TimeValidationError = import('../time-utils').TimeValidationError;
export function useTimeValidation<TDate>(
  props: TimeValidationProps<TDate> & ValidationProps<TimeValidationError, TDate>,
): TimeValidationError {
  return useValidation(props, validateTime, isSameDateOrTimeError);
}

export type DateValidationError = import('../date-utils').DateValidationError;
export function useDateValidation<TDate>(
  props: DateValidationProps<TDate> & ValidationProps<DateValidationError, TDate>,
): DateValidationError {
  return useValidation(props, validateDate, isSameDateOrTimeError);
}

export type DateTimeValidationError = import('../date-time-utils').DateTimeValidationError;
export function useDateTimeValidation<TDate>(
  props: DateTimeValidationProps<TDate> & ValidationProps<DateTimeValidationError, TDate>,
): DateTimeValidationError {
  return useValidation(props, validateDateTime, isSameDateOrTimeError);
}

export type DateRangeValidationError = import('../date-utils').DateRangeValidationError;
export function useDateRangeValidation<TDate>(
  props: DateValidationProps<TDate> & ValidationProps<DateRangeValidationError, RangeInput<TDate>>,
): DateRangeValidationError {
  return useValidation(props, validateDateRange, isSameDateRangeError);
}
