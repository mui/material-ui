import * as React from 'react';
import { CalendarViewProps } from './CalendarView';
import { SlideDirection } from './SlideTransition';
import { validateDate } from '../../_helpers/date-utils';
import { MaterialUiPickersDate } from '../../typings/date';
import { MuiPickersAdapter, useUtils, useNow } from '../../_shared/hooks/useUtils';

interface CalendarState {
  isMonthSwitchingAnimating: boolean;
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
    | ReducerAction<'finishMonthSwitchingAnimation'>
    | ReducerAction<'changeMonth', ChangeMonthPayload>
    | ReducerAction<'changeFocusedDay', { focusedDay: MaterialUiPickersDate }>
): CalendarState => {
  switch (action.type) {
    case 'changeMonth': {
      return {
        ...state,
        slideDirection: action.direction,
        currentMonth: action.newMonth,
        isMonthSwitchingAnimating: !reduceAnimations,
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

  const [calendarState, dispatch] = React.useReducer(reducerFn, {
    isMonthSwitchingAnimating: false,
    focusedDay: date,
    currentMonth: utils.startOfMonth(dateForMonth),
    slideDirection: 'left',
  });

  const handleChangeMonth = React.useCallback(
    (payload: ChangeMonthPayload) => {
      dispatch({
        type: 'changeMonth',
        ...payload,
      });

      if (onMonthChange) {
        onMonthChange(payload.newMonth);
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
    calendarState,
    changeMonth,
    changeFocusedDay,
    isDateDisabled,
    onMonthSwitchingAnimationEnd,
    handleChangeMonth,
  };
}
