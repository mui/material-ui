import * as React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Day, DayProps } from './Day';
import { useUtils, useNow } from '../../_shared/hooks/useUtils';
import { PickerOnChangeFn } from '../../_shared/hooks/useViews';
import { DAY_SIZE, DAY_MARGIN } from '../../constants/dimensions';
import { useDefaultProps } from '../../_shared/withDefaultProps';
import { PickerSelectionState } from '../../_shared/hooks/usePickerState';
import { useGlobalKeyDown, keycode } from '../../_shared/hooks/useKeyDown';
import { SlideTransition, SlideDirection, SlideTransitionProps } from './SlideTransition';

export interface ExportedCalendarProps<TDate>
  extends Pick<
    DayProps<TDate>,
    'disableHighlightToday' | 'showDaysOutsideCurrentMonth' | 'allowSameDateSelection'
  > {
  /**
   * Calendar onChange.
   */
  onChange: PickerOnChangeFn<TDate>;
  /**
   * Custom renderer for day. Check [DayComponentProps api](https://material-ui-pickers.dev/api/Day) @DateIOType.
   */
  renderDay?: (
    day: TDate,
    selectedDates: (TDate | null)[],
    DayComponentProps: DayProps<TDate>
  ) => JSX.Element;
  /**
   * Enables keyboard listener for moving between days in calendar.
   *
   * @default currentWrapper !== 'static'
   */
  allowKeyboardControl?: boolean;
  /**
   * If `true` renders `LoadingComponent` in calendar instead of calendar view.
   * Can be used to preload information and show it in calendar.
   *
   * @default false
   */
  loading?: boolean;
  /**
   * Component displaying when passed `loading` true.
   *
   * @default () => "..."
   */
  renderLoading?: () => React.ReactNode;
}

export interface CalendarProps<TDate> extends ExportedCalendarProps<TDate> {
  date: TDate | null | Array<TDate | null>;
  isDateDisabled: (day: TDate) => boolean;
  slideDirection: SlideDirection;
  currentMonth: TDate;
  reduceAnimations: boolean;
  focusedDay: TDate | null;
  changeFocusedDay: (newFocusedDay: TDate) => void;
  isMonthSwitchingAnimating: boolean;
  onMonthSwitchingAnimationEnd: () => void;
  TransitionProps?: Partial<SlideTransitionProps>;
  className?: string;
}

const muiComponentConfig = { name: 'MuiPickersCalendar' };
export const useStyles = makeStyles((theme) => {
  const weeksContainerHeight = (DAY_SIZE + DAY_MARGIN * 4) * 6;
  return {
    root: {
      minHeight: weeksContainerHeight,
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: weeksContainerHeight,
    },
    weekContainer: {
      overflow: 'hidden',
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
    weekDayLabel: {
      width: 36,
      height: 40,
      margin: '0 2px',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: theme.palette.text.secondary,
    },
  };
}, muiComponentConfig);

export function Calendar<TDate>(props: CalendarProps<TDate>) {
  const {
    allowKeyboardControl,
    allowSameDateSelection,
    changeFocusedDay,
    className,
    currentMonth,
    date,
    disableHighlightToday,
    focusedDay,
    isDateDisabled,
    isMonthSwitchingAnimating,
    loading,
    onChange,
    onMonthSwitchingAnimationEnd,
    reduceAnimations,
    renderDay,
    renderLoading = () => <span data-mui-test="loading-progress">...</span>,
    showDaysOutsideCurrentMonth,
    slideDirection,
    TransitionProps,
  } = useDefaultProps(props, muiComponentConfig);

  const now = useNow<TDate>();
  const utils = useUtils<TDate>();
  const theme = useTheme();
  const classes = useStyles();

  const handleDaySelect = React.useCallback(
    (day: TDate, isFinish: PickerSelectionState = 'finish') => {
      // TODO possibly buggy line figure out and add tests
      const finalDate = Array.isArray(date) ? day : utils.mergeDateAndTime(day, date || now);

      onChange(finalDate, isFinish);
    },
    [date, now, onChange, utils]
  );

  const initialDate = Array.isArray(date) ? date[0] : date;

  const nowFocusedDay = focusedDay || initialDate || now;
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
    .map((selectedDateItem) => selectedDateItem && utils.startOfDay(selectedDateItem));

  return (
    <React.Fragment>
      <div className={classes.daysHeader}>
        {utils.getWeekdays().map((day, i) => (
          <Typography
            aria-hidden
            key={day + i.toString()}
            variant="caption"
            className={classes.weekDayLabel}
          >
            {day.charAt(0).toUpperCase()}
          </Typography>
        ))}
      </div>
      {loading ? (
        <div className={classes.loadingContainer}>{renderLoading()}</div>
      ) : (
        <SlideTransition
          transKey={currentMonthNumber}
          onExited={onMonthSwitchingAnimationEnd}
          reduceAnimations={reduceAnimations}
          slideDirection={slideDirection}
          className={clsx(classes.root, className)}
          {...TransitionProps}
        >
          <div role="grid" className={classes.weekContainer}>
            {utils.getWeekArray(currentMonth).map((week) => (
              <div role="row" key={`week-${week[0]}`} className={classes.week}>
                {week.map((day) => {
                  const disabled = isDateDisabled(day);
                  const isDayInCurrentMonth = utils.getMonth(day) === currentMonthNumber;

                  const dayProps: DayProps<TDate> = {
                    key: (day as any)?.toString(),
                    day,
                    role: 'cell',
                    isAnimating: isMonthSwitchingAnimating,
                    disabled,
                    allowKeyboardControl,
                    allowSameDateSelection,
                    focused:
                      allowKeyboardControl &&
                      Boolean(focusedDay) &&
                      utils.isSameDay(day, nowFocusedDay),
                    today: utils.isSameDay(day, now),
                    inCurrentMonth: isDayInCurrentMonth,
                    selected: selectedDates.some(
                      (selectedDate) => selectedDate && utils.isSameDay(selectedDate, day)
                    ),
                    disableHighlightToday,
                    showDaysOutsideCurrentMonth,
                    focusable:
                      allowKeyboardControl &&
                      Boolean(nowFocusedDay) &&
                      utils.toJsDate(nowFocusedDay).getDate() === utils.toJsDate(day).getDate(),
                    onDayFocus: changeFocusedDay,
                    onDaySelect: handleDaySelect,
                  };

                  return renderDay ? (
                    renderDay(day, selectedDates, dayProps)
                  ) : (
                    <Day {...dayProps} />
                  );
                })}
              </div>
            ))}
          </div>
        </SlideTransition>
      )}
    </React.Fragment>
  );
}

Calendar.displayName = 'Calendar';
