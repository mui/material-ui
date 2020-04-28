import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { YearSelection } from './YearSelection';
import { MonthSelection } from './MonthSelection';
import { DatePickerView } from '../../DatePicker';
import { useCalendarState } from './useCalendarState';
import { makeStyles } from '@material-ui/core/styles';
import { VIEW_HEIGHT } from '../../constants/dimensions';
import { ParsableDate } from '../../constants/prop-types';
import { MaterialUiPickersDate } from '../../typings/date';
import { FadeTransitionGroup } from './FadeTransitionGroup';
import { Calendar, ExportedCalendarProps } from './Calendar';
import { PickerOnChangeFn } from '../../_shared/hooks/useViews';
import { useParsedDate } from '../../_shared/hooks/date-helpers-hooks';
import { CalendarHeader, CalendarHeaderProps } from './CalendarHeader';
import { IsStaticVariantContext } from '../../wrappers/WrapperVariantContext';

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

export interface CalendarViewProps extends ExportedCalendarProps, PublicCalendarHeaderProps {
  date: MaterialUiPickersDate;
  view: DatePickerView;
  views: DatePickerView[];
  changeView: (view: DatePickerView) => void;
  onChange: PickerOnChangeFn;
  /** Disable heavy animations @default /(android)/i.test(window.navigator.userAgent) */
  reduceAnimations?: boolean;
  /** Callback firing on month change. Return promise to render spinner till it will not be resolved @DateIOType */
  onMonthChange?: (date: MaterialUiPickersDate) => void | Promise<void>;
  /**
   * Min selectable date
   * @default Date(1900-01-01)
   */
  minDate?: ParsableDate;
  /**
   * Max selectable date
   * @default Date(2100-01-01)
   */
  maxDate?: ParsableDate;
  /** Disable specific date @DateIOType */
  shouldDisableDate?: (day: MaterialUiPickersDate) => boolean;
  /** Callback firing on year change @DateIOType */
  onYearChange?: (date: MaterialUiPickersDate) => void;
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
  minDate: unparsedMinDate = new Date('1900-01-01'),
  maxDate: unparsedMaxDate = new Date('2100-01-01'),
  reduceAnimations = defaultReduceAnimations,
  loadingIndicator = <CircularProgress data-mui-test="loading-progress" />,
  shouldDisableDate,
  allowKeyboardControl: __allowKeyboardControlProp,
  disablePast,
  disableFuture,
  ...other
}) => {
  const classes = useStyles();
  const minDate = useParsedDate(unparsedMinDate)!;
  const maxDate = useParsedDate(unparsedMaxDate)!;

  const isStatic = React.useContext(IsStaticVariantContext);
  console.log(isStatic);
  const allowKeyboardControl = __allowKeyboardControlProp ?? !isStatic;

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
              isDateDisabled={isDateDisabled}
              allowKeyboardControl={allowKeyboardControl}
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
                minDate={minDate}
                maxDate={maxDate}
                isDateDisabled={isDateDisabled}
                allowKeyboardControl={allowKeyboardControl}
              />
            ))}
        </div>
      </FadeTransitionGroup>
    </>
  );
};
