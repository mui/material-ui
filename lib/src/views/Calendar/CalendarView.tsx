import * as React from 'react';
import { IUtils } from '@date-io/core/IUtils';
import { YearSelection } from './YearSelection';
import { MonthSelection } from './MonthSelection';
import { DatePickerView } from '../../DatePicker';
import { SlideDirection } from './SlideTransition';
import { VIEW_HEIGHT } from '../../constants/dimensions';
import { ParsableDate } from '../../constants/prop-types';
import { MaterialUiPickersDate } from '../../typings/date';
import { FadeTransitionGroup } from './FadeTransitionGroup';
import { Calendar, ExportedCalendarProps } from './Calendar';
import { useUtils, useNow } from '../../_shared/hooks/useUtils';
import { PickerOnChangeFn } from '../../_shared/hooks/useViews';
import { useParsedDate } from '../../_shared/hooks/useParsedDate';
import { CalendarHeader, CalendarHeaderProps } from './CalendarHeader';
import { CircularProgress, Grid, makeStyles } from '@material-ui/core';
import { WrapperVariantContext } from '../../wrappers/WrapperVariantContext';

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
  /** Do not show heavy animations, significantly improves performance on slow devices
   * @default /(android)/i.test(navigator.userAgent)
   */
  reduceAnimations?: boolean;
  /** Disable specific date @DateIOType */
  shouldDisableDate?: (day: MaterialUiPickersDate) => boolean;
}

export type ExportedCalendarViewProps = Omit<
  CalendarViewProps,
  'date' | 'view' | 'views' | 'onChange' | 'changeView' | 'slideDirection' | 'currentMonth'
>;

type ReducerAction<TType, TAdditional = {}> = { type: TType } & TAdditional;

interface ChangeMonthPayload {
  direction: SlideDirection;
  newMonth: MaterialUiPickersDate;
}

interface State {
  isMonthSwitchingAnimating: boolean;
  loadingQueue: number;
  currentMonth: MaterialUiPickersDate;
  focusedDay: MaterialUiPickersDate | null;
  slideDirection: SlideDirection;
}

const createCalendarStateReducer = (
  reduceAnimations: boolean,
  utils: IUtils<MaterialUiPickersDate>
) => (
  state: State,
  action:
    | ReducerAction<'popLoadingQueue'>
    | ReducerAction<'finishMonthSwitchingAnimation'>
    | ReducerAction<'changeMonth', ChangeMonthPayload>
    | ReducerAction<'changeMonthLoading', ChangeMonthPayload>
    | ReducerAction<'changeFocusedDay', { focusedDay: MaterialUiPickersDate }>
): State => {
  switch (action.type) {
    case 'changeMonthLoading': {
      return {
        ...state,
        loadingQueue: state.loadingQueue + 1,
        slideDirection: action.direction,
        currentMonth: action.newMonth,
        isMonthSwitchingAnimating: !reduceAnimations,
      };
    }
    case 'changeMonth': {
      return {
        ...state,
        slideDirection: action.direction,
        currentMonth: action.newMonth,
        isMonthSwitchingAnimating: !reduceAnimations,
      };
    }
    case 'popLoadingQueue': {
      return {
        ...state,
        loadingQueue: state.loadingQueue <= 0 ? 0 : state.loadingQueue - 1,
      };
    }
    case 'finishMonthSwitchingAnimation': {
      return {
        ...state,
        isMonthSwitchingAnimating: false,
      };
    }
    case 'changeFocusedDay': {
      const needMonthSwitch = !utils.isSameMonth(state.currentMonth, action.focusedDay);
      return {
        ...state,
        focusedDay: action.focusedDay,
        isMonthSwitchingAnimating: needMonthSwitch && !reduceAnimations,
        currentMonth: needMonthSwitch ? utils.startOfMonth(action.focusedDay) : state.currentMonth,
        slideDirection: utils.isAfterDay(action.focusedDay, state.currentMonth) ? 'left' : 'right',
      };
    }
  }
};

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

