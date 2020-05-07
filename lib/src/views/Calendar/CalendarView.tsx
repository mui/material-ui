import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MonthSelection } from './MonthSelection';
import { DatePickerView } from '../../DatePicker';
import { useCalendarState } from './useCalendarState';
import { makeStyles } from '@material-ui/core/styles';
import { useUtils } from '../../_shared/hooks/useUtils';
import { VIEW_HEIGHT } from '../../constants/dimensions';
import { MaterialUiPickersDate } from '../../typings/date';
import { FadeTransitionGroup } from './FadeTransitionGroup';
import { Calendar, ExportedCalendarProps } from './Calendar';
import { PickerOnChangeFn } from '../../_shared/hooks/useViews';
import { CalendarHeader, CalendarHeaderProps } from './CalendarHeader';
import { YearSelection, ExportedYearSelectionProps } from './YearSelection';
import { defaultMinDate, defaultMaxDate } from '../../constants/prop-types';
import { IsStaticVariantContext } from '../../wrappers/WrapperVariantContext';
import { DateValidationProps, findClosestEnabledDate } from '../../_helpers/date-utils';

type PublicCalendarHeaderProps = Pick<
  CalendarHeaderProps,
  | 'leftArrowIcon'
  | 'rightArrowIcon'
  | 'leftArrowButtonProps'
  | 'rightArrowButtonProps'
  | 'leftArrowButtonText'
  | 'rightArrowButtonText'
  | 'getViewSwitchingButtonText'
>;

export interface CalendarViewProps
  extends DateValidationProps,
    ExportedCalendarProps,
    ExportedYearSelectionProps,
    PublicCalendarHeaderProps {
  date: MaterialUiPickersDate;
  view: DatePickerView;
  views: DatePickerView[];
  changeView: (view: DatePickerView) => void;
  onChange: PickerOnChangeFn;
  /** Disable heavy animations @default /(android)/i.test(window.navigator.userAgent) */
  reduceAnimations?: boolean;
  /** Callback firing on month change. Return promise to render spinner till it will not be resolved @DateIOType */
  onMonthChange?: (date: MaterialUiPickersDate) => void | Promise<void>;
}

export type ExportedCalendarViewProps = Omit<
  CalendarViewProps,
  'date' | 'view' | 'views' | 'onChange' | 'changeView' | 'slideDirection' | 'currentMonth'
>;

export const useStyles = makeStyles(
  {
    viewTransitionContainer: {
      overflowY: 'auto',
    },
    gridFullHeight: {
      flex: 1,
      minHeight: VIEW_HEIGHT - 60,
      height: '100%',
    },
  },
  { name: 'MuiPickersCalendarView' }
);

export const defaultReduceAnimations =
  typeof navigator !== 'undefined' && /(android)/i.test(navigator.userAgent);

export const CalendarView: React.FC<CalendarViewProps> = ({
  date,
  view,
  onChange,
  changeView,
  onMonthChange,
  minDate: __minDate,
  maxDate: __maxDate,
  reduceAnimations = defaultReduceAnimations,
  loadingIndicator = <CircularProgress data-mui-test="loading-progress" />,
  shouldDisableDate,
  allowKeyboardControl: __allowKeyboardControlProp,
  disablePast,
  disableFuture,
  shouldDisableYear,
  ...other
}) => {
  const utils = useUtils();
  const classes = useStyles();
  const isStatic = React.useContext(IsStaticVariantContext);
  const allowKeyboardControl = __allowKeyboardControlProp ?? !isStatic;

  const minDate = __minDate || utils.date(defaultMinDate);
  const maxDate = __maxDate || utils.date(defaultMaxDate);

  const {
    loadingQueue,
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
      const closestEnabledDate = findClosestEnabledDate({
        utils,
        date,
        minDate: utils.date(minDate),
        maxDate: utils.date(maxDate),
        disablePast: Boolean(disablePast),
        disableFuture: Boolean(disableFuture),
        shouldDisableDate: isDateDisabled,
      });

      onChange(closestEnabledDate, false);
    }
    // This call is too expensive to run it on each prop change.
    // So just ensure that we are not rendering disabled as selected on mount.
  }, []); // eslint-disable-line

  React.useEffect(() => {
    changeMonth(date);
  }, [date]); // eslint-disable-line

  React.useEffect(() => {
    if (view === 'date') {
      changeFocusedDay(date);
    }
  }, [view]); // eslint-disable-line

  return (
    <>
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

          {view === 'date' &&
            (loadingQueue > 0 ? (
              <Grid
                className={classes.gridFullHeight}
                container
                alignItems="center"
                justify="center"
              >
                {loadingIndicator}
              </Grid>
            ) : (
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
              />
            ))}
        </div>
      </FadeTransitionGroup>
    </>
  );
};
