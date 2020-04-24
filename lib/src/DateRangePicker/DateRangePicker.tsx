import * as React from 'react';
import { MaterialUiPickersDate } from '../typings/date';
import { BasePickerProps } from '../typings/BasePicker';
import { MobileWrapper } from '../wrappers/MobileWrapper';
import { DateRangeInputProps } from './DateRangePickerInput';
import { parsePickerInputValue } from '../_helpers/date-utils';
import { usePickerState } from '../_shared/hooks/usePickerState';
import { AllSharedPickerProps } from '../Picker/SharedPickerProps';
import { DateRange as DateRangeType, RangeInput } from './RangeTypes';
import { DesktopPopperWrapper } from '../wrappers/DesktopPopperWrapper';
import { MuiPickersAdapter, useUtils } from '../_shared/hooks/useUtils';
import { makeWrapperComponent } from '../wrappers/makeWrapperComponent';
import { ResponsivePopperWrapper } from '../wrappers/ResponsiveWrapper';
import { SomeWrapper, ExtendWrapper, StaticWrapper } from '../wrappers/Wrapper';
import { DateRangePickerView, ExportedDateRangePickerViewProps } from './DateRangePickerView';
import { DateRangePickerInput, ExportedDateRangePickerInputProps } from './DateRangePickerInput';

export function parseRangeInputValue(
  now: MaterialUiPickersDate,
  utils: MuiPickersAdapter,
  { value = [null, null], defaultHighlight }: BasePickerProps<RangeInput, DateRange>
) {
  return value.map(date =>
    date === null
      ? null
      : utils.startOfDay(parsePickerInputValue(now, utils, { value: date, defaultHighlight }))
  ) as DateRangeType;
}

export interface DateRangePickerProps
  extends ExportedDateRangePickerViewProps,
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

export function makeRangePicker<TWrapper extends SomeWrapper>(Wrapper: TWrapper) {
  const WrapperComponent = makeWrapperComponent<DateRangeInputProps, RangeInput, DateRange>(
    Wrapper,
    {
      KeyboardDateInputComponent: DateRangePickerInput,
      PureDateInputComponent: DateRangePickerInput,
    }
  );

  function RangePickerWithStateAndWrapper({
    calendars,
    minDate,
    maxDate,
    disablePast,
    disableFuture,
    shouldDisableDate,
    showDaysOutsideCurrentMonth,
    onMonthChange,
    disableHighlightToday,
    reduceAnimations,
    value,
    onChange,
    mask = '__/__/____',
    startText = 'Start',
    endText = 'End',
    inputFormat: passedInputFormat,
    ...restPropsForTextField
  }: DateRangePickerProps & AllSharedPickerProps<RangeInput, DateRange> & ExtendWrapper<TWrapper>) {
    const utils = useUtils();
    const [currentlySelectingRangeEnd, setCurrentlySelectingRangeEnd] = React.useState<
      'start' | 'end'
    >('start');

    const pickerStateProps = {
      ...restPropsForTextField,
      value,
      onChange,
      inputFormat: passedInputFormat || utils.formats.keyboardDate,
    };

    const { pickerProps, inputProps, wrapperProps } = usePickerState<RangeInput, DateRange>(
      pickerStateProps,
      {
        parseInput: parseRangeInputValue,
        areValuesEqual: (a, b) => utils.isEqual(a[0], b[0]) && utils.isEqual(a[1], b[1]),
        validateInput: () => undefined,
        emptyValue: [null, null],
      }
    );

    const DateInputProps = {
      ...inputProps,
      ...restPropsForTextField,
      currentlySelectingRangeEnd,
      setCurrentlySelectingRangeEnd,
      startText,
      endText,
      mask,
    };

    return (
      <WrapperComponent
        wrapperProps={wrapperProps}
        DateInputProps={DateInputProps}
        {...restPropsForTextField}
      >
        <DateRangePickerView
          open={wrapperProps.open}
          DateInputProps={DateInputProps}
          calendars={calendars}
          minDate={minDate}
          maxDate={maxDate}
          disablePast={disablePast}
          disableFuture={disableFuture}
          shouldDisableDate={shouldDisableDate}
          showDaysOutsideCurrentMonth={showDaysOutsideCurrentMonth}
          onMonthChange={onMonthChange}
          disableHighlightToday={disableHighlightToday}
          reduceAnimations={reduceAnimations}
          currentlySelectingRangeEnd={currentlySelectingRangeEnd}
          setCurrentlySelectingRangeEnd={setCurrentlySelectingRangeEnd}
          startText={startText}
          endText={endText}
          {...pickerProps}
        />
      </WrapperComponent>
    );
  }

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
