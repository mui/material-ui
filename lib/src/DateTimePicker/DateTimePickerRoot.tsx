import * as React from 'react';
import * as PropTypes from 'prop-types';
import View from './components/DateTimePickerView';
import Calendar from '../DatePicker/components/Calendar';
import DateTimePickerTabs from './components/DateTimePickerTabs';
import YearSelection from '../DatePicker/components/YearSelection';
import TimePickerView from '../TimePicker/components/TimePickerView';
import DatetimePickerHeader, { MeridiemMode } from './components/DateTimePickerHeader';
import DateTimePickerView, { DateTimePickerViewType } from '../constants/DateTimePickerView';
import { Omit } from '@material-ui/core';
import { MaterialUiPickersDate } from '../typings/date';
import { convertToMeridiem } from '../_helpers/time-utils';
import { withUtils, WithUtilsProps } from '../_shared/WithUtils';
import { BaseDatePickerProps } from '../DatePicker/DatePickerRoot';
import { BaseTimePickerProps } from '../TimePicker/TimePickerRoot';

export type BaseDateTimePickerProps = Omit<BaseTimePickerProps, 'seconds'> &
  Omit<BaseDatePickerProps, 'onlyCalendar' | 'views' | 'openTo'> & {
    autoSubmit?: boolean;
    /** Show or hide date/time tabs (hidden automatically on small screens) */
    showTabs?: boolean;
    /** Initial view to show when datetime picker is open */
    openTo?: 'year' | 'date' | 'hours' | 'minutes';
    /** Date tab icon */
    dateRangeIcon?: React.ReactNode;
    /** Time tab icon */
    timeIcon?: React.ReactNode;
    /**
     * View container that wraps DateTimePicker views
     * @type {React.Component}
     */
    ViewContainerComponent?:
      | string
      | React.ComponentType<{} | { openView: DateTimePickerView; onChange: () => void }>;
  };

export interface DateTimePickerProps extends BaseDateTimePickerProps, WithUtilsProps {
  date: MaterialUiPickersDate;
  onChange: (date: MaterialUiPickersDate, isFinished: boolean, view?: DateTimePickerView) => void;
}

interface DateTimePickerState {
  openView: DateTimePickerViewType;
  meridiemMode: MeridiemMode;
}

export class DateTimePickerRoot extends React.Component<DateTimePickerProps, DateTimePickerState> {
  public static propTypes: any = {
    autoSubmit: PropTypes.bool,
    openTo: PropTypes.oneOf(
      Object.keys(DateTimePickerView).map(key => DateTimePickerView[key as any])
    ),
    showTabs: PropTypes.bool,
    ViewContainerComponent: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.object,
    ]),
    minutesStep: PropTypes.number,
  };

  public static defaultProps = {
    autoSubmit: true,
    showTabs: true,
    ampm: true,
    minutesStep: 1,
    openTo: 'date' as DateTimePickerView,
    ViewContainerComponent: 'div',
  };

  public state: DateTimePickerState = {
    openView: this.props.openTo!,
    meridiemMode: this.props.utils.getHours(this.props.date) >= 12 ? 'pm' : 'am',
  };

  public onChange = (
    time: MaterialUiPickersDate,
    isFinish = true,
    nextView: DateTimePickerView
  ) => {
    this.handleChange(time);

    if (isFinish && this.props.autoSubmit) {
      this.handleViewChange(nextView);
    }
  };

  public setMeridiemMode = (mode: MeridiemMode) => () => {
    this.setState({ meridiemMode: mode }, () => this.handleChange(this.props.date, false));
  };

  public handleViewChange = (view: DateTimePickerView) => {
    this.setState({ openView: view });
  };

  public handleChange = (time: MaterialUiPickersDate, isFinish = false) => {
    const withMeridiem = convertToMeridiem(
      time,
      this.state.meridiemMode,
      Boolean(this.props.ampm),
      this.props.utils
    );

    this.props.onChange(withMeridiem, isFinish);
  };

  public handleYearChange = (date: MaterialUiPickersDate) => {
    this.onChange(date, true, DateTimePickerView.DATE);
  };

  public handleDayChange = (date: MaterialUiPickersDate, isFinish?: boolean) => {
    this.onChange(date, isFinish, DateTimePickerView.HOUR);
  };

  public handleHourChange = (time: MaterialUiPickersDate, isFinish?: boolean) => {
    this.onChange(time, isFinish, DateTimePickerView.MINUTES);
  };

  public render() {
    const { openView, meridiemMode } = this.state;
    const {
      date,
      minDate,
      maxDate,
      showTabs,
      disablePast,
      disableFuture,
      leftArrowIcon,
      leftArrowButtonProps,
      rightArrowIcon,
      rightArrowButtonProps,
      dateRangeIcon,
      timeIcon,
      renderDay,
      ampm,
      minutesStep,
      shouldDisableDate,
      animateYearScrolling,
      allowKeyboardControl,
      ViewContainerComponent,
      onMonthChange,
      onYearChange,
    } = this.props;

    const Container = ViewContainerComponent!;
    const ViewContainerComponentProps =
      typeof ViewContainerComponent === 'string' ? {} : { openView, onChange: this.onChange };

    return (
      <React.Fragment>
        <DatetimePickerHeader
          date={date}
          openView={openView}
          meridiemMode={meridiemMode}
          setMeridiemMode={this.setMeridiemMode}
          onOpenViewChange={this.handleViewChange}
          ampm={ampm}
        />

        {showTabs && (
          <DateTimePickerTabs
            view={openView}
            onChange={this.handleViewChange}
            dateRangeIcon={dateRangeIcon}
            timeIcon={timeIcon}
          />
        )}

        <Container {...ViewContainerComponentProps}>
          <View selected={openView === DateTimePickerView.YEAR}>
            <YearSelection
              date={date}
              minDate={minDate}
              maxDate={maxDate}
              onYearChange={onYearChange}
              onChange={this.handleYearChange}
              disablePast={disablePast}
              disableFuture={disableFuture}
              animateYearScrolling={animateYearScrolling}
            />
          </View>

          <View selected={openView === DateTimePickerView.DATE}>
            <Calendar
              allowKeyboardControl={allowKeyboardControl}
              date={date}
              minDate={minDate!}
              maxDate={maxDate!}
              onChange={this.handleDayChange}
              disablePast={disablePast}
              disableFuture={disableFuture}
              leftArrowIcon={leftArrowIcon}
              leftArrowButtonProps={leftArrowButtonProps}
              rightArrowIcon={rightArrowIcon}
              rightArrowButtonProps={rightArrowButtonProps}
              renderDay={renderDay}
              shouldDisableDate={shouldDisableDate}
              onMonthChange={onMonthChange}
            />
          </View>

          <View
            selected={
              openView === DateTimePickerView.HOUR || openView === DateTimePickerView.MINUTES
            }
          >
            <TimePickerView
              date={date}
              type={openView as any} // here type is actually the same but 2 enums not equal
              onHourChange={this.handleHourChange}
              onMinutesChange={this.handleChange}
              onSecondsChange={this.handleChange}
              ampm={ampm}
              minutesStep={minutesStep}
            />
          </View>
        </Container>
      </React.Fragment>
    );
  }
}

export default withUtils()(DateTimePickerRoot);
