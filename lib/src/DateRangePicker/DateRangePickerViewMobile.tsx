import * as React from 'react';
import CalendarHeader from '../views/Calendar/CalendarHeader';
import { DateRange } from './RangeTypes';
import { DateRangeDay } from './DateRangePickerDay';
import { useUtils } from '../_shared/hooks/useUtils';
import { MaterialUiPickersDate } from '../typings/date';
import { Calendar, CalendarProps } from '../views/Calendar/Calendar';
import { ExportedArrowSwitcherProps } from '../_shared/ArrowSwitcher';
import { isWithinRange, isStartOfRange, isEndOfRange } from '../_helpers/date-utils';

export interface ExportedMobileDateRangeCalendarProps {}

interface DesktopDateRangeCalendarProps
  extends ExportedMobileDateRangeCalendarProps,
    CalendarProps,
    ExportedArrowSwitcherProps {
  date: DateRange;
  changeMonth: (date: MaterialUiPickersDate) => void;
}

const onlyDateView = ['date'] as ['date'];

export const DateRangePickerViewMobile: React.FC<DesktopDateRangeCalendarProps> = ({
  date,
  changeMonth,
  leftArrowButtonProps,
  leftArrowButtonText,
  leftArrowIcon,
  rightArrowButtonProps,
  rightArrowButtonText,
  rightArrowIcon,
  onChange,
  ...other
}) => {
  const utils = useUtils();

  return (
    <>
      <CalendarHeader
        view="date"
        views={onlyDateView}
        changeView={() => ({})}
        onMonthChange={changeMonth}
        leftArrowButtonProps={leftArrowButtonProps}
        leftArrowButtonText={leftArrowButtonText}
        leftArrowIcon={leftArrowIcon}
        rightArrowButtonProps={rightArrowButtonProps}
        rightArrowButtonText={rightArrowButtonText}
        rightArrowIcon={rightArrowIcon}
        {...other}
      />

      <Calendar
        {...other}
        date={date}
        onChange={onChange}
        renderDay={(day, _, DayProps) => (
          <DateRangeDay
            isPreviewing={false}
            isStartOfPreviewing={false}
            isEndOfPreviewing={false}
            isHighlighting={isWithinRange(utils, day, date)}
            isStartOfHighlighting={isStartOfRange(utils, day, date)}
            isEndOfHighlighting={isEndOfRange(utils, day, date)}
            {...DayProps}
          />
        )}
      />
    </>
  );
};
