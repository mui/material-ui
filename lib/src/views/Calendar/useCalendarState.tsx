import * as React from 'react';
import { CalendarViewProps } from './CalendarView';
import { SlideDirection } from './SlideTransition';
import { validateDate } from '../../_helpers/date-utils';
import { MaterialUiPickersDate } from '../../typings/date';
import { MuiPickersAdapter, useUtils, useNow } from '../../_shared/hooks/useUtils';

interface CalendarState {
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
  state: CalendarState,
  action:
    | ReducerAction<'popLoadingQueue'>
    | ReducerAction<'finishMonthSwitchingAnimation'>
    | ReducerAction<'changeMonth', ChangeMonthPayload>
    | ReducerAction<'changeMonthLoading', ChangeMonthPayload>
    | ReducerAction<'changeFocusedDay', { focusedDay: MaterialUiPickersDate }>
): CalendarState => {
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
      // action.focusedDay = action.focusedDay || utils.date()
      const needMonthSwitch =
        Boolean(action.focusedDay) &&
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
  const dateForMonth = date || now;
  const reducerFn = React.useRef(
    createCalendarStateReducer(Boolean(reduceAnimations), disableSwitchToMonthOnDayFocus, utils)
  ).current;

  const [{ loadingQueue, ...calendarState }, dispatch] = React.useReducer(reducerFn, {
    isMonthSwitchingAnimating: false,
    loadingQueue: 0,
    focusedDay: date,
    currentMonth: utils.startOfMonth(dateForMonth),
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
    (newDate: MaterialUiPickersDate) => {
      const newDateRequested = newDate ?? now;
      if (utils.isSameMonth(newDateRequested, calendarState.currentMonth)) {
        return;
      }

      handleChangeMonth({
        newMonth: utils.startOfMonth(newDateRequested),
        direction: utils.isAfterDay(newDateRequested, calendarState.currentMonth)
          ? 'left'
          : 'right',
      });
    },
    [calendarState.currentMonth, handleChangeMonth, now, utils]
  );

  const isDateDisabled = React.useCallback(
    (day: MaterialUiPickersDate) =>
      validateDate(utils, day, {
        disablePast,
        disableFuture,
        minDate,
        maxDate,
        shouldDisableDate,
      }) !== null,
    [disableFuture, disablePast, maxDate, minDate, shouldDisableDate, utils]
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
