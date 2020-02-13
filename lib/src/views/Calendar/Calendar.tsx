import * as React from 'react';
import Day from './Day';
import DayWrapper from './DayWrapper';
import SlideTransition, { SlideDirection } from './SlideTransition';
import { WrapperVariant } from '../../wrappers/Wrapper';
import { MaterialUiPickersDate } from '../../typings/date';
import { useUtils, useNow } from '../../_shared/hooks/useUtils';
import { PickerOnChangeFn } from '../../_shared/hooks/useViews';
import { findClosestEnabledDate } from '../../_helpers/date-utils';
import { makeStyles, useTheme, Typography } from '@material-ui/core';
import { useGlobalKeyDown, keycode } from '../../_shared/hooks/useKeyDown';

export interface ExportedCalendarProps {
  /** Calendar Date @DateIOType */
  date: MaterialUiPickersDate;
  /** Calendar onChange */
  onChange: PickerOnChangeFn;
  /**
   * Disable past dates
   * @default false
   */
  disablePast?: boolean;
  /**
   * Disable future dates
   * @default false
   */
  disableFuture?: boolean;
  /** Custom renderer for day @DateIOType */
  renderDay?: (
    day: MaterialUiPickersDate,
    selectedDate: MaterialUiPickersDate,
    dayInCurrentMonth: boolean,
    dayComponent: JSX.Element
  ) => JSX.Element;
  /**
   * Enables keyboard listener for moving between days in calendar
   * @default currentWrapper !== 'static'
   */
  allowKeyboardControl?: boolean;
  /** Custom loading indicator  */
  loadingIndicator?: JSX.Element;
}

export interface CalendarProps extends ExportedCalendarProps {
  minDate?: MaterialUiPickersDate;
  maxDate?: MaterialUiPickersDate;
  isDateDisabled: (day: MaterialUiPickersDate) => boolean;
  slideDirection: SlideDirection;
  currentMonth: MaterialUiPickersDate;
  reduceAnimations: boolean;
  focusedDay: MaterialUiPickersDate | null;
  changeFocusedDay: (newFocusedDay: MaterialUiPickersDate) => void;
  isMonthSwitchingAnimating: boolean;
  onMonthSwitchingAnimationEnd: () => void;
  wrapperVariant: WrapperVariant | null;
}

export const useStyles = makeStyles(theme => ({
  transitionContainer: {
    minHeight: 36 * 6 + 20,
  },
  progressContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  week: {
    display: 'flex',
    justifyContent: 'center',
  },
  iconButton: {
    zIndex: 1,
    backgroundColor: theme.palette.background.paper,
  },
  previousMonthButton: {
    marginRight: 12,
  },
  daysHeader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayLabel: {
    width: 36,
    height: 40,
    margin: '0 2px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.text.hint,
  },
}));

export const Calendar: React.FC<CalendarProps> = ({
  date,
  isMonthSwitchingAnimating,
  onMonthSwitchingAnimationEnd,
  focusedDay,
  changeFocusedDay,
  onChange,
  minDate,
  maxDate,
  slideDirection,
  disableFuture,
  disablePast,
  currentMonth,
  renderDay,
  reduceAnimations,
  allowKeyboardControl,
  wrapperVariant,
  isDateDisabled,
}) => {
  const now = useNow();
  const utils = useUtils();
  const theme = useTheme();
  const classes = useStyles();

  const handleDaySelect = React.useCallback(
    (day: MaterialUiPickersDate, isFinish: boolean | symbol = true) => {
      onChange(utils.mergeDateAndTime(day, date), isFinish);
    },
    [date, onChange, utils]
  );

  React.useEffect(() => {
    if (isDateDisabled(date)) {
      const closestEnabledDate = findClosestEnabledDate({
        date,
        utils,
        minDate: utils.date(minDate),
        maxDate: utils.date(maxDate),
        disablePast: Boolean(disablePast),
        disableFuture: Boolean(disableFuture),
        shouldDisableDate: isDateDisabled,
      });

      handleDaySelect(closestEnabledDate, false);
    }
  }, []); // eslint-disable-line

  const nowFocusedDay = focusedDay || date;
  useGlobalKeyDown(Boolean(allowKeyboardControl ?? wrapperVariant !== 'static'), {
    [keycode.ArrowUp]: () => changeFocusedDay(utils.addDays(nowFocusedDay, -7)),
    [keycode.ArrowDown]: () => changeFocusedDay(utils.addDays(nowFocusedDay, 7)),
    [keycode.ArrowLeft]: () =>
      changeFocusedDay(utils.addDays(nowFocusedDay, theme.direction === 'ltr' ? -1 : 1)),
    [keycode.ArrowRight]: () =>
      changeFocusedDay(utils.addDays(nowFocusedDay, theme.direction === 'ltr' ? 1 : -1)),
    [keycode.Home]: () => changeFocusedDay(utils.startOfWeek(nowFocusedDay)),
    [keycode.End]: () => changeFocusedDay(utils.endOfWeek(nowFocusedDay)),
    [keycode.PageUp]: () => changeFocusedDay(utils.getNextMonth(nowFocusedDay)),
    [keycode.PageDown]: () => changeFocusedDay(utils.getPreviousMonth(nowFocusedDay)),
  });

  const selectedDate = utils.startOfDay(date);
  const currentMonthNumber = utils.getMonth(currentMonth);

  return (
    <>
      <div className={classes.daysHeader}>
        {utils.getWeekdays().map((day, i) => (
          <Typography
            aria-hidden
            key={day + i.toString()}
            variant="caption"
            className={classes.dayLabel}
            children={day.charAt(0).toUpperCase()}
          />
        ))}
      </div>

      <SlideTransition
        onExited={onMonthSwitchingAnimationEnd}
        reduceAnimations={reduceAnimations}
        slideDirection={slideDirection}
        transKey={currentMonthNumber}
        className={classes.transitionContainer}
      >
        <div role="grid" style={{ overflow: 'hidden' }}>
          {utils.getWeekArray(currentMonth).map(week => (
            <div role="row" key={`week-${week[0]!.toString()}`} className={classes.week}>
              {week.map(day => {
                const disabled = isDateDisabled(day);
                const isDayInCurrentMonth = utils.getMonth(day) === currentMonthNumber;

                let dayComponent = (
                  <Day
                    day={day}
                    isAnimating={isMonthSwitchingAnimating}
                    disabled={disabled}
                    focused={Boolean(focusedDay) && utils.isSameDay(day, focusedDay)}
                    onFocus={() => changeFocusedDay(day)}
                    focusable={
                      Boolean(nowFocusedDay) &&
                      utils.toJsDate(nowFocusedDay).getDate() === utils.toJsDate(day).getDate()
                    }
                    isToday={utils.isSameDay(day, now)}
                    hidden={!isDayInCurrentMonth}
                    isInCurrentMonth={isDayInCurrentMonth}
                    selected={utils.isSameDay(selectedDate, day)}
                  />
                );

                if (renderDay) {
                  dayComponent = renderDay(day, selectedDate, isDayInCurrentMonth, dayComponent);
                }

                return (
                  <DayWrapper
                    key={day!.toString()}
                    value={day}
                    disabled={disabled}
                    dayInCurrentMonth={isDayInCurrentMonth}
                    onSelect={handleDaySelect}
                    children={dayComponent}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </SlideTransition>
    </>
  );
};

export default Calendar;
