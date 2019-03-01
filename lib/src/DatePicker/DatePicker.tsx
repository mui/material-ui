import clsx from 'clsx';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { isYearAndMonthViews, isYearOnlyView } from '../_helpers/date-utils';
import PickerToolbar from '../_shared/PickerToolbar';
import ToolbarButton from '../_shared/ToolbarButton';
import { withUtils, WithUtilsProps } from '../_shared/WithUtils';
import { DatePickerViewType } from '../constants/DatePickerView';
import { DateType, DomainPropTypes } from '../constants/prop-types';
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
  /** Array of views to show. Order year -> month -> day */
  views?: Array<'year' | 'month' | 'day'>;
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
  public static propTypes: any = {
    views: PropTypes.arrayOf(DomainPropTypes.datePickerView),
    openTo: DomainPropTypes.datePickerView,
    openToYearSelection: PropTypes.bool,
  };

  public static defaultProps = {
    openToYearSelection: false,
    minDate: new Date('1900-01-01'),
    maxDate: new Date('2100-01-01'),
    views: ['year', 'day'] as DatePickerViewType[],
  };

  public state: DatePickerState = {
    // TODO in v3 remove openToYearSelection
    openView: this.props.openTo
      ? this.props.openTo
      : this.props.openToYearSelection
      ? 'year'
      : this.props.views![this.props.views!.length - 1],
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
