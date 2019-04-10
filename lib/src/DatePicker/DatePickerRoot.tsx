import * as React from 'react';
import * as PropTypes from 'prop-types';
import clsx from 'clsx';
import ToolbarButton from '../_shared/ToolbarButton';
import PickerToolbar from '../_shared/PickerToolbar';
import YearSelection from './components/YearSelection';
import MonthSelection from './components/MonthSelection';
import Calendar, { RenderDay } from './components/Calendar';
import createStyles from '@material-ui/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/styles/withStyles';
import { MaterialUiPickersDate } from '../typings/date';
import { withUtils, WithUtilsProps } from '../_shared/WithUtils';
import { DatePickerViewType } from '../constants/DatePickerView';
import { DateType, DomainPropTypes } from '../constants/prop-types';
import { isYearAndMonthViews, isYearOnlyView } from '../_helpers/date-utils';

export interface BaseDatePickerProps {
  /** Min selectable date */
  minDate?: DateType;
  /** Max selectable date */
  maxDate?: DateType;
  /** Disable past dates */
  disablePast?: boolean;
  /** Disable future dates */
  disableFuture?: boolean;
  /** To animate scrolling to current year (with scrollIntoView) */
  animateYearScrolling?: boolean;
  /** Array of views to show. Order year -> month -> day */
  views?: ('year' | 'month' | 'day')[];
  /** Initial view to show when date picker is open */
  openTo?: 'year' | 'month' | 'day';
  /** @deprecated use openTo instead */
  openToYearSelection?: boolean;
  /** Left arrow icon */
  leftArrowIcon?: React.ReactNode;
  /** Right arrow icon */
  rightArrowIcon?: React.ReactNode;
  /** Custom renderer for day */
  renderDay?: RenderDay;
  /** Enables keyboard listener for moving between days in calendar */
  allowKeyboardControl?: boolean;
  /** Disable specific date */
  shouldDisableDate?: (day: MaterialUiPickersDate) => boolean;
  /** Callback firing on year change */
  onYearChange?: (date: MaterialUiPickersDate) => void;
  /** Callback firing on month change */
  onMonthChange?: (date: MaterialUiPickersDate) => void;
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
    views: PropTypes.arrayOf(DomainPropTypes.datePickerView),
    openTo: DomainPropTypes.datePickerView,
  };

  public static defaultProps = {
    minDate: new Date('1900-01-01'),
    maxDate: new Date('2100-01-01'),
    views: ['year', 'day'] as DatePickerViewType[],
  };

  public state: DatePickerState = {
    openView: this.props.openTo || this.props.views![this.props.views!.length - 1],
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
    } = this.props;

    return (
      <>
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
            rightArrowIcon={rightArrowIcon}
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
