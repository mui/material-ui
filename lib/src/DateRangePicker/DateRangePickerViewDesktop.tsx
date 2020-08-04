import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DateRange } from './RangeTypes';
import { useUtils } from '../_shared/hooks/useUtils';
import { calculateRangePreview } from './date-range-manager';
import { Calendar, CalendarProps } from '../views/Calendar/Calendar';
import { DateRangeDay, DateRangeDayProps } from './DateRangePickerDay';
import { defaultMinDate, defaultMaxDate } from '../constants/prop-types';
import { ArrowSwitcher, ExportedArrowSwitcherProps } from '../_shared/ArrowSwitcher';
import {
  usePreviousMonthDisabled,
  useNextMonthDisabled,
} from '../_shared/hooks/date-helpers-hooks';
import {
  isWithinRange,
  isStartOfRange,
  isEndOfRange,
  DateValidationProps,
} from '../_helpers/date-utils';

export interface ExportedDesktopDateRangeCalendarProps<TDate> {
  /**
   * How many calendars render on **desktop** DateRangePicker.
   *
   * @default 2
   */
  calendars?: 1 | 2 | 3;
  /**
   * Custom renderer for `<DateRangePicker />` days. @DateIOType
   * @example (date, DateRangeDayProps) => <DateRangePickerDay {...DateRangeDayProps} />
   */
  renderDay?: (date: TDate, DateRangeDayProps: DateRangeDayProps<TDate>) => JSX.Element;
}

interface DesktopDateRangeCalendarProps<TDate>
  extends ExportedDesktopDateRangeCalendarProps<TDate>,
    Omit<CalendarProps<TDate>, 'renderDay'>,
    DateValidationProps<TDate>,
    ExportedArrowSwitcherProps {
  date: DateRange<TDate | null>;
  changeMonth: (date: TDate) => void;
  currentlySelectingRangeEnd: 'start' | 'end';
}

export const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'row',
    },
    rangeCalendarContainer: {
      '&:not(:last-child)': {
        borderRight: `2px solid ${theme.palette.divider}`,
      },
    },
    calendar: {
      minWidth: 312,
      minHeight: 288,
    },
    arrowSwitcher: {
      padding: '16px 16px 8px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  }),
  { name: 'MuiPickersDesktopDateRangeCalendar' }
);

function getCalendarsArray(calendars: ExportedDesktopDateRangeCalendarProps<unknown>['calendars']) {
  switch (calendars) {
    case 1:
      return [0];
    case 2:
      return [0, 0];
    case 3:
      return [0, 0, 0];
    // this will not work in IE11, but allows to support any amount of calendars
    default:
      return new Array(calendars).fill(0);
  }
}

export function DateRangePickerViewDesktop<TDate>(props: DesktopDateRangeCalendarProps<TDate>) {
  const {
    date,
    calendars = 2,
    changeMonth,
    leftArrowButtonProps,
    leftArrowButtonText,
    leftArrowIcon,
    rightArrowButtonProps,
    rightArrowButtonText,
    rightArrowIcon,
    onChange,
    disableFuture,
    disablePast,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    minDate: __minDate,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    maxDate: __maxDate,
    currentlySelectingRangeEnd,
    currentMonth,
    renderDay = (_, dateRangeProps) => <DateRangeDay {...dateRangeProps} />,
    ...other
  } = props;

  const utils = useUtils<TDate>();
  const classes = useStyles();
  const minDate = __minDate || utils.date(defaultMinDate);
  const maxDate = __maxDate || utils.date(defaultMaxDate);

  const [rangePreviewDay, setRangePreviewDay] = React.useState<TDate | null>(null);

  const isNextMonthDisabled = useNextMonthDisabled(currentMonth, { disableFuture, maxDate });
  const isPreviousMonthDisabled = usePreviousMonthDisabled(currentMonth, { disablePast, minDate });

  const previewingRange = calculateRangePreview({
    utils,
    range: date,
    newDate: rangePreviewDay,
    currentlySelectingRangeEnd,
  });

  const handleDayChange = React.useCallback(
    (day: TDate | null) => {
      setRangePreviewDay(null);
      onChange(day);
    },
    [onChange]
  );

  const handlePreviewDayChange = (newPreviewRequest: TDate) => {
    if (!isWithinRange(utils, newPreviewRequest, date)) {
      setRangePreviewDay(newPreviewRequest);
    } else {
      setRangePreviewDay(null);
    }
  };

  const CalendarTransitionProps = React.useMemo(
    () => ({
      onMouseLeave: () => setRangePreviewDay(null),
    }),
    []
  );

  const selectNextMonth = React.useCallback(() => {
    changeMonth(utils.getNextMonth(currentMonth));
  }, [changeMonth, currentMonth, utils]);

  const selectPreviousMonth = React.useCallback(() => {
    changeMonth(utils.getPreviousMonth(currentMonth));
  }, [changeMonth, currentMonth, utils]);

  return (
    <div className={classes.root}>
      {getCalendarsArray(calendars).map((_, index) => {
        const monthOnIteration = utils.setMonth(currentMonth, utils.getMonth(currentMonth) + index);

        return (
          <div key={index} className={classes.rangeCalendarContainer}>
            <ArrowSwitcher
              className={classes.arrowSwitcher}
              onLeftClick={selectPreviousMonth}
              onRightClick={selectNextMonth}
              isLeftHidden={index !== 0}
              isRightHidden={index !== calendars - 1}
              isLeftDisabled={isPreviousMonthDisabled}
              isRightDisabled={isNextMonthDisabled}
              leftArrowButtonProps={leftArrowButtonProps}
              leftArrowButtonText={leftArrowButtonText}
              leftArrowIcon={leftArrowIcon}
              rightArrowButtonProps={rightArrowButtonProps}
              rightArrowButtonText={rightArrowButtonText}
              rightArrowIcon={rightArrowIcon}
              text={utils.format(monthOnIteration, 'monthAndYear')}
            />
            <Calendar<TDate>
              {...other}
              key={index}
              date={date}
              className={classes.calendar}
              onChange={handleDayChange}
              currentMonth={monthOnIteration}
              TransitionProps={CalendarTransitionProps}
              renderDay={(day, __, DayProps) =>
                renderDay(day, {
                  isPreviewing: isWithinRange(utils, day, previewingRange),
                  isStartOfPreviewing: isStartOfRange(utils, day, previewingRange),
                  isEndOfPreviewing: isEndOfRange(utils, day, previewingRange),
                  isHighlighting: isWithinRange(utils, day, date),
                  isStartOfHighlighting: isStartOfRange(utils, day, date),
                  isEndOfHighlighting: isEndOfRange(utils, day, date),
                  onMouseEnter: () => handlePreviewDayChange(day),
                  ...DayProps,
                })
              }
            />
          </div>
        );
      })}
    </div>
  );
}
