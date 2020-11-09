import * as React from 'react';
import { CalendarViewProps } from './CalendarView';
import { SlideDirection } from './SlideTransition';
import { validateDate } from '../../_helpers/date-utils';
import { MuiPickersAdapter, useUtils, useNow } from '../../_shared/hooks/useUtils';

interface CalendarState<TDate> {
  isMonthSwitchingAnimating: boolean;
  currentMonth: TDate;
  focusedDay: TDate;
  slideDirection: SlideDirection;
}

type ReducerAction<TType, TAdditional = {}> = { type: TType } & TAdditional;

interface ChangeMonthPayload<TDate> {
  direction: SlideDirection;
  newMonth: TDate;
}

export const createCalendarStateReducer = <TDate extends unknown>(
  reduceAnimations: boolean,
  disableSwitchToMonthOnDayFocus: boolean,
  utils: MuiPickersAdapter<TDate>
) => (
  state: CalendarState<TDate>,
  action:
    | ReducerAction<'finishMonthSwitchingAnimation'>
    | ReducerAction<'changeMonth', ChangeMonthPayload<TDate>>
    | ReducerAction<'changeFocusedDay', { focusedDay: TDate }>
): CalendarState<TDate> => {
  switch (action.type) {
    case 'changeMonth':
      return {
        ...state,
        slideDirection: action.direction,
        currentMonth: action.newMonth,
        isMonthSwitchingAnimating: !reduceAnimations,
      };

    case 'finishMonthSwitchingAnimation':
      return {
        ...state,
        isMonthSwitchingAnimating: false,
      };

    case 'changeFocusedDay': {
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

    default:
      throw new Error('missing support');
  }
};

type CalendarStateInput<TDate> = Pick<
  CalendarViewProps<TDate>,
  | 'disableFuture'
  | 'disablePast'
  | 'shouldDisableDate'
  | 'date'
  | 'reduceAnimations'
  | 'onMonthChange'
> & {
  minDate: TDate;
  maxDate: TDate;
  disableSwitchToMonthOnDayFocus?: boolean;
};

export function useCalendarState<TDate>({
  date,
  disableFuture,
  disablePast,
  disableSwitchToMonthOnDayFocus = false,
  maxDate,
  minDate,
  onMonthChange,
  reduceAnimations,
  shouldDisableDate,
}: CalendarStateInput<TDate>) {
  const now = useNow<TDate>();
  const utils = useUtils<TDate>();
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
    (payload: ChangeMonthPayload<TDate>) => {
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
    (newDate: TDate) => {
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
    (day: TDate | null) =>
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
    (newFocusedDate: TDate) => {
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
