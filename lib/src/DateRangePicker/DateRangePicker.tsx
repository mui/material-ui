import * as React from 'react';
import * as PropTypes from 'prop-types';
import { date } from '../constants/prop-types';
import { useUtils } from '../_shared/hooks/useUtils';
import { MobileWrapper } from '../wrappers/MobileWrapper';
import { DateRangeInputProps } from './DateRangePickerInput';
import { useParsedDate } from '../_shared/hooks/date-helpers-hooks';
import { DesktopPopperWrapper } from '../wrappers/DesktopPopperWrapper';
import { makeWrapperComponent } from '../wrappers/makeWrapperComponent';
import { ResponsivePopperWrapper } from '../wrappers/ResponsiveWrapper';
import { defaultMinDate, defaultMaxDate } from '../constants/prop-types';
import { SomeWrapper, ExtendWrapper, StaticWrapper } from '../wrappers/Wrapper';
import { makeValidationHook, ValidationProps } from '../_shared/hooks/useValidation';
import { usePickerState, PickerStateValueManager } from '../_shared/hooks/usePickerState';
import { DateRangePickerView, ExportedDateRangePickerViewProps } from './DateRangePickerView';
import { DateRangePickerInput, ExportedDateRangePickerInputProps } from './DateRangePickerInput';
import {
  DateRange as DateRangeType,
  RangeInput,
  AllSharedDateRangePickerProps,
} from './RangeTypes';
import {
  parseRangeInputValue,
  validateDateRange,
  DateRangeValidationError,
} from '../_helpers/date-utils';

export interface DateRangePickerProps
  extends ExportedDateRangePickerViewProps,
    ValidationProps<DateRangeValidationError, RangeInput>,
    ExportedDateRangePickerInputProps {
  /**
   * Text for start input label and toolbar placeholder
   * @default "Start"
   */
  startText?: React.ReactNode;
  /**
   * Text for end input label and toolbar placeholder
   * @default "end"
   */
  endText?: React.ReactNode;
}

export const useDateRangeValidation = makeValidationHook<
  DateRangeValidationError,
  RangeInput,
  DateRangePickerProps
>(validateDateRange, {
  defaultValidationError: [null, null],
  isSameError: (a, b) => a[1] === b[1] && a[0] === b[0],
});

export function makeRangePicker<TWrapper extends SomeWrapper>(Wrapper: TWrapper) {
  const WrapperComponent = makeWrapperComponent<DateRangeInputProps, RangeInput, DateRange>(
    Wrapper,
    {
      KeyboardDateInputComponent: DateRangePickerInput,
      PureDateInputComponent: DateRangePickerInput,
    }
  );

  const rangePickerValueManager: PickerStateValueManager<RangeInput, DateRange> = {
    emptyValue: [null, null],
    parseInput: parseRangeInputValue,
    areValuesEqual: (utils, a, b) => utils.isEqual(a[0], b[0]) && utils.isEqual(a[1], b[1]),
  };

  function RangePickerWithStateAndWrapper({
    calendars,
    value,
    onChange,
    mask = '__/__/____',
    startText = 'Start',
    endText = 'End',
    inputFormat: passedInputFormat,
    minDate: __minDate = defaultMinDate,
    maxDate: __maxDate = defaultMaxDate,
    ...other
  }: DateRangePickerProps & AllSharedDateRangePickerProps & ExtendWrapper<TWrapper>) {
    const utils = useUtils();
    const minDate = useParsedDate(__minDate);
    const maxDate = useParsedDate(__maxDate);
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

    const { pickerProps, inputProps, wrapperProps } = usePickerState<RangeInput, DateRange>(
      pickerStateProps,
      rangePickerValueManager
    );

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
        <DateRangePickerView
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

  RangePickerWithStateAndWrapper.propTypes = {
    value: PropTypes.arrayOf(date).isRequired,
    onChange: PropTypes.func.isRequired,
    startText: PropTypes.node,
    endText: PropTypes.node,
  };

  return React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<typeof RangePickerWithStateAndWrapper>
  >((props, ref) => <RangePickerWithStateAndWrapper {...(props as any)} forwardedRef={ref} />);
}

// TODO replace with new export type syntax
export type DateRange = DateRangeType;

export const DateRangePicker = makeRangePicker(ResponsivePopperWrapper);

export const DesktopDateRangePicker = makeRangePicker(DesktopPopperWrapper);

export const MobileDateRangePicker = makeRangePicker(MobileWrapper);

export const StaticDateRangePicker = makeRangePicker(StaticWrapper);

export { DateRangeDelimiter } from './DateRangeDelimiter';
