import * as React from 'react';
import * as PropTypes from 'prop-types';
import { useUtils } from '../_shared/hooks/useUtils';
import { MobileWrapper } from '../wrappers/MobileWrapper';
import { withDefaultProps } from '../_shared/withDefaultProps';
import { useParsedDate } from '../_shared/hooks/date-helpers-hooks';
import { withDateAdapterProp } from '../_shared/withDateAdapterProp';
import { makeWrapperComponent } from '../wrappers/makeWrapperComponent';
import { ResponsiveTooltipWrapper } from '../wrappers/ResponsiveWrapper';
import { defaultMinDate, defaultMaxDate, date } from '../constants/prop-types';
import { DesktopTooltipWrapper } from '../wrappers/DesktopTooltipWrapper';
import { SomeWrapper, ExtendWrapper, StaticWrapper } from '../wrappers/Wrapper';
import { RangeInput, AllSharedDateRangePickerProps, DateRange } from './RangeTypes';
import { makeValidationHook, ValidationProps } from '../_shared/hooks/useValidation';
import { usePickerState, PickerStateValueManager } from '../_shared/hooks/usePickerState';
import { DateRangePickerView, ExportedDateRangePickerViewProps } from './DateRangePickerView';
import {
  DateRangePickerInput,
  ExportedDateRangePickerInputProps,
  DateRangeInputProps,
} from './DateRangePickerInput';
import {
  parseRangeInputValue,
  validateDateRange,
  DateRangeValidationError,
} from '../_helpers/date-utils';

export interface BaseDateRangePickerProps
  extends ExportedDateRangePickerViewProps,
    ValidationProps<DateRangeValidationError, RangeInput>,
    ExportedDateRangePickerInputProps {
  /**
   * Text for start input label and toolbar placeholder
   *
   * @default "Start"
   */
  startText?: React.ReactNode;
  /**
   * Text for end input label and toolbar placeholder
   *
   * @default "end"
   */
  endText?: React.ReactNode;
}

type RangePickerComponent<TWrapper extends SomeWrapper> = <TDate>(
  props: BaseDateRangePickerProps &
    ExtendWrapper<TWrapper> &
    AllSharedDateRangePickerProps<TDate> &
    React.RefAttributes<HTMLDivElement>
) => JSX.Element;

export const useDateRangeValidation = makeValidationHook<
  DateRangeValidationError,
  RangeInput,
  BaseDateRangePickerProps
>(validateDateRange, {
  defaultValidationError: [null, null],
  isSameError: (a, b) => a[1] === b[1] && a[0] === b[0],
});

export function makeRangePicker<TWrapper extends SomeWrapper>(
  name: string,
  Wrapper: TWrapper
): RangePickerComponent<TWrapper> {
  const WrapperComponent = makeWrapperComponent<DateRangeInputProps>(Wrapper, {
    KeyboardDateInputComponent: DateRangePickerInput,
    PureDateInputComponent: DateRangePickerInput,
  });

  const rangePickerValueManager: PickerStateValueManager<any, any> = {
    emptyValue: [null, null],
    parseInput: parseRangeInputValue,
    areValuesEqual: (utils, a, b) => utils.isEqual(a[0], b[0]) && utils.isEqual(a[1], b[1]),
  };

  function RangePickerWithStateAndWrapper<TDate>({
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
  }: BaseDateRangePickerProps & AllSharedDateRangePickerProps<TDate> & ExtendWrapper<TWrapper>) {
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
  } as any;

  const FinalPickerComponent = withDefaultProps(
    { name },
    withDateAdapterProp(RangePickerWithStateAndWrapper)
  );

  // @ts-ignore @see lib/src/Picker/makePickerWithState.tsx:95
  return React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<typeof RangePickerWithStateAndWrapper>
  >((props, ref) => <FinalPickerComponent {...(props as any)} forwardedRef={ref} />);
}

export const DateRangePicker = makeRangePicker(
  'MuiPickersDateRangePicker',
  ResponsiveTooltipWrapper
);

export type DateRangePickerProps = React.ComponentProps<typeof DateRangePicker>;

export const DesktopDateRangePicker = makeRangePicker(
  'MuiDesktopDateRangePicker',
  DesktopTooltipWrapper
);

export type DesktopDateRangePickerProps = React.ComponentProps<typeof DesktopDateRangePicker>;

export const MobileDateRangePicker = makeRangePicker('MuiMobileDateRangePicker', MobileWrapper);

export type MobileDateRangePickerProps = React.ComponentProps<typeof MobileDateRangePicker>;

export const StaticDateRangePicker = makeRangePicker('MuiStaticDateRangePicker', StaticWrapper);

export type StaticDateRangePickerProps = React.ComponentProps<typeof StaticDateRangePicker>;

export { DateRangeDelimiter } from './DateRangeDelimiter';
