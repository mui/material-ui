import * as React from 'react';
import { unstable_useThemeProps as useThemeProps } from '@material-ui/core/styles';
import { useUtils } from '../internal/pickers/hooks/useUtils';
import { useParsedDate } from '../internal/pickers/hooks/date-helpers-hooks';
import { defaultMinDate, defaultMaxDate } from '../internal/pickers/constants/prop-types';
import { SomeWrapper } from '../internal/pickers/wrappers/Wrapper';
import { RangeInput, AllSharedDateRangePickerProps, DateRange } from './RangeTypes';
import { makeValidationHook, ValidationProps } from '../internal/pickers/hooks/useValidation';
import { usePickerState, PickerStateValueManager } from '../internal/pickers/hooks/usePickerState';
import { DateRangePickerView, ExportedDateRangePickerViewProps } from './DateRangePickerView';
import DateRangePickerInput, { ExportedDateRangePickerInputProps } from './DateRangePickerInput';
import {
  parseRangeInputValue,
  validateDateRange,
  DateRangeValidationError,
} from '../internal/pickers/date-utils';
import { DateInputPropsLike, PrivateWrapperProps } from '../internal/pickers/wrappers/WrapperProps';
import { BasePickerProps } from '../internal/pickers/typings/BasePicker';
import { ResponsiveWrapperProps } from '../internal/pickers/wrappers/ResponsiveWrapper';
import { StaticWrapperProps } from '../internal/pickers/wrappers/StaticWrapper';

export interface BaseDateRangePickerProps<TDate>
  extends ExportedDateRangePickerViewProps<TDate>,
    ValidationProps<DateRangeValidationError, RangeInput<TDate>>,
    ExportedDateRangePickerInputProps {
  /**
   * Text for start input label and toolbar placeholder.
   * @default "Start"
   */
  startText?: React.ReactNode;
  /**
   * Text for end input label and toolbar placeholder.
   * @default "end"
   */
  endText?: React.ReactNode;
}

type DateRangePickerComponent<PublicWrapperProps> = (<TDate>(
  props: BaseDateRangePickerProps<TDate> &
    PublicWrapperProps &
    AllSharedDateRangePickerProps<TDate> &
    React.RefAttributes<HTMLDivElement>,
) => JSX.Element) & { propTypes: unknown };

const useDateRangeValidation = makeValidationHook<
  DateRangeValidationError,
  RangeInput<unknown>,
  BaseDateRangePickerProps<any>
>(validateDateRange, {
  isSameError: (a, b) => b !== null && a[1] === b[1] && a[0] === b[0],
});

interface WithWrapperProps {
  children: React.ReactNode;
  DateInputProps: DateInputPropsLike;
  wrapperProps: Omit<
    PrivateWrapperProps & StaticWrapperProps & ResponsiveWrapperProps,
    'DateInputProps'
  >;
}

export default function makeDateRangePicker<PublicWrapperProps>(
  name: string,
  Wrapper: React.JSXElementConstructor<PublicWrapperProps & PrivateWrapperProps>,
): DateRangePickerComponent<PublicWrapperProps> {
  const KeyboardDateInputComponent = DateRangePickerInput as React.FC<DateInputPropsLike>;
  const PureDateInputComponent = DateRangePickerInput as React.FC<DateInputPropsLike>;
  function WrapperComponent(
    props: Partial<BasePickerProps<any, any>> &
      WithWrapperProps &
      ResponsiveWrapperProps &
      StaticWrapperProps,
  ) {
    const {
      disableCloseOnSelect,
      cancelText,
      clearable,
      clearText,
      DateInputProps,
      DialogProps,
      displayStaticWrapperAs,
      inputFormat,
      okText,
      onAccept,
      onChange,
      onClose,
      onOpen,
      open,
      PopperProps,
      todayText,
      value,
      wrapperProps,
      ...other
    } = props;

    const TypedWrapper = Wrapper as SomeWrapper;

    return (
      <TypedWrapper
        clearable={clearable}
        clearText={clearText}
        DialogProps={DialogProps}
        PopperProps={PopperProps}
        okText={okText}
        todayText={todayText}
        cancelText={cancelText}
        DateInputProps={DateInputProps}
        KeyboardDateInputComponent={KeyboardDateInputComponent}
        PureDateInputComponent={PureDateInputComponent}
        displayStaticWrapperAs={displayStaticWrapperAs}
        {...wrapperProps}
        {...other}
      />
    );
  }

  const rangePickerValueManager: PickerStateValueManager<any, any> = {
    emptyValue: [null, null],
    parseInput: parseRangeInputValue,
    areValuesEqual: (utils, a, b) => utils.isEqual(a[0], b[0]) && utils.isEqual(a[1], b[1]),
  };

  function RangePickerWithStateAndWrapper<TDate>(
    inProps: BaseDateRangePickerProps<TDate> &
      AllSharedDateRangePickerProps<TDate> &
      PublicWrapperProps,
  ) {
    const props = useThemeProps({ props: inProps, name });

    const {
      calendars,
      value,
      onChange,
      mask = '__/__/____',
      startText = 'Start',
      endText = 'End',
      inputFormat: passedInputFormat,
      minDate: minDateProp = defaultMinDate as TDate,
      maxDate: maxDateProp = defaultMaxDate as TDate,
      ...other
    } = props;

    const utils = useUtils();
    const minDate = useParsedDate(minDateProp);
    const maxDate = useParsedDate(maxDateProp);
    const [currentlySelectingRangeEnd, setCurrentlySelectingRangeEnd] = React.useState<
      'start' | 'end'
    >('start');

    const pickerStateProps = {
      ...other,
      value,
      onChange,
      inputFormat: passedInputFormat || utils.formats.keyboardDate,
    };

    const restProps = {
      ...other,
      minDate,
      maxDate,
    };

    const { pickerProps, inputProps, wrapperProps } = usePickerState<
      RangeInput<TDate>,
      DateRange<TDate>
    >(pickerStateProps, rangePickerValueManager);

    const validationError = useDateRangeValidation(value, restProps);

    const DateInputProps = {
      ...inputProps,
      ...restProps,
      currentlySelectingRangeEnd,
      setCurrentlySelectingRangeEnd,
      startText,
      endText,
      mask,
      validationError,
    };

    return (
      <WrapperComponent wrapperProps={wrapperProps} DateInputProps={DateInputProps} {...restProps}>
        <DateRangePickerView<any>
          open={wrapperProps.open}
          DateInputProps={DateInputProps}
          calendars={calendars}
          currentlySelectingRangeEnd={currentlySelectingRangeEnd}
          setCurrentlySelectingRangeEnd={setCurrentlySelectingRangeEnd}
          startText={startText}
          endText={endText}
          {...pickerProps}
          {...restProps}
        />
      </WrapperComponent>
    );
  }

  // @ts-expect-error Impossible to save component generics when wrapping with HOC
  return React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<typeof RangePickerWithStateAndWrapper>
  >((props, ref) => <RangePickerWithStateAndWrapper {...(props as any)} forwardedRef={ref} />);
}
