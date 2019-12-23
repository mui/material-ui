import * as React from 'react';
import Day from './Day';
import DayWrapper from './DayWrapper';
import SlideTransition, { SlideDirection } from './SlideTransition';
import { VariantContext } from '../../wrappers/Wrapper';
import { useUtils } from '../../_shared/hooks/useUtils';
import { MaterialUiPickersDate } from '../../typings/date';
import { IconButtonProps } from '@material-ui/core/IconButton';
import { useGlobalKeyDown } from '../../_shared/hooks/useKeyDown';
import { findClosestEnabledDate } from '../../_helpers/date-utils';
import { makeStyles, useTheme, Typography } from '@material-ui/core';

export interface CalendarProps {
  /** Calendar Date @DateIOType */
  date: MaterialUiPickersDate;
  /** Calendar onChange */
  onChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
  /** Disable past dates */
  disablePast?: boolean;
  /** Disable future dates */
  disableFuture?: boolean;
  /** Left arrow icon */
  leftArrowIcon?: React.ReactNode;
  /** Right arrow icon */
  rightArrowIcon?: React.ReactNode;
  /** Custom renderer for day @DateIOType */
  renderDay?: (
    day: MaterialUiPickersDate,
    selectedDate: MaterialUiPickersDate,
    dayInCurrentMonth: boolean,
    dayComponent: JSX.Element
  ) => JSX.Element;
  /**
   * Enables keyboard listener for moving between days in calendar
   * @default true
   */
  allowKeyboardControl?: boolean;
  /**
   * Props to pass to left arrow button
   * @type {Partial<IconButtonProps>}
   */
  leftArrowButtonProps?: Partial<IconButtonProps>;
  /**
   * Props to pass to right arrow button
   * @type {Partial<IconButtonProps>}
   */
  rightArrowButtonProps?: Partial<IconButtonProps>;
  /** Disable specific date @DateIOType */
  shouldDisableDate?: (day: MaterialUiPickersDate) => boolean;
  /** Callback firing on month change. Return promise to render spinner till it will not be resolved @DateIOType */
  onMonthChange?: (date: MaterialUiPickersDate) => void | Promise<void>;
  /** Custom loading indicator  */
  loadingIndicator?: JSX.Element;
  minDate?: MaterialUiPickersDate;
  maxDate?: MaterialUiPickersDate;
  slideDirection: SlideDirection;
  currentMonth: MaterialUiPickersDate;
  reduceAnimations: boolean;
}

export const useStyles = makeStyles(theme => ({
  transitionContainer: {
    minHeight: 36 * 6,
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
  ...props
}) => {
  const utils = useUtils();
  const theme = useTheme();
  const classes = useStyles();
  const now = utils.date();
  const variant = React.useContext(VariantContext);

  const validateMinMaxDate = React.useCallback(
    (day: MaterialUiPickersDate) => {
      return Boolean(
        (disableFuture && utils.isAfterDay(day, now)) ||
          (disablePast && utils.isBeforeDay(day, now)) ||
          (minDate && utils.isBeforeDay(day, utils.date(minDate))) ||
          (maxDate && utils.isAfterDay(day, utils.date(maxDate)))
      );
    },
    [disableFuture, disablePast, maxDate, minDate, now, utils]
  );

  const shouldDisableDate = React.useCallback(
    (day: MaterialUiPickersDate) => {
      return (
        validateMinMaxDate(day) || Boolean(props.shouldDisableDate && props.shouldDisableDate(day))
      );
    },
    [props, validateMinMaxDate]
  );

  const handleDaySelect = React.useCallback(
    (day: MaterialUiPickersDate, isFinish = true) => {
      onChange(utils.mergeDateAndTime(day, date), isFinish);
    },
    [date, onChange, utils]
  );

  const moveToDay = React.useCallback(
    (day: MaterialUiPickersDate) => {
      if (day && !shouldDisableDate(day)) {
        handleDaySelect(day, false);
      }
    },
    [handleDaySelect, shouldDisableDate]
  );

  React.useEffect(() => {
    if (shouldDisableDate(date)) {
      const closestEnabledDate = findClosestEnabledDate({
        date,
        utils,
        minDate: utils.date(minDate),
        maxDate: utils.date(maxDate),
        disablePast: Boolean(disablePast),
        disableFuture: Boolean(disableFuture),
        shouldDisableDate: shouldDisableDate,
      });

      handleDaySelect(closestEnabledDate, false);
    }
  }, []); // eslint-disable-line

  useGlobalKeyDown(Boolean(allowKeyboardControl && variant !== 'static'), {
    38: () => moveToDay(utils.addDays(date, -7)), // ArrowUp
    40: () => moveToDay(utils.addDays(date, 7)), // ArrowDown
    37: () => moveToDay(utils.addDays(date, theme.direction === 'ltr' ? -1 : 1)), // ArrowLeft
    39: () => moveToDay(utils.addDays(date, theme.direction === 'ltr' ? 1 : -1)), // ArrowRight
  });

  const selectedDate = utils.startOfDay(date);
  const currentMonthNumber = utils.getMonth(currentMonth);

  return (
    <>
      <div className={classes.daysHeader}>
        {utils.getWeekdays().map((day, i) => (
          <Typography
            key={day + i.toString()}
            variant="caption"
            className={classes.dayLabel}
            children={day.charAt(0).toUpperCase()}
          />
        ))}
      </div>

      <SlideTransition
        reduceAnimations={reduceAnimations}
        slideDirection={slideDirection}
        transKey={currentMonth!.toString()}
        className={classes.transitionContainer}
      >
        <div>
          {utils.getWeekArray(currentMonth).map(week => (
            <div key={`week-${week[0]!.toString()}`} className={classes.week}>
              {week.map(day => {
                const disabled = shouldDisableDate(day);
                const isDayInCurrentMonth = utils.getMonth(day) === currentMonthNumber;

                let dayComponent = (
                  <Day
                    disabled={disabled}
                    current={utils.isSameDay(day, now)}
                    hidden={!isDayInCurrentMonth}
                    selected={utils.isSameDay(selectedDate, day)}
                    children={utils.getDayText(day)}
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
