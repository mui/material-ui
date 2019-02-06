import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import clsx from 'clsx';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import PickerToolbar from '../_shared/PickerToolbar';
import ToolbarButton from '../_shared/ToolbarButton';
import { withUtils, WithUtilsProps } from '../_shared/WithUtils';
import DatePickerView, { DatePickerViewType } from '../constants/DatePickerView';
import { DateType } from '../constants/prop-types';
import { MaterialUiPickersDate } from '../typings/date';
import Calendar, { RenderDay } from './components/Calendar';
import MonthSelection from './components/MonthSelection';
import YearSelection from './components/YearSelection';

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
  /**
   * @default ['year', 'month', 'day']
   * Array of views to show, possible values: ['year'] | ['year', 'month'] | ['year', 'month', 'day']
   */
  availableViews?: DatePickerViewType[];
  /** Initial view to show when date picker is open */
  openTo?: DatePickerViewType;
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
  initialFocusedDate?: DateType;
}

export interface DatePickerProps
  extends BaseDatePickerProps,
    WithStyles<typeof styles>,
    WithUtilsProps {
  date: MaterialUiPickersDate;
  onChange: (date: MaterialUiPickersDate, isFinished?: boolean) => void;
}

interface DatePickerState {
  openView: DatePickerViewType;
}

export class DatePicker extends React.PureComponent<DatePickerProps> {
  public static propTypes = {
    openToYearSelection: PropTypes.bool,
  };

  public static defaultProps = {
    minDate: new Date('1900-01-01'),
    maxDate: new Date('2100-01-01'),
    openToYearSelection: false,
    availableViews: [DatePickerView.YEAR, DatePickerView.MONTH, DatePickerView.DAY],
  };

  public state: DatePickerState = {
    openView:
      this.props.openTo ||
      (Boolean(this.props.openToYearSelection)
        ? DatePickerView.YEAR
        : this.props.availableViews![this.props.availableViews!.length - 1]),
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
    const { availableViews } = this.props;
    return availableViews!.length === 1 && availableViews![0] === DatePickerView.YEAR;
  }

  get isYearAndMonth() {
    const { availableViews } = this.props;
    return (
      availableViews!.length === 2 &&
      availableViews![availableViews!.length - 1] === DatePickerView.MONTH
    );
  }

  public handleYearSelect = (date: MaterialUiPickersDate) => {
    this.props.onChange(date, this.isYearOnly);

    if (this.isYearOnly) {
      return;
    }

    if (this.isYearAndMonth) {
      return this.openMonthSelection();
    }

    this.openCalendar();
  };

  public handleMonthSelect = (date: MaterialUiPickersDate) => {
    this.props.onChange(date, true);
  };

  public openYearSelection = () => {
    this.setState({ openView: DatePickerView.YEAR });
  };

  public openCalendar = () => {
    this.setState({ openView: DatePickerView.DAY });
  };

  public openMonthSelection = () => {
    this.setState({ openView: DatePickerView.MONTH });
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
    } = this.props;

    return (
      <>
        <PickerToolbar className={clsx({ [classes.toolbarCenter]: this.isYearOnly })}>
          <ToolbarButton
            variant={this.isYearOnly ? 'h3' : 'subtitle1'}
            onClick={this.isYearOnly ? undefined : this.openYearSelection}
            selected={openView === DatePickerView.YEAR}
            label={utils.getYearText(this.date)}
          />

          {!this.isYearOnly &&
            !this.isYearAndMonth && (
              <ToolbarButton
                variant="h4"
                onClick={this.openCalendar}
                selected={openView === DatePickerView.DAY}
                label={utils.getDatePickerHeaderText(this.date)}
              />
            )}

          {this.isYearAndMonth && (
            <ToolbarButton
              variant="h4"
              onClick={this.openMonthSelection}
              selected={openView === DatePickerView.MONTH}
              label={utils.getMonthText(this.date)}
            />
          )}
        </PickerToolbar>

        {this.props.children}

        {openView === DatePickerView.YEAR && (
          <YearSelection
            date={this.date}
            onChange={this.handleYearSelect}
            minDate={this.minDate}
            maxDate={this.maxDate}
            disablePast={disablePast}
            disableFuture={disableFuture}
            animateYearScrolling={animateYearScrolling}
          />
        )}
        {openView === DatePickerView.MONTH && (
          <MonthSelection
            date={this.date}
            onChange={this.handleMonthSelect}
            minDate={this.minDate}
            maxDate={this.maxDate}
            disablePast={disablePast}
            disableFuture={disableFuture}
          />
        )}
        {openView === DatePickerView.DAY && (
          <Calendar
            date={this.date}
            onChange={onChange}
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

export default withStyles(styles)(withUtils()(DatePicker));
