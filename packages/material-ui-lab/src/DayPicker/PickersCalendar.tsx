import * as React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { StyleRules, WithStyles, withStyles, Theme } from '@material-ui/core/styles';
import PickersDay, { PickersDayProps } from '../PickersDay/PickersDay';
import { useUtils, useNow } from '../internal/pickers/hooks/useUtils';
import { PickerOnChangeFn } from '../internal/pickers/hooks/useViews';
import { DAY_SIZE, DAY_MARGIN } from '../internal/pickers/constants/dimensions';
import { PickerSelectionState } from '../internal/pickers/hooks/usePickerState';
import SlideTransition, { SlideDirection, SlideTransitionProps } from './PickersSlideTransition';

export interface ExportedCalendarProps<TDate>
  extends Pick<
    PickersDayProps<TDate>,
    'disableHighlightToday' | 'showDaysOutsideCurrentMonth' | 'allowSameDateSelection'
  > {
  /**
   * Calendar onChange.
   */
  onChange: PickerOnChangeFn<TDate>;
  /**
   * Custom renderer for day. Check the [PickersDay](https://material-ui.com/api/pickers-day/) component.
   */
  renderDay?: (
    day: TDate,
    selectedDates: Array<TDate | null>,
    DayComponentProps: PickersDayProps<TDate>,
  ) => JSX.Element;
  /**
   * Enables keyboard listener for moving between days in calendar.
   * Defaults to `true` unless the `ClockPicker` is used inside a `Static*` picker component.
   */
  allowKeyboardControl?: boolean;
  /**
   * If `true` renders `LoadingComponent` in calendar instead of calendar view.
   * Can be used to preload information and show it in calendar.
   * @default false
   */
  loading?: boolean;
  /**
   * Component displaying when passed `loading` true.
   * @default () => "..."
   */
  renderLoading?: () => React.ReactNode;
}

export interface PickersCalendarProps<TDate> extends ExportedCalendarProps<TDate> {
  date: TDate | [TDate | null, TDate | null] | null;
  isDateDisabled: (day: TDate) => boolean;
  slideDirection: SlideDirection;
  currentMonth: TDate;
  reduceAnimations: boolean;
  focusedDay: TDate | null;
  onFocusedDayChange: (newFocusedDay: TDate) => void;
  isMonthSwitchingAnimating: boolean;
  onMonthSwitchingAnimationEnd: () => void;
  TransitionProps?: Partial<SlideTransitionProps>;
  className?: string;
}

export type PickersCalendarClassKey =
  | 'root'
  | 'loadingContainer'
  | 'weekContainer'
  | 'week'
  | 'daysHeader'
  | 'weekDayLabel';

const weeksContainerHeight = (DAY_SIZE + DAY_MARGIN * 4) * 6;
export const styles = (theme: Theme): StyleRules<PickersCalendarClassKey> => ({
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
});

/**
 * @ignore - do not document.
 */
function PickersCalendar<TDate>(props: PickersCalendarProps<TDate> & WithStyles<typeof styles>) {
  const {
    allowKeyboardControl,
    allowSameDateSelection,
    onFocusedDayChange: changeFocusedDay,
    classes,
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
  } = props;

  const now = useNow<TDate>();
  const utils = useUtils<TDate>();
  const handleDaySelect = React.useCallback(
    (day: TDate, isFinish: PickerSelectionState = 'finish') => {
      // TODO possibly buggy line figure out and add tests
      const finalDate = Array.isArray(date) ? day : utils.mergeDateAndTime(day, date || now);

      onChange(finalDate, isFinish);
    },
    [date, now, onChange, utils],
  );

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
          <div data-mui-test="pickers-calendar" role="grid" className={classes.weekContainer}>
            {utils.getWeekArray(currentMonth).map((week) => (
              <div role="row" key={`week-${week[0]}`} className={classes.week}>
                {week.map((day) => {
                  const dayProps: PickersDayProps<TDate> = {
                    key: (day as any)?.toString(),
                    day,
                    isAnimating: isMonthSwitchingAnimating,
                    disabled: isDateDisabled(day),
                    allowKeyboardControl,
                    allowSameDateSelection,
                    autoFocus:
                      allowKeyboardControl &&
                      focusedDay !== null &&
                      utils.isSameDay(day, focusedDay),
                    today: utils.isSameDay(day, now),
                    outsideCurrentMonth: utils.getMonth(day) !== currentMonthNumber,
                    selected: selectedDates.some(
                      (selectedDate) => selectedDate && utils.isSameDay(selectedDate, day),
                    ),
                    disableHighlightToday,
                    showDaysOutsideCurrentMonth,
                    onDayFocus: changeFocusedDay,
                    onDaySelect: handleDaySelect,
                  };

                  return renderDay ? (
                    renderDay(day, selectedDates, dayProps)
                  ) : (
                    <div role="cell" key={dayProps.key}>
                      <PickersDay {...dayProps} />
                    </div>
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

export default withStyles(styles, { name: 'MuiPickersCalendar' })(PickersCalendar) as <TDate>(
  props: PickersCalendarProps<TDate>,
) => JSX.Element;
