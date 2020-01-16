import * as React from 'react';
import { YearSelection } from './YearSelection';
import { CalendarHeader } from './CalendarHeader';
import { MonthSelection } from './MonthSelection';
import { DatePickerView } from '../../DatePicker';
import { SlideDirection } from './SlideTransition';
import { Calendar, CalendarProps } from './Calendar';
import { useUtils } from '../../_shared/hooks/useUtils';
import { VIEW_HEIGHT } from '../../constants/dimensions';
import { ParsableDate } from '../../constants/prop-types';
import { MaterialUiPickersDate } from '../../typings/date';
import { FadeTransitionGroup } from './FadeTransitionGroup';
import { useParsedDate } from '../../_shared/hooks/useParsedDate';
import { CircularProgress, Grid, makeStyles } from '@material-ui/core';
import { WrapperVariantContext } from '../../wrappers/WrapperVariantContext';

export interface CalendarViewProps
  extends Omit<
    CalendarProps,
    | 'reduceAnimations'
    | 'slideDirection'
    | 'currentMonth'
    | 'minDate'
    | 'maxDate'
    | 'wrapperVariant'
  > {
  date: MaterialUiPickersDate;
  view: DatePickerView;
  views: DatePickerView[];
  changeView: (view: DatePickerView) => void;
  onChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
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
}

export type ExportedCalendarProps = Omit<
  CalendarViewProps,
  'date' | 'view' | 'views' | 'onChange' | 'changeView' | 'slideDirection' | 'currentMonth'
>;

type ReducerAction<TType, TAdditional = {}> = { type: TType } & TAdditional;

interface ChangeMonthPayload {
  direction: SlideDirection;
  newMonth: MaterialUiPickersDate;
}

function calendarStateReducer(
  state: {
    loadingQueue: number;
    currentMonth: MaterialUiPickersDate;
    slideDirection: SlideDirection;
  },
  action:
    | ReducerAction<'popLoadingQueue'>
    | ReducerAction<'changeMonth', ChangeMonthPayload>
    | ReducerAction<'changeMonthLoading', ChangeMonthPayload>
) {
  switch (action.type) {
    case 'changeMonthLoading': {
      return {
        ...state,
        loadingQueue: state.loadingQueue + 1,
        slideDirection: action.direction,
        currentMonth: action.newMonth,
      };
    }
    case 'changeMonth': {
      return {
        ...state,
        slideDirection: action.direction,
        currentMonth: action.newMonth,
      };
    }
    case 'popLoadingQueue': {
      return {
        ...state,
        loadingQueue: state.loadingQueue <= 0 ? 0 : state.loadingQueue - 1,
      };
    }
  }
}

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
  ...other
}) => {
  const utils = useUtils();
  const classes = useStyles();
  const minDate = useParsedDate(unparsedMinDate);
  const maxDate = useParsedDate(unparsedMaxDate);
  const wrapperVariant = React.useContext(WrapperVariantContext);

  const [{ currentMonth, loadingQueue, slideDirection }, dispatch] = React.useReducer(
    calendarStateReducer,
    {
      loadingQueue: 0,
      currentMonth: utils.startOfMonth(date),
      slideDirection: 'left',
    }
  );

  const handleChangeMonth = (payload: ChangeMonthPayload) => {
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
  };

  React.useEffect(() => {
    if (utils.isSameMonth(date, currentMonth)) {
      return;
    }

    handleChangeMonth({
      newMonth: utils.startOfMonth(date),
      direction: utils.isAfterDay(date, currentMonth) ? 'left' : 'right',
    });
  }, [date]); // eslint-disable-line

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
                reduceAnimations={reduceAnimations}
                currentMonth={currentMonth}
                slideDirection={slideDirection}
                date={date}
                onChange={onChange}
                minDate={minDate}
                maxDate={maxDate}
                wrapperVariant={wrapperVariant}
              />
            ))}
        </div>
      </FadeTransitionGroup>
    </>
  );
};
