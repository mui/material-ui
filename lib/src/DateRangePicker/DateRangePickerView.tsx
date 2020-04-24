import * as React from 'react';
import { isRangeValid } from '../_helpers/date-utils';
import { MaterialUiPickersDate } from '../typings/date';
import { BasePickerProps } from '../typings/BasePicker';
import { calculateRangeChange } from './date-range-manager';
import { useUtils, useNow } from '../_shared/hooks/useUtils';
import { DateRangePickerInput } from './DateRangePickerInput';
import { SharedPickerProps } from '../Picker/SharedPickerProps';
import { DateRangePickerToolbar } from './DateRangePickerToolbar';
import { useParsedDate } from '../_shared/hooks/date-helpers-hooks';
import { useCalendarState } from '../views/Calendar/useCalendarState';
import { FORCE_FINISH_PICKER } from '../_shared/hooks/usePickerState';
import { DateRangePickerViewMobile } from './DateRangePickerViewMobile';
import { WrapperVariantContext } from '../wrappers/WrapperVariantContext';
import { MobileKeyboardInputView } from '../views/MobileKeyboardInputView';
import { RangeInput, DateRange, CurrentlySelectingRangeEndProps } from './RangeTypes';
import { ExportedCalendarViewProps, defaultReduceAnimations } from '../views/Calendar/CalendarView';
import {
  DateRangePickerViewDesktop,
  ExportedDesktopDateRangeCalendarProps,
} from './DateRangePickerViewDesktop';

type BaseCalendarPropsToReuse = Omit<ExportedCalendarViewProps, 'onYearChange'>;

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

interface DateRangePickerViewProps
  extends ExportedDateRangePickerViewProps,
    CurrentlySelectingRangeEndProps,
    SharedPickerProps<RangeInput, DateRange> {
  open: boolean;
  startText: React.ReactNode;
  endText: React.ReactNode;
}

export const DateRangePickerView: React.FC<DateRangePickerViewProps> = ({
  open,
  calendars = 2,
  currentlySelectingRangeEnd,
  date,
  disableAutoMonthSwitching = false,
  disableFuture,
  disableHighlightToday,
  disablePast,
  maxDate: unparsedMaxDate = new Date('2100-01-01'),
  minDate: unparsedMinDate = new Date('1900-01-01'),
  onDateChange,
  onMonthChange,
  reduceAnimations = defaultReduceAnimations,
  setCurrentlySelectingRangeEnd,
  shouldDisableDate,
  toggleMobileKeyboardView,
  isMobileKeyboardViewOpen,
  showToolbar,
  startText,
  endText,
  className,
  DateInputProps,
  ...other
}) => {
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

  const scrollToDayIfNeeded = (day: MaterialUiPickersDate) => {
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
    (newDate: MaterialUiPickersDate) => {
      const { nextSelection, newRange } = calculateRangeChange({
        newDate,
        utils,
        range: date,
        currentlySelectingRangeEnd,
      });

      setCurrentlySelectingRangeEnd(nextSelection);

      const isFullRangeSelected =
        currentlySelectingRangeEnd === 'end' && isRangeValid(utils, newRange);
      onDateChange(newRange, wrapperVariant, isFullRangeSelected ? FORCE_FINISH_PICKER : true);
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
        />
      )}

      {isMobileKeyboardViewOpen ? (
        <MobileKeyboardInputView>
          <DateRangePickerInput
            disableOpenPicker
            ignoreInvalidInputs
            startText={startText}
            endText={endText}
            currentlySelectingRangeEnd={currentlySelectingRangeEnd}
            setCurrentlySelectingRangeEnd={setCurrentlySelectingRangeEnd}
            {...DateInputProps}
          />
        </MobileKeyboardInputView>
      ) : (
        renderView()
      )}
    </div>
  );
};
