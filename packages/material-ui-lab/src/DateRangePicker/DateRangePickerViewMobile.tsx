import * as React from 'react';
import PickersCalendarHeader, {
  ExportedCalendarHeaderProps,
} from '../DayPicker/PickersCalendarHeader';
import { DateRange } from './RangeTypes';
import DateRangeDay from '../DateRangePickerDay/DateRangePickerDay';
import { useUtils } from '../internal/pickers/hooks/useUtils';
import PickersCalendar, { PickersCalendarProps } from '../DayPicker/PickersCalendar';
import { defaultMinDate, defaultMaxDate } from '../internal/pickers/constants/prop-types';
import { ExportedDesktopDateRangeCalendarProps } from './DateRangePickerViewDesktop';
import {
  isWithinRange,
  isStartOfRange,
  isEndOfRange,
  DateValidationProps,
} from '../internal/pickers/date-utils';
import { doNothing } from '../internal/pickers/utils';

export interface ExportedMobileDateRangeCalendarProps<TDate>
  extends Pick<ExportedDesktopDateRangeCalendarProps<TDate>, 'renderDay'> {}

interface DesktopDateRangeCalendarProps<TDate>
  extends ExportedMobileDateRangeCalendarProps<TDate>,
    Omit<PickersCalendarProps<TDate>, 'date' | 'renderDay' | 'onFocusedDayChange'>,
    DateValidationProps<TDate>,
    ExportedCalendarHeaderProps<TDate> {
  date: DateRange<TDate>;
  changeMonth: (date: TDate) => void;
}

const onlyDateView = ['date'] as ['date'];

/**
 * @ignore - internal component.
 */
export function DateRangePickerViewMobile<TDate>(props: DesktopDateRangeCalendarProps<TDate>) {
  const {
    changeMonth,
    components,
    componentsProps,
    date,
    leftArrowButtonText,
    maxDate: maxDateProp,
    minDate: minDateProp,
    onChange,
    renderDay = (_, dayProps) => <DateRangeDay<TDate> {...dayProps} />,
    rightArrowButtonText,
    ...other
  } = props;

  const utils = useUtils();
  const minDate = minDateProp || utils.date(defaultMinDate);
  const maxDate = maxDateProp || utils.date(defaultMaxDate);

  return (
    <React.Fragment>
      <PickersCalendarHeader
        openView="date"
        views={onlyDateView}
        onMonthChange={changeMonth as any}
        leftArrowButtonText={leftArrowButtonText}
        components={components}
        componentsProps={componentsProps}
        rightArrowButtonText={rightArrowButtonText}
        minDate={minDate}
        maxDate={maxDate}
        {...other}
      />
      <PickersCalendar<TDate>
        {...other}
        date={date}
        onChange={onChange}
        onFocusedDayChange={doNothing}
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
}
