import * as React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { Day, DayProps } from './Day';
import { MaterialUiPickersDate } from '../../typings/date';
import { useUtils, useNow } from '../../_shared/hooks/useUtils';
import { PickerOnChangeFn } from '../../_shared/hooks/useViews';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { DAY_SIZE, DAY_MARGIN } from '../../constants/dimensions';
import { findClosestEnabledDate } from '../../_helpers/date-utils';
import { useGlobalKeyDown, keycode } from '../../_shared/hooks/useKeyDown';
import { SlideTransition, SlideDirection, SlideTransitionProps } from './SlideTransition';

export interface ExportedCalendarProps
  extends Pick<DayProps, 'disableHighlightToday' | 'showDaysOutsideCurrentMonth'> {
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
  /** Custom renderer for day. Check [DayComponentProps api](https://material-ui-pickers.dev/api/Day) @DateIOType */
  renderDay?: (
    day: MaterialUiPickersDate,
    selectedDates: MaterialUiPickersDate[],
    DayComponentProps: DayProps
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
  date: MaterialUiPickersDate | MaterialUiPickersDate[];
  minDate: MaterialUiPickersDate;
  maxDate: MaterialUiPickersDate;
  isDateDisabled: (day: MaterialUiPickersDate) => boolean;
  slideDirection: SlideDirection;
  currentMonth: MaterialUiPickersDate;
  reduceAnimations: boolean;
  focusedDay: MaterialUiPickersDate | null;
  changeFocusedDay: (newFocusedDay: MaterialUiPickersDate) => void;
  isMonthSwitchingAnimating: boolean;
  onMonthSwitchingAnimationEnd: () => void;
  className?: string;
  TransitionProps?: Partial<SlideTransitionProps>;
}

export const useStyles = makeStyles(theme => ({
  transitionContainer: {
    minHeight: (DAY_SIZE + DAY_MARGIN * 4) * 6,
  },
  transitionContainerOverflowAllowed: {
    overflowX: 'visible',
  },
  progressContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  week: {
    margin: `${DAY_MARGIN}px 0`,
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
  isDateDisabled,
  disableHighlightToday,
  showDaysOutsideCurrentMonth,
  className,
  TransitionProps,
}) => {
  const now = useNow();
  const utils = useUtils();
  const theme = useTheme();
  const classes = useStyles();

  const handleDaySelect = React.useCallback(
    (day: MaterialUiPickersDate, isFinish: boolean | symbol = true) => {
      onChange(Array.isArray(date) ? day : utils.mergeDateAndTime(day, date), isFinish);
    },
    [date, onChange, utils]
  );

  const initialDate = Array.isArray(date) ? date[0] : date;
  React.useEffect(() => {
    if (initialDate && isDateDisabled(initialDate)) {
      const closestEnabledDate = findClosestEnabledDate({
        utils,
        date: initialDate,
        minDate: utils.date(minDate),
        maxDate: utils.date(maxDate),
        disablePast: Boolean(disablePast),
        disableFuture: Boolean(disableFuture),
        shouldDisableDate: isDateDisabled,
      });

      handleDaySelect(closestEnabledDate, false);
    }
  }, []); // eslint-disable-line

  const nowFocusedDay = focusedDay || initialDate;
  useGlobalKeyDown(Boolean(allowKeyboardControl), {
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

  const currentMonthNumber = utils.getMonth(currentMonth);
  const selectedDates = (Array.isArray(date) ? date : [date])
    .filter(Boolean)
    .map(selectedDateItem => utils.startOfDay(selectedDateItem));

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
        transKey={currentMonthNumber}
        onExited={onMonthSwitchingAnimationEnd}
        reduceAnimations={reduceAnimations}
        slideDirection={slideDirection}
        className={clsx(classes.transitionContainer, className)}
        {...TransitionProps}
      >
        <div role="grid" style={{ overflow: 'hidden' }}>
          {utils.getWeekArray(currentMonth).map(week => (
            <div role="row" key={`week-${(week[0] as any)!.toString()}`} className={classes.week}>
              {week.map(day => {
                const disabled = isDateDisabled(day);
                const isDayInCurrentMonth = utils.getMonth(day) === currentMonthNumber;

                const dayProps: DayProps = {
                  key: (day as any)?.toString(),
                  day: day,
                  role: 'cell',
                  isAnimating: isMonthSwitchingAnimating,
                  disabled: disabled,
                  allowKeyboardControl: allowKeyboardControl,
                  focused:
                    allowKeyboardControl && Boolean(focusedDay) && utils.isSameDay(day, focusedDay),
                  today: utils.isSameDay(day, now),
                  inCurrentMonth: isDayInCurrentMonth,
                  selected: selectedDates.some(selectedDate => utils.isSameDay(selectedDate, day)),
                  disableHighlightToday,
                  showDaysOutsideCurrentMonth,
                  focusable:
                    allowKeyboardControl &&
                    Boolean(nowFocusedDay) &&
                    utils.toJsDate(nowFocusedDay).getDate() === utils.toJsDate(day).getDate(),
                  onDayFocus: changeFocusedDay,
                  onDaySelect: handleDaySelect,
                };

                return renderDay ? renderDay(day, selectedDates, dayProps) : <Day {...dayProps} />;
              })}
            </div>
          ))}
        </div>
      </SlideTransition>
    </>
  );
};

Calendar.displayName = 'Calendar';

export default Calendar;
