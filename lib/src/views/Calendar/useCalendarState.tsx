import * as React from 'react';
import { CalendarViewProps } from './CalendarView';
import { SlideDirection } from './SlideTransition';
import { MaterialUiPickersDate } from '../../typings/date';
import { MuiPickersAdapter, useUtils, useNow } from '../../_shared/hooks/useUtils';

interface State {
  isMonthSwitchingAnimating: boolean;
  loadingQueue: number;
  currentMonth: MaterialUiPickersDate;
  focusedDay: MaterialUiPickersDate | null;
  slideDirection: SlideDirection;
}

type ReducerAction<TType, TAdditional = {}> = { type: TType } & TAdditional;

interface ChangeMonthPayload {
  direction: SlideDirection;
  newMonth: MaterialUiPickersDate;
}

export const createCalendarStateReducer = (
  reduceAnimations: boolean,
  disableSwitchToMonthOnDayFocus: boolean,
  utils: MuiPickersAdapter
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
      const needMonthSwitch =
        !disableSwitchToMonthOnDayFocus &&
        !utils.isSameMonth(state.currentMonth, action.focusedDay);
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

type CalendarStateInput = Pick<
  CalendarViewProps,
  | 'disableFuture'
  | 'disablePast'
  | 'shouldDisableDate'
  | 'date'
  | 'reduceAnimations'
  | 'onMonthChange'
> & {
  minDate: MaterialUiPickersDate;
  maxDate: MaterialUiPickersDate;
  disableSwitchToMonthOnDayFocus?: boolean;
};

export function useCalendarState({
  date,
  reduceAnimations,
  onMonthChange,
  disablePast,
  disableFuture,
  minDate,
  maxDate,
  shouldDisableDate,
  disableSwitchToMonthOnDayFocus = false,
}: CalendarStateInput) {
  const now = useNow();
  const utils = useUtils();
  const reducerFn = React.useRef(
    createCalendarStateReducer(Boolean(reduceAnimations), disableSwitchToMonthOnDayFocus, utils)
  );
  const [{ loadingQueue, ...calendarState }, dispatch] = React.useReducer(reducerFn.current, {
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
      if (utils.isSameMonth(date, calendarState.currentMonth)) {
        return;
      }

      handleChangeMonth({
        newMonth: utils.startOfMonth(date),
        direction: utils.isAfterDay(date, calendarState.currentMonth) ? 'left' : 'right',
      });
    },
    [calendarState.currentMonth, handleChangeMonth, utils]
  );

  const validateMinMaxDate = React.useCallback(
    (day: MaterialUiPickersDate) => {
      return Boolean(
        (disableFuture && utils.isAfterDay(day, now)) ||
          (disablePast && utils.isBeforeDay(day, now)) ||
          (minDate && utils.isBeforeDay(day, minDate)) ||
          (maxDate && utils.isAfterDay(day, maxDate))
      );
    },
    [disableFuture, disablePast, maxDate, minDate, now, utils]
  );

  const isDateDisabled = React.useCallback(
    (day: MaterialUiPickersDate) => {
      return validateMinMaxDate(day) || Boolean(shouldDisableDate && shouldDisableDate(day));
    },
    [shouldDisableDate, validateMinMaxDate]
  );

  const onMonthSwitchingAnimationEnd = React.useCallback(() => {
    dispatch({ type: 'finishMonthSwitchingAnimation' });
  }, []);

  const changeFocusedDay = React.useCallback(
    (newFocusedDate: MaterialUiPickersDate) => {
      if (!isDateDisabled(newFocusedDate)) {
        dispatch({ type: 'changeFocusedDay', focusedDay: newFocusedDate });
      }
    },
    [isDateDisabled]
  );

  return {
    loadingQueue,
    calendarState,
    changeMonth,
    changeFocusedDay,
    isDateDisabled,
    onMonthSwitchingAnimationEnd,
    handleChangeMonth,
  };
}
