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
  defaultValidationError?: TError;
  isSameError?: (a: TError, b: TError) => boolean;
}

const defaultIsSameError = (a: unknown, b: unknown) => a === b;

export function makeValidationHook<
  TError,
  TDateValue,
  TProps extends ValidationProps<TError, TDateValue>
>(
  validateFn: (utils: MuiPickersAdapter, value: TDateValue, props: TProps) => TError,
  { defaultValidationError, isSameError = defaultIsSameError }: ValidationHookOptions<TError> = {}
) {
  return (value: TDateValue, props: TProps) => {
    const utils = useUtils();
    const previousValidationErrorRef = React.useRef<TError>(
      defaultValidationError || null
    ) as React.MutableRefObject<TError>;

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
