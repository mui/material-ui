import * as React from 'react';
import { useUtils, MuiPickersAdapter } from './useUtils';

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
}

export interface ValidationHookOptions<TError> {
  isSameError?: (a: TError, b: TError | null) => boolean;
}

const defaultIsSameError = (a: unknown, b: unknown) => a === b;

export function makeValidationHook<
  TError,
  TDateValue,
  TProps extends ValidationProps<TError, TDateValue>
>(
  validateFn: (utils: MuiPickersAdapter, value: TDateValue, props: TProps) => TError,
  { isSameError = defaultIsSameError }: ValidationHookOptions<TError> = {},
): (value: TDateValue, props: TProps) => TError {
  return function useValidation(value: TDateValue, props: TProps): TError {
    const utils = useUtils();
    const previousValidationErrorRef = React.useRef<TError | null>(null);

    const validationError = validateFn(utils, value, props);

    React.useEffect(() => {
      if (props.onError && !isSameError(validationError, previousValidationErrorRef.current)) {
        props.onError(validationError, value);
      }

      previousValidationErrorRef.current = validationError;
    }, [previousValidationErrorRef, props, validationError, value]);

    return validationError;
  };
}
