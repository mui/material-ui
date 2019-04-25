import * as React from 'react';
import * as PropTypes from 'prop-types';
import clsx from 'clsx';
import ToolbarButton from '../_shared/ToolbarButton';
import PickerToolbar from '../_shared/PickerToolbar';
import YearSelection from './components/YearSelection';
import MonthSelection from './components/MonthSelection';
import Calendar, { OutterCalendarProps } from './components/Calendar';
import { useUtils } from '../_shared/hooks/useUtils';
import { makeStyles } from '@material-ui/core/styles';
import { MaterialUiPickersDate } from '../typings/date';
import { DatePickerViewType } from '../constants/DatePickerView';
import { isYearAndMonthViews, isYearOnlyView } from '../_helpers/date-utils';
import { ParsableDate, DomainPropTypes, datePickerDefaultProps } from '../constants/prop-types';

export interface BaseDatePickerProps extends OutterCalendarProps {
  /**
   * Show only calendar, without toolbar
   * @default false
   */
  onlyCalendar?: boolean;
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
  /**
   * Disable past dates
   * @default false
   */
  disablePast?: boolean;
  /**
   * Disable future dates
   * @default false
   */
  disableFuture?: boolean;
  /**
   * To animate scrolling to current year (with scrollIntoView)
   * @default false
   */
  animateYearScrolling?: boolean;
  /**
   * Array of views to show. Order year -> month -> day
   * @default ["day", "year"]
   */
  views?: ('year' | 'month' | 'day')[];
  /**
   * Initial view to show when date picker is open
   * @default props.views[0]
   */
  openTo?: 'year' | 'month' | 'day';
  /** Callback firing on year change */
  onYearChange?: (date: MaterialUiPickersDate) => void;
}

export interface DatePickerRootProps extends BaseDatePickerProps {
  date: MaterialUiPickersDate;
  onChange: (date: MaterialUiPickersDate, isFinished?: boolean) => void;
}

export const useStyles = makeStyles(
  {
    toolbarCenter: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  { name: 'MuiPickersDatePickerRoot' }
);

export const DatePickerRoot: React.FC<DatePickerRootProps> = ({
  date,
  views = ['year', 'day'],
  disablePast,
  disableFuture,
  onChange,
  openTo,
  minDate: unparsedMinDate,
  maxDate: unparsedMaxDate,
  animateYearScrolling,
  leftArrowIcon,
  rightArrowIcon,
  renderDay,
  shouldDisableDate,
  allowKeyboardControl,
  onMonthChange,
  onYearChange,
  onlyCalendar,
  leftArrowButtonProps,
  rightArrowButtonProps,
}) => {
  const utils = useUtils();
  const classes = useStyles();
  const [openView, setOpenView] = React.useState(
    openTo && views.includes(openTo) ? openTo : views[0]
  );

  const isYearOnly = React.useMemo(() => isYearOnlyView(views), [views]);
  const isYearAndMonth = React.useMemo(() => isYearAndMonthViews(views), [views]);
  const minDate = React.useMemo(() => utils.date(unparsedMinDate)!, [unparsedMinDate, utils]);
  const maxDate = React.useMemo(() => utils.date(unparsedMaxDate)!, [unparsedMaxDate, utils]);

  const getNextAvailableView = React.useCallback(
    (nextView: DatePickerViewType) => {
      if (views.includes(nextView)) {
        return nextView;
      }

      return views[views.indexOf(openView!) + 1];
    },
    [openView, views]
  );

  const handleChangeAndOpenNext = React.useCallback(
    (nextView: DatePickerViewType) => {
      return (date: MaterialUiPickersDate, isFinish?: boolean) => {
        const nextViewToOpen = getNextAvailableView(nextView);
        if (isFinish && nextViewToOpen) {
          // do not close picker if needs to show next view
          onChange(date, false);
          setOpenView(nextViewToOpen);

          return;
        }

        onChange(date, isFinish);
      };
    },
    [getNextAvailableView, onChange]
  );

  return (
    <>
      {!onlyCalendar && (
        <PickerToolbar className={clsx({ [classes.toolbarCenter]: isYearOnly })}>
          <ToolbarButton
            variant={isYearOnly ? 'h3' : 'subtitle1'}
            onClick={() => setOpenView('year')}
            selected={openView === 'year'}
            label={utils.getYearText(date)}
          />

          {!isYearOnly && !isYearAndMonth && (
            <ToolbarButton
              variant="h4"
              onClick={() => setOpenView('day')}
              selected={openView === 'day'}
              label={utils.getDatePickerHeaderText(date)}
            />
          )}

          {isYearAndMonth && (
            <ToolbarButton
              variant="h4"
              onClick={() => setOpenView('month')}
              selected={openView === 'month'}
              label={utils.getMonthText(date)}
            />
          )}
        </PickerToolbar>
      )}

      {openView === 'year' && (
        <YearSelection
          date={date}
          onChange={handleChangeAndOpenNext('month')}
          minDate={minDate}
          maxDate={maxDate}
          disablePast={disablePast}
          disableFuture={disableFuture}
          onYearChange={onYearChange}
          animateYearScrolling={animateYearScrolling}
        />
      )}
      {openView === 'month' && (
        <MonthSelection
          date={date}
          onChange={handleChangeAndOpenNext('day')}
          minDate={minDate}
          maxDate={maxDate}
          disablePast={disablePast}
          disableFuture={disableFuture}
          onMonthChange={onMonthChange}
        />
      )}
      {openView === 'day' && (
        <Calendar
          date={date}
          onChange={onChange}
          onMonthChange={onMonthChange}
          disablePast={disablePast}
          disableFuture={disableFuture}
          minDate={minDate}
          maxDate={maxDate}
          leftArrowIcon={leftArrowIcon}
          leftArrowButtonProps={leftArrowButtonProps}
          rightArrowIcon={rightArrowIcon}
          rightArrowButtonProps={rightArrowButtonProps}
          renderDay={renderDay}
          shouldDisableDate={shouldDisableDate}
          allowKeyboardControl={allowKeyboardControl}
        />
      )}
    </>
  );
};

DatePickerRoot.propTypes = {
  onlyCalendar: PropTypes.bool,
  views: PropTypes.arrayOf(DomainPropTypes.datePickerView),
  openTo: DomainPropTypes.datePickerView,
} as any;

DatePickerRoot.defaultProps = {
  onlyCalendar: false,
  ...datePickerDefaultProps,
};

export default DatePickerRoot;
