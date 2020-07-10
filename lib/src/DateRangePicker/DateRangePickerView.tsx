import * as React from 'react';
import * as PropTypes from 'prop-types';
import { isRangeValid } from '../_helpers/date-utils';
import { BasePickerProps } from '../typings/BasePicker';
import { calculateRangeChange } from './date-range-manager';
import { useUtils, useNow } from '../_shared/hooks/useUtils';
import { SharedPickerProps } from '../Picker/SharedPickerProps';
import { DateRangePickerToolbar } from './DateRangePickerToolbar';
import { useParsedDate } from '../_shared/hooks/date-helpers-hooks';
import { useCalendarState } from '../views/Calendar/useCalendarState';
import { DateRangePickerViewMobile } from './DateRangePickerViewMobile';
import { defaultMaxDate, defaultMinDate } from '../constants/prop-types';
import { WrapperVariantContext } from '../wrappers/WrapperVariantContext';
import { MobileKeyboardInputView } from '../views/MobileKeyboardInputView';
import { DateRangePickerInput, DateRangeInputProps } from './DateRangePickerInput';
import { RangeInput, DateRange, CurrentlySelectingRangeEndProps } from './RangeTypes';
import { ExportedCalendarViewProps, defaultReduceAnimations } from '../views/Calendar/CalendarView';
import {
  DateRangePickerViewDesktop,
  ExportedDesktopDateRangeCalendarProps,
} from './DateRangePickerViewDesktop';

type BaseCalendarPropsToReuse = Omit<ExportedCalendarViewProps, 'onYearChange' | 'renderDay'>;

export interface ExportedDateRangePickerViewProps
  extends BaseCalendarPropsToReuse,
    ExportedDesktopDateRangeCalendarProps,
    Omit<BasePickerProps, 'value' | 'onChange'> {
  /**
   * if `true` after selecting `start` date  calendar will not automatically switch to the month of `end` date
   * @default false
   */
  disableAutoMonthSwitching?: boolean;
}

interface DateRangePickerViewProps<TDate = unknown>
  extends ExportedDateRangePickerViewProps,
    CurrentlySelectingRangeEndProps,
    SharedPickerProps<RangeInput<TDate>, DateRange<TDate>, DateRangeInputProps> {
  open: boolean;
  startText: React.ReactNode;
  endText: React.ReactNode;
}

