import * as React from 'react';
import { ParsableDate } from '../constants/prop-types';
import { MaterialUiPickersDate } from '../typings/date';
import { MuiPickersAdapter } from '../_shared/hooks/useUtils';
import { parsePickerInputValue } from '../_helpers/date-utils';
import { KeyboardDateInput } from '../_shared/KeyboardDateInput';
import { ResponsiveWrapper } from '../wrappers/ResponsiveWrapper';
import { withDateAdapterProp } from '../_shared/withDateAdapterProp';
import { makeWrapperComponent } from '../wrappers/makeWrapperComponent';
import { PureDateInput, DateInputProps } from '../_shared/PureDateInput';
import { AnyPickerView, AllSharedPickerProps } from './SharedPickerProps';
import { SomeWrapper, ExtendWrapper, WrapperProps } from '../wrappers/Wrapper';
import { usePickerState, PickerStateValueManager } from '../_shared/hooks/usePickerState';
import { Picker, ToolbarComponentProps, ExportedPickerProps, PickerProps } from './Picker';

type AllAvailableForOverrideProps = ExportedPickerProps<AnyPickerView>;

export type AllPickerProps<T, TWrapper extends SomeWrapper = SomeWrapper> = T &
  AllSharedPickerProps &
  ExtendWrapper<TWrapper>;

export interface MakePickerOptions<T extends unknown> {
  /** Hook that running validation for the `value` and input */
  useValidation: (value: ParsableDate, props: T) => string | null;
  /** Intercept props to override or inject default props specifically for picker */
  useInterceptProps: (props: AllPickerProps<T>) => AllPickerProps<T> & { inputFormat: string };
  DefaultToolbarComponent: React.ComponentType<ToolbarComponentProps>;
}

const valueManager: PickerStateValueManager<ParsableDate, MaterialUiPickersDate> = {
  emptyValue: null,
  parseInput: parsePickerInputValue,
  areValuesEqual: (utils: MuiPickersAdapter, a: MaterialUiPickersDate, b: MaterialUiPickersDate) =>
    utils.isEqual(a, b),
};

export function makePickerWithStateAndWrapper<
  T extends AllAvailableForOverrideProps,
  TWrapper extends SomeWrapper = typeof ResponsiveWrapper
>(
  Wrapper: TWrapper,
  { useInterceptProps, useValidation, DefaultToolbarComponent }: MakePickerOptions<T>
) {
  const PickerWrapper = makeWrapperComponent<DateInputProps, ParsableDate, MaterialUiPickersDate>(
    Wrapper,
    {
      KeyboardDateInputComponent: KeyboardDateInput,
      PureDateInputComponent: PureDateInput,
    }
  );

  function PickerWithState(__props: T & AllSharedPickerProps & ExtendWrapper<TWrapper>) {
    const allProps = useInterceptProps(__props) as AllPickerProps<T, TWrapper>;

    const validationError = useValidation(allProps.value, allProps) !== null;
    const { pickerProps, inputProps, wrapperProps } = usePickerState<
      ParsableDate,
      MaterialUiPickersDate
    >(allProps, valueManager);

    // Note that we are passing down all the value without spread.
    // It saves us >1kb gzip and make any prop available automatically on any level down.
    const { value, onChange, ...other } = allProps;
    const DateInputProps = { ...inputProps, ...other, validationError };

    return (
      <PickerWrapper
        DateInputProps={DateInputProps}
        wrapperProps={wrapperProps}
        {...((other as unknown) as WrapperProps)}
      >
        <Picker
          {...pickerProps}
          toolbarTitle={allProps.label || allProps.toolbarTitle}
          DateInputProps={DateInputProps}
          ToolbarComponent={other.ToolbarComponent || DefaultToolbarComponent}
          {...((other as unknown) as PickerProps<any>)}
        />
      </PickerWrapper>
    );
  }

  const FinalPickerComponent = withDateAdapterProp(PickerWithState);
  return React.forwardRef<HTMLInputElement, React.ComponentProps<typeof FinalPickerComponent>>(
    (props, ref) => <FinalPickerComponent {...(props as any)} forwardedRef={ref} />
  );
}