export const CalendarView: React.FC<CalendarViewProps> = ({
  date,
  view,
  onChange,
  changeView,
  onMonthChange,
  minDate: unparsedMinDate,
  maxDate: unparsedMaxDate,
  reduceAnimations = typeof window !== 'undefined' && /(android)/i.test(window.navigator.userAgent),
  loadingIndicator = <CircularProgress data-mui-test="loading-progress" />,
  shouldDisableDate,
  allowKeyboardControl: allowKeyboardControlProp,
  ...other
}) => {
  const now = useNow();
  const utils = useUtils();
  const classes = useStyles();
  const minDate = useParsedDate(unparsedMinDate)!;
  const maxDate = useParsedDate(unparsedMaxDate)!;
  const wrapperVariant = React.useContext(WrapperVariantContext);
  const allowKeyboardControl = allowKeyboardControlProp ?? wrapperVariant !== 'static';

  const [
    { currentMonth, isMonthSwitchingAnimating, focusedDay, loadingQueue, slideDirection },
    dispatch,
  ] = React.useReducer(createCalendarStateReducer(reduceAnimations, utils), {
    isMonthSwitchingAnimating: false,
    loadingQueue: 0,
    focusedDay: date,
    currentMonth: utils.startOfMonth(date),
    slideDirection: 'left',
  });

  const handleChangeMonth = React.useCallback(
    (payload: ChangeMonthPayload) => {
      const returnedPromise = onMonthChange && onMonthChange(payload.newMonth);

      if (returnedPromise) {
        dispatch({
          type: 'changeMonthLoading',
          ...payload,
        });

        returnedPromise.then(() => dispatch({ type: 'popLoadingQueue' }));
      } else {
        dispatch({
          type: 'changeMonth',
          ...payload,
        });
      }
    },
    [onMonthChange]
  );

  const changeMonth = React.useCallback(
    (date: MaterialUiPickersDate) => {
      if (utils.isSameMonth(date, currentMonth)) {
        return;
      }

      handleChangeMonth({
        newMonth: utils.startOfMonth(date),
        direction: utils.isAfterDay(date, currentMonth) ? 'left' : 'right',
      });
    },
    [currentMonth, handleChangeMonth, utils]
  );

  React.useEffect(() => {
    changeMonth(date);
  }, [date]); // eslint-disable-line

  React.useEffect(() => {
    if (view === 'date') {
      dispatch({ type: 'changeFocusedDay', focusedDay: date });
    }
  }, [view]); // eslint-disable-line

  const validateMinMaxDate = React.useCallback(
    (day: MaterialUiPickersDate) => {
      return Boolean(
        (other.disableFuture && utils.isAfterDay(day, now)) ||
          (other.disablePast && utils.isBeforeDay(day, now)) ||
          (minDate && utils.isBeforeDay(day, utils.date(minDate))) ||
          (maxDate && utils.isAfterDay(day, utils.date(maxDate)))
      );
    },
    [maxDate, minDate, now, other.disableFuture, other.disablePast, utils]
  );

  const isDateDisabled = React.useCallback(
    (day: MaterialUiPickersDate) => {
      return validateMinMaxDate(day) || Boolean(shouldDisableDate && shouldDisableDate(day));
    },
    [shouldDisableDate, validateMinMaxDate]
  );

  return (
    <>
      <CalendarHeader
        {...other}
        view={view}
        month={currentMonth}
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
                isMonthSwitchingAnimating={isMonthSwitchingAnimating}
                onMonthSwitchingAnimationEnd={() =>
                  dispatch({ type: 'finishMonthSwitchingAnimation' })
                }
                focusedDay={focusedDay}
                changeFocusedDay={focusedDay => dispatch({ type: 'changeFocusedDay', focusedDay })}
                reduceAnimations={reduceAnimations}
                currentMonth={currentMonth}
                slideDirection={slideDirection}
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
