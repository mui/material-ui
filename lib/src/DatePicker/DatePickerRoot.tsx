import * as React from 'react';
import * as PropTypes from 'prop-types';
import clsx from 'clsx';
import ToolbarButton from '../_shared/ToolbarButton';
import PickerToolbar from '../_shared/PickerToolbar';
import YearSelection from './components/YearSelection';
import MonthSelection from './components/MonthSelection';
import createStyles from '@material-ui/styles/createStyles';
import Calendar, { OutterCalendarProps } from './components/Calendar';
import withStyles, { WithStyles } from '@material-ui/styles/withStyles';
import { MaterialUiPickersDate } from '../typings/date';
import { withUtils, WithUtilsProps } from '../_shared/WithUtils';
import { DatePickerViewType } from '../constants/DatePickerView';
import { DateType, DomainPropTypes } from '../constants/prop-types';
import { isYearAndMonthViews, isYearOnlyView } from '../_helpers/date-utils';

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
  minDate?: DateType;
  /**
   * Max selectable date
   * @default Date(2100-01-01)
   */
  maxDate?: DateType;
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

export interface DatePickerRootProps
  extends BaseDatePickerProps,
    WithStyles<typeof styles>,
    WithUtilsProps {
  date: MaterialUiPickersDate;
  onChange: (date: MaterialUiPickersDate, isFinished?: boolean) => void;
}

interface DatePickerState {
  openView: DatePickerViewType;
}

export class DatePickerRoot extends React.PureComponent<DatePickerRootProps> {
  public static propTypes: any = {
    onlyCalendar: PropTypes.bool,
    views: PropTypes.arrayOf(DomainPropTypes.datePickerView),
    openTo: DomainPropTypes.datePickerView,
  };

  public static defaultProps = {
    onlyCalendar: false,
    minDate: new Date('1900-01-01'),
    maxDate: new Date('2100-01-01'),
    views: ['day', 'year'] as DatePickerViewType[],
  };

  public state: DatePickerState = {
    openView: this.props.openTo || this.props.views![0],
  };

  get date() {
    return this.props.date;
  }

  get minDate() {
    return this.props.utils.date(this.props.minDate);
  }

  get maxDate() {
    return this.props.utils.date(this.props.maxDate);
  }

  get isYearOnly() {
    return isYearOnlyView(this.props.views!);
  }

  get isYearAndMonth() {
    return isYearAndMonthViews(this.props.views!);
  }

  public handleYearSelect = (date: MaterialUiPickersDate) => {
    this.props.onChange(date, this.isYearOnly);

    if (this.isYearOnly) {
      return;
    }

    if (this.props.views!.includes('month')) {
      return this.openMonthSelection();
    }

    this.openCalendar();
  };

  public handleMonthSelect = (date: MaterialUiPickersDate) => {
    if (this.props.onMonthChange) {
      this.props.onMonthChange(date);
    }

    const isFinish = !this.props.views!.includes('day');
    this.props.onChange(date, isFinish);

    if (!isFinish) {
      this.openCalendar();
    }
  };

  public openYearSelection = () => {
    this.setState({ openView: 'year' });
  };

  public openCalendar = () => {
    this.setState({ openView: 'day' });
  };

  public openMonthSelection = () => {
    this.setState({ openView: 'month' });
  };

  public render() {
    const { openView } = this.state;
    const {
      disablePast,
      disableFuture,
      onChange,
      animateYearScrolling,
      leftArrowIcon,
      rightArrowIcon,
      renderDay,
      utils,
      shouldDisableDate,
      allowKeyboardControl,
      classes,
      onMonthChange,
      onYearChange,
      onlyCalendar,
      leftArrowButtonProps,
      rightArrowButtonProps,
    } = this.props;

    return (
      <>
        {!onlyCalendar && (
          <PickerToolbar className={clsx({ [classes.toolbarCenter]: this.isYearOnly })}>
            <ToolbarButton
              variant={this.isYearOnly ? 'h3' : 'subtitle1'}
              onClick={this.isYearOnly ? undefined : this.openYearSelection}
              selected={openView === 'year'}
              label={utils.getYearText(this.date)}
            />

            {!this.isYearOnly && !this.isYearAndMonth && (
              <ToolbarButton
                variant="h4"
                onClick={this.openCalendar}
                selected={openView === 'day'}
                label={utils.getDatePickerHeaderText(this.date)}
              />
            )}

            {this.isYearAndMonth && (
              <ToolbarButton
                variant="h4"
                onClick={this.openMonthSelection}
                selected={openView === 'month'}
                label={utils.getMonthText(this.date)}
              />
            )}
          </PickerToolbar>
        )}

        {this.props.children}

        {openView === 'year' && (
          <YearSelection
            date={this.date}
            onChange={this.handleYearSelect}
            minDate={this.minDate}
            maxDate={this.maxDate}
            disablePast={disablePast}
            disableFuture={disableFuture}
            onYearChange={onYearChange}
            animateYearScrolling={animateYearScrolling}
          />
        )}
        {openView === 'month' && (
          <MonthSelection
            date={this.date}
            onChange={this.handleMonthSelect}
            minDate={this.minDate}
            maxDate={this.maxDate}
            disablePast={disablePast}
            disableFuture={disableFuture}
          />
        )}
        {openView === 'day' && (
          <Calendar
            date={this.date}
            onChange={onChange}
            onMonthChange={onMonthChange}
            disablePast={disablePast}
            disableFuture={disableFuture}
            minDate={this.minDate}
            maxDate={this.maxDate}
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
  }
}

export const styles = () =>
  createStyles({
    toolbarCenter: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

export default withStyles(styles)(withUtils()(DatePickerRoot));