export const DateRangePickerView = <TDate extends unknown>({
  calendars = 2,
  className,
  currentlySelectingRangeEnd,
  date,
  DateInputProps,
  disableAutoMonthSwitching = false,
  disableFuture,
  disableHighlightToday,
  disablePast,
  endText,
  isMobileKeyboardViewOpen,
  maxDate: unparsedMaxDate = defaultMaxDate,
  minDate: unparsedMinDate = defaultMinDate,
  onDateChange,
  onMonthChange,
  open,
  reduceAnimations = defaultReduceAnimations,
  setCurrentlySelectingRangeEnd,
  shouldDisableDate,
  showToolbar,
  startText,
  toggleMobileKeyboardView,
  toolbarFormat,
  toolbarTitle,
  ...other
}: DateRangePickerViewProps<TDate>) => {
  const now = useNow();
  const utils = useUtils();
  const wrapperVariant = React.useContext(WrapperVariantContext);
  const minDate = useParsedDate(unparsedMinDate)!;
  const maxDate = useParsedDate(unparsedMaxDate)!;

  const [start, end] = date;
  const {
    changeMonth,
    calendarState,
    isDateDisabled,
    onMonthSwitchingAnimationEnd,
    changeFocusedDay,
  } = useCalendarState({
    date: start || end || now,
    minDate,
    maxDate,
    reduceAnimations,
    disablePast,
    disableFuture,
    onMonthChange,
    shouldDisableDate,
    disableSwitchToMonthOnDayFocus: true,
  });

  const toShowToolbar = showToolbar ?? wrapperVariant !== 'desktop';

  const scrollToDayIfNeeded = (day: unknown) => {
    if (!utils.isValid(day) || isDateDisabled(day)) {
      return;
    }

    const displayingMonthRange = wrapperVariant === 'mobile' ? 0 : calendars - 1;
    const currentMonthNumber = utils.getMonth(calendarState.currentMonth);
    const requestedMonthNumber = utils.getMonth(day);

    if (
      !utils.isSameYear(calendarState.currentMonth, day) ||
      requestedMonthNumber < currentMonthNumber ||
      requestedMonthNumber > currentMonthNumber + displayingMonthRange
    ) {
      const newMonth =
        currentlySelectingRangeEnd === 'start'
          ? start
          : // If need to focus end, scroll to the state when "end" is displaying in the last calendar
            utils.addMonths(end, -displayingMonthRange);

      changeMonth(newMonth);
    }
  };

  React.useEffect(() => {
    if (disableAutoMonthSwitching || !open) {
      return;
    }

    if (
      (currentlySelectingRangeEnd === 'start' && start === null) ||
      (currentlySelectingRangeEnd === 'end' && end === null)
    ) {
      return;
    }

    scrollToDayIfNeeded(currentlySelectingRangeEnd === 'start' ? start : end);
  }, [currentlySelectingRangeEnd, date]); // eslint-disable-line

  const handleChange = React.useCallback(
    (newDate: unknown) => {
      const { nextSelection, newRange } = calculateRangeChange({
        newDate,
        utils,
        range: date,
        currentlySelectingRangeEnd,
      });

      setCurrentlySelectingRangeEnd(nextSelection);

      const isFullRangeSelected =
        currentlySelectingRangeEnd === 'end' && isRangeValid(utils, newRange);

      onDateChange(
        newRange as DateRange<TDate>,
        wrapperVariant,
        isFullRangeSelected ? 'finish' : 'partial'
      );
    },
    [
      currentlySelectingRangeEnd,
      date,
      onDateChange,
      setCurrentlySelectingRangeEnd,
      utils,
      wrapperVariant,
    ]
  );

  const renderView = () => {
    const sharedCalendarProps = {
      date,
      isDateDisabled,
      changeFocusedDay,
      onChange: handleChange,
      reduceAnimations,
      disableHighlightToday,
      onMonthSwitchingAnimationEnd,
      changeMonth,
      currentlySelectingRangeEnd,
      disableFuture,
      disablePast,
      minDate,
      maxDate,
      ...calendarState,
      ...other,
    };

    switch (wrapperVariant) {
      case 'desktop': {
        return <DateRangePickerViewDesktop calendars={calendars} {...sharedCalendarProps} />;
      }

      default: {
        return <DateRangePickerViewMobile {...sharedCalendarProps} />;
      }
    }
  };

  return (
    <div className={className}>
      {toShowToolbar && (
        <DateRangePickerToolbar
          date={date}
          isMobileKeyboardViewOpen={isMobileKeyboardViewOpen}
          toggleMobileKeyboardView={toggleMobileKeyboardView}
          currentlySelectingRangeEnd={currentlySelectingRangeEnd}
          setCurrentlySelectingRangeEnd={setCurrentlySelectingRangeEnd}
          startText={startText}
          endText={endText}
          toolbarTitle={toolbarTitle}
          toolbarFormat={toolbarFormat}
        />
      )}

      {isMobileKeyboardViewOpen ? (
        <MobileKeyboardInputView>
          <DateRangePickerInput disableOpenPicker ignoreInvalidInputs {...DateInputProps} />
        </MobileKeyboardInputView>
      ) : (
        renderView()
      )}
    </div>
  );
};

DateRangePickerView.propTypes = {
  disableAutoMonthSwitching: PropTypes.bool,
  calendars: PropTypes.oneOf([1, 2, 3]),
};
