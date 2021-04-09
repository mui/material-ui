import * as React from 'react';
import PropTypes from 'prop-types';
import { MuiStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import MonthPicker from '../MonthPicker/MonthPicker';
import { useCalendarState } from './useCalendarState';
import { useUtils } from '../internal/pickers/hooks/useUtils';
import FadeTransitionGroup from './PickersFadeTransitionGroup';
import PickersCalendar, { ExportedCalendarProps } from './PickersCalendar';
import { PickerOnChangeFn, useViews } from '../internal/pickers/hooks/useViews';
import { DAY_SIZE, DAY_MARGIN } from '../internal/pickers/constants/dimensions';
import PickersCalendarHeader, { ExportedCalendarHeaderProps } from './PickersCalendarHeader';
import YearPicker, { ExportedYearPickerProps } from '../YearPicker/YearPicker';
import { defaultMinDate, defaultMaxDate } from '../internal/pickers/constants/prop-types';
import { IsStaticVariantContext } from '../internal/pickers/wrappers/WrapperVariantContext';
import { findClosestEnabledDate } from '../internal/pickers/date-utils';
import { DayPickerView } from './shared';
import PickerView from '../internal/pickers/Picker/PickerView';

export interface DayPickerProps<TDate, TView extends DayPickerView = DayPickerView>
  extends ExportedCalendarProps<TDate>,
    ExportedYearPickerProps<TDate>,
    ExportedCalendarHeaderProps<TDate> {
  className?: string;
  date: TDate | null;
  /**
   * Default calendar month displayed when `value={null}`.
   */
  defaultCalendarMonth?: TDate;
  /**
   * @default false
   */
  disableFuture?: boolean;
  /**
   * @default false
   */
  disablePast?: boolean;
  /**
   * Max selectable date. @DateIOType
   */
  maxDate?: TDate;
  /**
   * Min selectable date. @DateIOType
   */
  minDate?: TDate;
  /**
   * Callback fired on view change.
   */
  onViewChange?: (view: TView) => void;
  /**
   * Callback fired on date change
   */
  onChange: PickerOnChangeFn<TDate>;
  /**
   * Callback firing on month change. @DateIOType
   */
  onMonthChange?: (date: TDate) => void;
  /**
   * Initially open view.
   * @default 'day'
   */
  openTo?: TView;
  /**
   * Disable heavy animations.
   * @default typeof navigator !== 'undefined' && /(android)/i.test(navigator.userAgent)
   */
  reduceAnimations?: boolean;
  /**
   * Component displaying when passed `loading` true.
   * @default () => <span data-mui-test="loading-progress">...</span>
   */
  renderLoading?: () => React.ReactNode;
  /**
   * Disable specific date. @DateIOType
   */
  shouldDisableDate?: (day: TDate) => boolean;
  /**
   * Controlled open view.
   */
  view?: TView;
  /**
   * Views for day picker.
   * @default ['year', 'day']
   */
  views?: TView[];
}

export type ExportedDayPickerProps<TDate> = Omit<
  DayPickerProps<TDate>,
  | 'date'
  | 'view'
  | 'views'
  | 'openTo'
  | 'onChange'
  | 'changeView'
  | 'slideDirection'
  | 'currentMonth'
  | 'className'
>;

export type DayPickerClassKey = 'root' | 'viewTransitionContainer' | 'fullHeightContainer';

export const styles: MuiStyles<DayPickerClassKey> = {
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
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
};

export const defaultReduceAnimations =
  typeof navigator !== 'undefined' && /(android)/i.test(navigator.userAgent);

const DayPicker = React.forwardRef(function DayPicker<
  TDate extends any,
  TView extends DayPickerView = DayPickerView
>(props: DayPickerProps<TDate, TView> & WithStyles<typeof styles>, ref: React.Ref<HTMLDivElement>) {
  const {
    allowKeyboardControl: allowKeyboardControlProp,
    onViewChange,
    date,
    disableFuture = false,
    disablePast = false,
    defaultCalendarMonth,
    classes,
    loading = false,
    maxDate: maxDateProp,
    minDate: minDateProp,
    onChange,
    onMonthChange,
    reduceAnimations = defaultReduceAnimations,
    renderLoading = () => <span data-mui-test="loading-progress">...</span>,
    shouldDisableDate,
    shouldDisableYear,
    view,
    // TODO: unsound. `TView` could be `'day'`. `T extends Literal` does not mean there are more constituents but less.
    // Probably easiest to remove `TView`. How would one even pass this type parameter?
    views = ['year', 'day'] as TView[],
    openTo = 'day' as TView,
    className,
    ...other
  } = props;

  const utils = useUtils<TDate>();
  const isStatic = React.useContext(IsStaticVariantContext);
  const allowKeyboardControl = allowKeyboardControlProp ?? !isStatic;

  const minDate = minDateProp || utils.date(defaultMinDate)!;
  const maxDate = maxDateProp || utils.date(defaultMaxDate)!;

  const { openView, setOpenView } = useViews({
    view,
    views,
    openTo,
    onChange,
    onViewChange,
  });

  const {
    calendarState,
    changeFocusedDay,
    changeMonth,
    isDateDisabled,
    handleChangeMonth,
    onMonthSwitchingAnimationEnd,
  } = useCalendarState({
    date,
    defaultCalendarMonth,
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
      const closestEnabledDate = findClosestEnabledDate<TDate>({
        utils,
        date,
        minDate,
        maxDate,
        disablePast,
        disableFuture,
        shouldDisableDate: isDateDisabled,
      });

      onChange(closestEnabledDate, 'partial');
    }
    // This call is too expensive to run it on each prop change.
    // So just ensure that we are not rendering disabled as selected on mount.
  }, []); // eslint-disable-line

  React.useEffect(() => {
    if (date) {
      changeMonth(date);
    }
  }, [date]); // eslint-disable-line

  return (
    <PickerView ref={ref} className={clsx(classes.root, className)}>
      <PickersCalendarHeader
        {...other}
        views={views}
        openView={openView}
        currentMonth={calendarState.currentMonth}
        onViewChange={setOpenView as (view: DayPickerView) => void}
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
        transKey={openView}
      >
        <div>
          {openView === 'year' && (
            <YearPicker
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
              onFocusedDayChange={changeFocusedDay}
            />
          )}

          {openView === 'month' && (
            <MonthPicker
              {...other}
              date={date}
              onChange={onChange}
              minDate={minDate}
              maxDate={maxDate}
              onMonthChange={onMonthChange}
            />
          )}

          {openView === 'day' && (
            <PickersCalendar
              {...other}
              {...calendarState}
              onMonthSwitchingAnimationEnd={onMonthSwitchingAnimationEnd}
              onFocusedDayChange={changeFocusedDay}
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
    </PickerView>
  );
});

DayPicker.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Enables keyboard listener for moving between days in calendar.
   * Defaults to `true` unless the `ClockPicker` is used inside a `Static*` picker component.
   */
  allowKeyboardControl: PropTypes.bool,
  /**
   * @ignore
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  date: PropTypes.any,
  /**
   * Default calendar month displayed when `value={null}`.
   */
  defaultCalendarMonth: PropTypes.any,
  /**
   * @default false
   */
  disableFuture: PropTypes.bool,
  /**
   * @default false
   */
  disablePast: PropTypes.bool,
  /**
   * If `true` renders `LoadingComponent` in calendar instead of calendar view.
   * Can be used to preload information and show it in calendar.
   * @default false
   */
  loading: PropTypes.bool,
  /**
   * Max selectable date. @DateIOType
   */
  maxDate: PropTypes.any,
  /**
   * Min selectable date. @DateIOType
   */
  minDate: PropTypes.any,
  /**
   * Callback fired on date change
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Callback firing on month change. @DateIOType
   */
  onMonthChange: PropTypes.func,
  /**
   * Callback fired on view change.
   */
  onViewChange: PropTypes.func,
  /**
   * Initially open view.
   * @default 'day'
   */
  openTo: PropTypes.oneOf(['day', 'month', 'year']),
  /**
   * Disable heavy animations.
   * @default typeof navigator !== 'undefined' && /(android)/i.test(navigator.userAgent)
   */
  reduceAnimations: PropTypes.bool,
  /**
   * Component displaying when passed `loading` true.
   * @default () => <span data-mui-test="loading-progress">...</span>
   */
  renderLoading: PropTypes.func,
  /**
   * Disable specific date. @DateIOType
   */
  shouldDisableDate: PropTypes.func,
  /**
   * Disable specific years dynamically.
   * Works like `shouldDisableDate` but for year selection view @DateIOType.
   */
  shouldDisableYear: PropTypes.func,
  /**
   * Controlled open view.
   */
  view: PropTypes.oneOf(['day', 'month', 'year']),
  /**
   * Views for day picker.
   * @default ['year', 'day']
   */
  views: PropTypes.arrayOf(PropTypes.oneOf(['day', 'month', 'year']).isRequired),
} as any;

/**
 *
 * API:
 *
 * - [DayPicker API](https://material-ui.com/api/day-picker/)
 */
export default withStyles(styles, { name: 'MuiDayPicker' })(DayPicker) as <TDate>(
  props: DayPickerProps<TDate> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element;
