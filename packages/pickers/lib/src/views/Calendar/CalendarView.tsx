import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MonthSelection } from './MonthSelection';
import { DatePickerView } from '../../DatePicker';
import { useCalendarState } from './useCalendarState';
import { useUtils } from '../../_shared/hooks/useUtils';
import { FadeTransitionGroup } from './FadeTransitionGroup';
import { Calendar, ExportedCalendarProps } from './Calendar';
import { PickerOnChangeFn } from '../../_shared/hooks/useViews';
import { useDefaultProps } from '../../_shared/withDefaultProps';
import { DAY_SIZE, DAY_MARGIN } from '../../constants/dimensions';
import { CalendarHeader, ExportedCalendarHeaderProps } from './CalendarHeader';
import { YearSelection, ExportedYearSelectionProps } from './YearSelection';
import { defaultMinDate, defaultMaxDate } from '../../constants/prop-types';
import { IsStaticVariantContext } from '../../wrappers/WrapperVariantContext';
import { DateValidationProps, findClosestEnabledDate } from '../../_helpers/date-utils';

export interface CalendarViewProps<TDate>
  extends DateValidationProps<TDate>,
    ExportedCalendarProps<TDate>,
    ExportedYearSelectionProps<TDate>,
    ExportedCalendarHeaderProps<TDate> {
  date: TDate;
  view: DatePickerView;
  views: DatePickerView[];
  changeView: (view: DatePickerView) => void;
  onChange: PickerOnChangeFn<TDate>;
  /**
   * Disable heavy animations.
   *
   * @default /(android)/i.test(window.navigator.userAgent).
   */
  reduceAnimations?: boolean;
  /**
   * Callback firing on month change. @DateIOType
   */
  onMonthChange?: (date: TDate) => void;
}

export type ExportedCalendarViewProps<TDate> = Omit<
  CalendarViewProps<TDate>,
  'date' | 'view' | 'views' | 'onChange' | 'changeView' | 'slideDirection' | 'currentMonth'
>;

const muiComponentConfig = { name: 'MuiPickersCalendarView' };

export const useStyles = makeStyles(
  {
    viewTransitionContainer: {
      overflowY: 'auto',
    },
    fullHeightContainer: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: (DAY_SIZE + DAY_MARGIN * 4) * 7,
      height: '100%',
    },
  },
  muiComponentConfig
);

export const defaultReduceAnimations =
  typeof navigator !== 'undefined' && /(android)/i.test(navigator.userAgent);

export function CalendarView<TDate>(props: CalendarViewProps<TDate>) {
  const {
    allowKeyboardControl: allowKeyboardControlProp,
    changeView,
    date,
    disableFuture,
    disablePast,
    loading,
    maxDate: maxDateProp,
    minDate: minDateProp,
    onChange,
    onMonthChange,
    reduceAnimations = defaultReduceAnimations,
    renderLoading,
    shouldDisableDate,
    shouldDisableYear,
    view,
    ...other
  } = useDefaultProps(props, muiComponentConfig);

  const utils = useUtils<TDate>();
  const classes = useStyles();
  const isStatic = React.useContext(IsStaticVariantContext);
  const allowKeyboardControl = allowKeyboardControlProp ?? !isStatic;

  const minDate = minDateProp || utils.date(defaultMinDate)!;
  const maxDate = maxDateProp || utils.date(defaultMaxDate)!;

  const {
    calendarState,
    changeFocusedDay,
    changeMonth,
    isDateDisabled,
    handleChangeMonth,
    onMonthSwitchingAnimationEnd,
  } = useCalendarState({
    date,
    reduceAnimations,
    onMonthChange,
    minDate,
    maxDate,
    shouldDisableDate,
    disablePast,
    disableFuture,
  });

  React.useEffect(() => {
    if (date && isDateDisabled(date)) {
      const closestEnabledDate = findClosestEnabledDate<TDate>({
        utils,
        date,
        minDate,
        maxDate,
        disablePast: Boolean(disablePast),
        disableFuture: Boolean(disableFuture),
        shouldDisableDate: isDateDisabled,
      });

      onChange(closestEnabledDate, 'partial');
    }
    // This call is too expensive to run it on each prop change.
    // So just ensure that we are not rendering disabled as selected on mount.
  }, []); // eslint-disable-line

  React.useEffect(() => {
    changeMonth(date);
  }, [date]); // eslint-disable-line

  return (
    <React.Fragment>
      <CalendarHeader
        {...other}
        view={view}
        currentMonth={calendarState.currentMonth}
        changeView={changeView}
        onMonthChange={(newMonth, direction) => handleChangeMonth({ newMonth, direction })}
        minDate={minDate}
        maxDate={maxDate}
        disablePast={disablePast}
        disableFuture={disableFuture}
        reduceAnimations={reduceAnimations}
      />
      <FadeTransitionGroup
        reduceAnimations={reduceAnimations}
        className={classes.viewTransitionContainer}
        transKey={view}
      >
        <div>
          {view === 'year' && (
            <YearSelection
              {...other}
              date={date}
              onChange={onChange}
              minDate={minDate}
              maxDate={maxDate}
              disableFuture={disableFuture}
              disablePast={disablePast}
              isDateDisabled={isDateDisabled}
              allowKeyboardControl={allowKeyboardControl}
              shouldDisableYear={shouldDisableYear}
              changeFocusedDay={changeFocusedDay}
            />
          )}
          {view === 'month' && (
            <MonthSelection
              {...other}
              date={date}
              onChange={onChange}
              minDate={minDate}
              maxDate={maxDate}
              onMonthChange={onMonthChange}
            />
          )}
          {view === 'date' && (
            <Calendar
              {...other}
              {...calendarState}
              onMonthSwitchingAnimationEnd={onMonthSwitchingAnimationEnd}
              changeFocusedDay={changeFocusedDay}
              reduceAnimations={reduceAnimations}
              date={date}
              onChange={onChange}
              isDateDisabled={isDateDisabled}
              allowKeyboardControl={allowKeyboardControl}
              loading={loading}
              renderLoading={renderLoading}
            />
          )}
        </div>
      </FadeTransitionGroup>
    </React.Fragment>
  );
}
