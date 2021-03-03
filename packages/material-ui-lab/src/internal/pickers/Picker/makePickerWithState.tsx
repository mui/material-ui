import * as React from 'react';
import { unstable_useThemeProps as useThemeProps } from '@material-ui/core/styles';
import Picker, { ExportedPickerProps } from './Picker';
import { ParsableDate } from '../constants/prop-types';
import { MuiPickersAdapter } from '../hooks/useUtils';
import { parsePickerInputValue } from '../date-utils';
import { KeyboardDateInput } from '../KeyboardDateInput';
import { SomeWrapper, PublicWrapperProps } from '../wrappers/Wrapper';
import { ResponsiveWrapper } from '../wrappers/ResponsiveWrapper';
import { makeWrapperComponent } from '../wrappers/makeWrapperComponent';
import { PureDateInput } from '../PureDateInput';
import { usePickerState, PickerStateValueManager } from '../hooks/usePickerState';
import { AllAvailableViews } from '../typings/Views';
import { AllSharedPickerProps } from './SharedPickerProps';
import { ToolbarComponentProps } from '../typings/BasePicker';

type AllAvailableForOverrideProps = ExportedPickerProps<AllAvailableViews>;

export type AllPickerProps<T, TWrapper extends SomeWrapper = SomeWrapper> = T &
  AllSharedPickerProps &
  PublicWrapperProps<TWrapper>;

export interface MakePickerOptions<T extends unknown> {
  name: string;
  /**
   * Hook that running validation for the `value` and input.
   */
  useValidation: (value: ParsableDate, props: T) => string | null;
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

export type SharedPickerProps<TDate, TWrapper extends SomeWrapper> = PublicWrapperProps<TWrapper> &
  AllSharedPickerProps<ParsableDate<TDate>, TDate | null> &
  React.RefAttributes<HTMLInputElement>;

type PickerComponent<
  TViewProps extends AllAvailableForOverrideProps,
  TWrapper extends SomeWrapper
> = (
  props: TViewProps & SharedPickerProps<unknown, TWrapper> & React.RefAttributes<HTMLInputElement>,
) => JSX.Element;

export function makePickerWithState<
  T extends AllAvailableForOverrideProps,
  TWrapper extends SomeWrapper = typeof ResponsiveWrapper
>(
  Wrapper: TWrapper,
  { name, useInterceptProps, useValidation, DefaultToolbarComponent }: MakePickerOptions<T>,
): PickerComponent<T, TWrapper> {
  const WrapperComponent = makeWrapperComponent(Wrapper, {
    KeyboardDateInputComponent: KeyboardDateInput,
    PureDateInputComponent: PureDateInput,
  });

  const PickerWithState = React.forwardRef(function PickerWithState<TDate>(
    __props: T & PublicWrapperProps<TWrapper> & AllSharedPickerProps<ParsableDate<TDate>, TDate>,
    ref: React.Ref<HTMLInputElement>,
  ) {
    const allProps = useInterceptProps(__props) as AllPickerProps<T, TWrapper>;
    // This is technically unsound if the type parameters appear in optional props.
    // Optional props can be filled by `useThemeProps` with types that don't match the type parameters.
    const props: AllPickerProps<T, TWrapper> = useThemeProps({ props: allProps, name });

    const validationError = useValidation(props.value, props) !== null;
    const { pickerProps, inputProps, wrapperProps } = usePickerState<ParsableDate<TDate>, TDate>(
      props,
      valueManager as PickerStateValueManager<ParsableDate<TDate>, TDate>,
    );

    // Note that we are passing down all the value without spread.
    // It saves us >1kb gzip and make any prop available automatically on any level down.
    const { value, onChange, ...other } = props;
    const AllDateInputProps = { ...inputProps, ...other, ref, validationError };

    return (
      <WrapperComponent wrapperProps={wrapperProps} DateInputProps={AllDateInputProps} {...other}>
        <Picker
          {...pickerProps}
          toolbarTitle={props.label || props.toolbarTitle}
          ToolbarComponent={other.ToolbarComponent || DefaultToolbarComponent}
          DateInputProps={AllDateInputProps}
          {...other}
        />
      </WrapperComponent>
    );
  });

  // @ts-expect-error Types are equal except `forwardRef` calls the returned types with `PropsWithoutRef`.
  // The distributive nature of `PropsWithOutRef` causes the type error.
  // TODO: Find out why we need a distributive `PropsWithOutRef`.
  return PickerWithState as PickerComponent<T, TWrapper>;
}
