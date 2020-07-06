import * as React from 'react';
import { MonthSelection } from './MonthSelection';
import { DatePickerView } from '../../DatePicker';
import { useCalendarState } from './useCalendarState';
import { makeStyles } from '@material-ui/core/styles';
import { useUtils } from '../../_shared/hooks/useUtils';
import { MaterialUiPickersDate } from '../../typings/date';
import { FadeTransitionGroup } from './FadeTransitionGroup';
import { Calendar, ExportedCalendarProps } from './Calendar';
import { PickerOnChangeFn } from '../../_shared/hooks/useViews';
import { withDefaultProps } from '../../_shared/withDefaultProps';
import { DAY_SIZE, DAY_MARGIN } from '../../constants/dimensions';
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
  /**
   * Disable heavy animations.
   * @default /(android)/i.test(window.navigator.userAgent).
   */
  reduceAnimations?: boolean;
  /**
   * Callback firing on month change.
   */
  onMonthChange?: (date: MaterialUiPickersDate) => void;
}

export type ExportedCalendarViewProps = Omit<
  CalendarViewProps,
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

export const CalendarView: React.FC<CalendarViewProps> = withDefaultProps(
  muiComponentConfig,
  ({
    allowKeyboardControl: __allowKeyboardControlProp,
    changeView,
    date,
    disableFuture,
    disablePast,
    loading,
    maxDate: __maxDate,
    minDate: __minDate,
    onChange,
    onMonthChange,
    reduceAnimations = defaultReduceAnimations,
    renderLoading,
    shouldDisableDate,
    shouldDisableYear,
    view,
    ...other
  }) => {
    const utils = useUtils();
    const classes = useStyles();
    const isStatic = React.useContext(IsStaticVariantContext);
    const allowKeyboardControl = __allowKeyboardControlProp ?? !isStatic;

    const minDate = __minDate || utils.date(defaultMinDate);
    const maxDate = __maxDate || utils.date(defaultMaxDate);

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
        const closestEnabledDate = findClosestEnabledDate({
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
);
