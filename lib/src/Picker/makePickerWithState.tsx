import * as React from 'react';
import Picker, { ExportedPickerProps } from './Picker';
import { ParsableDate } from '../constants/prop-types';
import { MuiPickersAdapter } from '../_shared/hooks/useUtils';
import { parsePickerInputValue } from '../_helpers/date-utils';
import { withDefaultProps } from '../_shared/withDefaultProps';
import { KeyboardDateInput } from '../_shared/KeyboardDateInput';
import { SomeWrapper, ExtendWrapper } from '../wrappers/Wrapper';
import { ResponsiveWrapper } from '../wrappers/ResponsiveWrapper';
import { withDateAdapterProp } from '../_shared/withDateAdapterProp';
import { makeWrapperComponent } from '../wrappers/makeWrapperComponent';
import { PureDateInput, DateInputProps } from '../_shared/PureDateInput';
import { usePickerState, PickerStateValueManager } from '../_shared/hooks/usePickerState';
import { AnyPickerView, AllSharedPickerProps, ToolbarComponentProps } from './SharedPickerProps';

type AllAvailableForOverrideProps = ExportedPickerProps<AnyPickerView>;

export type AllPickerProps<T, TWrapper extends SomeWrapper = SomeWrapper> = T &
  AllSharedPickerProps &
  ExtendWrapper<TWrapper>;

export interface MakePickerOptions<T extends unknown> {
  name: string;
  /**
   * Hook that running validation for the `value` and input.
   */
  useValidation: (value: ParsableDate<unknown>, props: T) => string | null;
  /**
   * Intercept props to override or inject default props specifically for picker.
   */
  useInterceptProps: (props: AllPickerProps<T>) => AllPickerProps<T> & { inputFormat: string };
  DefaultToolbarComponent: React.ComponentType<ToolbarComponentProps>;
}

const valueManager: PickerStateValueManager<unknown, unknown> = {
  emptyValue: null,
  parseInput: parsePickerInputValue,
  areValuesEqual: (utils: MuiPickersAdapter, a: unknown, b: unknown) => utils.isEqual(a, b),
};

type PickerComponent<
  TViewProps extends AllAvailableForOverrideProps,
  TWrapper extends SomeWrapper
> = <TDate>(
  props: TViewProps &
    ExtendWrapper<TWrapper> &
    AllSharedPickerProps<ParsableDate<TDate>, TDate | null> &
    React.RefAttributes<HTMLInputElement>
) => JSX.Element;

export function makePickerWithStateAndWrapper<
  T extends AllAvailableForOverrideProps,
  TWrapper extends SomeWrapper = typeof ResponsiveWrapper
>(
  Wrapper: TWrapper,
  { name, useInterceptProps, useValidation, DefaultToolbarComponent }: MakePickerOptions<T>
): PickerComponent<T, TWrapper> {
  const WrapperComponent = makeWrapperComponent<DateInputProps<any, any>>(Wrapper, {
    KeyboardDateInputComponent: KeyboardDateInput,
    PureDateInputComponent: PureDateInput,
  });

  function PickerWithState<TDate>(
    __props: T & AllSharedPickerProps<ParsableDate<TDate>, TDate> & ExtendWrapper<TWrapper>
  ) {
    const allProps = useInterceptProps(__props) as AllPickerProps<T, TWrapper>;

    const validationError = useValidation(allProps.value, allProps) !== null;
    const { pickerProps, inputProps, wrapperProps } = usePickerState<ParsableDate<TDate>, TDate>(
      allProps,
      valueManager as PickerStateValueManager<ParsableDate<TDate>, TDate>
    );

    // Note that we are passing down all the value without spread.
    // It saves us >1kb gzip and make any prop available automatically on any level down.
    const { value, onChange, ...other } = allProps;
    const AllDateInputProps = { ...inputProps, ...other, validationError };

    return (
      <WrapperComponent wrapperProps={wrapperProps} DateInputProps={AllDateInputProps} {...other}>
        <Picker
          {...pickerProps}
          toolbarTitle={allProps.label || allProps.toolbarTitle}
          ToolbarComponent={other.ToolbarComponent || DefaultToolbarComponent}
          DateInputProps={AllDateInputProps}
          {...other}
        />
      </WrapperComponent>
    );
  }

  const FinalPickerComponent = withDefaultProps({ name }, withDateAdapterProp(PickerWithState));

  // @ts-ignore Simply ignore generic values in props, because it is impossible
  // to keep generics without additional cast when using forwardRef
  // @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/35834
  return React.forwardRef<HTMLInputElement, React.ComponentProps<typeof FinalPickerComponent>>(
    (props, ref) => <FinalPickerComponent {...(props as any)} forwardedRef={ref} />
  );
}
