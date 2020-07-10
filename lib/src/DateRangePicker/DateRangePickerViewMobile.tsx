import * as React from 'react';
import CalendarHeader from '../views/Calendar/CalendarHeader';
import { DateRange } from './RangeTypes';
import { DateRangeDay } from './DateRangePickerDay';
import { useUtils } from '../_shared/hooks/useUtils';
import { Calendar, CalendarProps } from '../views/Calendar/Calendar';
import { ExportedArrowSwitcherProps } from '../_shared/ArrowSwitcher';
import { defaultMinDate, defaultMaxDate } from '../constants/prop-types';
import { ExportedDesktopDateRangeCalendarProps } from './DateRangePickerViewDesktop';
import {
  isWithinRange,
  isStartOfRange,
  isEndOfRange,
  DateValidationProps,
} from '../_helpers/date-utils';

export interface ExportedMobileDateRangeCalendarProps
  extends Pick<ExportedDesktopDateRangeCalendarProps, 'renderDay'> {}

interface DesktopDateRangeCalendarProps
  extends ExportedMobileDateRangeCalendarProps,
    Omit<CalendarProps, 'renderDay'>,
    DateValidationProps,
    ExportedArrowSwitcherProps {
  date: DateRange;
  changeMonth: (date: unknown) => void;
}

const onlyDateView = ['date'] as ['date'];

export const DateRangePickerViewMobile: React.FC<DesktopDateRangeCalendarProps> = ({
  changeMonth,
  date,
  leftArrowButtonProps,
  leftArrowButtonText,
  leftArrowIcon,
  maxDate: __maxDate,
  minDate: __minDate,
  onChange,
  rightArrowButtonProps,
  rightArrowButtonText,
  rightArrowIcon,
  renderDay = (_, props) => <DateRangeDay {...props} />,
  ...other
}) => {
  const utils = useUtils();
  const minDate = __minDate || utils.date(defaultMinDate);
  const maxDate = __maxDate || utils.date(defaultMaxDate);

  return (
    <React.Fragment>
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
        minDate={minDate}
        maxDate={maxDate}
        {...other}
      />

      <Calendar
        {...other}
        date={date}
        onChange={onChange}
        renderDay={(day, _, DayProps) =>
          renderDay(day, {
            isPreviewing: false,
            isStartOfPreviewing: false,
            isEndOfPreviewing: false,
            isHighlighting: isWithinRange(utils, day, date),
            isStartOfHighlighting: isStartOfRange(utils, day, date),
            isEndOfHighlighting: isEndOfRange(utils, day, date),
            ...DayProps,
          })
        }
      />
    </React.Fragment>
  );
};
