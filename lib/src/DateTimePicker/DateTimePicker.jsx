import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import View from './DateTimePickerView';
import YearSelection from '../DatePicker/components/YearSelection';
import Calendar from '../DatePicker/components/Calendar';
import TimePickerView from '../TimePicker/components/TimePickerView';
import DateTimePickerTabs from './DateTimePickerTabs';
import DatetimePickerHeader from './DateTimePickerHeader';
import { convertToMeridiem } from '../_helpers/time-utils';

import DomainPropTypes from '../constants/prop-types';
import * as viewType from '../constants/date-picker-view';
import withUtils from '../_shared/WithUtils';

export class DateTimePicker extends Component {
  static propTypes = {
    allowKeyboardControl: PropTypes.bool,
    ampm: PropTypes.bool,
    animateYearScrolling: PropTypes.bool,
    autoSubmit: PropTypes.bool,
    classes: PropTypes.object.isRequired,
    date: PropTypes.object.isRequired,
    dateRangeIcon: PropTypes.node,
    disableFuture: PropTypes.bool,
    disablePast: PropTypes.bool,
    leftArrowIcon: PropTypes.node,
    maxDate: DomainPropTypes.date.isRequired,
    minDate: DomainPropTypes.date.isRequired,
    onChange: PropTypes.func.isRequired,
    openTo: PropTypes.oneOf(Object.keys(viewType).map(key => viewType[key])).isRequired,
    renderDay: PropTypes.func,
    rightArrowIcon: PropTypes.node,
    shouldDisableDate: PropTypes.func,
    showTabs: PropTypes.bool,
    timeIcon: PropTypes.node,
    utils: PropTypes.object.isRequired,
    ViewContainerComponent:
      PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
  }

  static defaultProps = {
    allowKeyboardControl: false,
    ampm: true,
    animateYearScrolling: false,
    autoSubmit: true,
    dateRangeIcon: undefined,
    disableFuture: false,
    disablePast: false,
    leftArrowIcon: undefined,
    renderDay: undefined,
    rightArrowIcon: undefined,
    shouldDisableDate: undefined,
    showTabs: true,
    timeIcon: undefined,
    ViewContainerComponent: 'div',
  }

  state = {
    openView: this.props.openTo,
    meridiemMode: this.props.utils.getHours(this.props.date) >= 12 ? 'pm' : 'am',
  }

  onChange = (time, isFinish = true, nextView) => {
    this.handleChange(time);

    if (isFinish && this.props.autoSubmit) {
      this.handleViewChange(nextView);
    }
  }

  setMeridiemMode = mode => () => {
    this.setState(
      { meridiemMode: mode },
      () => this.handleChange(this.props.date, false),
    );
  }

  handleViewChange = (view) => {
    this.setState({ openView: view });
  }

  handleChange = (time, isFinish = false) => {
    const withMeridiem = convertToMeridiem(
      time,
      this.state.meridiemMode,
      this.props.ampm,
      this.props.utils,
    );
    this.props.onChange(withMeridiem, isFinish);
  }

  handleYearChange = (date, isFinish) => {
    this.onChange(date, isFinish, viewType.DATE);
  }

  handleDayChange = (date, isFinish) => {
    this.onChange(date, isFinish, viewType.HOUR);
  }

  handleHourChange = (time, isFinish) => {
    this.onChange(time, isFinish, viewType.MINUTES);
  }

  render() {
    const { openView, meridiemMode } = this.state;
    const {
      date,
      minDate,
      maxDate,
      showTabs,
      disablePast,
      disableFuture,
      leftArrowIcon,
      rightArrowIcon,
      dateRangeIcon,
      timeIcon,
      renderDay,
      utils,
      ampm,
      shouldDisableDate,
      animateYearScrolling,
      classes,
      allowKeyboardControl,
      ViewContainerComponent,
    } = this.props;

    const ViewContainerComponentProps = typeof ViewContainerComponent === 'string'
      ? {} : { openView, onChange: this.onChange };

    return (
      <Fragment>
        <DatetimePickerHeader
          date={date}
          openView={openView}
          meridiemMode={meridiemMode}
          setMeridiemMode={this.setMeridiemMode}
          onOpenViewChange={this.handleViewChange}
          utils={utils}
          ampm={ampm}
        />

        {
          showTabs &&
            <DateTimePickerTabs
              view={openView}
              onChange={this.handleViewChange}
              dateRangeIcon={dateRangeIcon}
              timeIcon={timeIcon}
            />
        }

        <ViewContainerComponent className={classes.viewContainer} {...ViewContainerComponentProps}>
          <View selected={openView === viewType.YEAR}>
            <YearSelection
              date={date}
              minDate={minDate}
              maxDate={maxDate}
              onChange={this.handleYearChange}
              disablePast={disablePast}
              disableFuture={disableFuture}
              utils={utils}
              animateYearScrolling={animateYearScrolling}
            />
          </View>

          <View selected={openView === viewType.DATE}>
            <Calendar
              allowKeyboardControl={allowKeyboardControl}
              date={date}
              minDate={minDate}
              maxDate={maxDate}
              onChange={this.handleDayChange}
              disablePast={disablePast}
              disableFuture={disableFuture}
              leftArrowIcon={leftArrowIcon}
              rightArrowIcon={rightArrowIcon}
              renderDay={renderDay}
              shouldDisableDate={shouldDisableDate}
            />
          </View>

          <View selected={openView === viewType.HOUR || openView === viewType.MINUTES}>
            <TimePickerView
              date={date}
              type={openView}
              onHourChange={this.handleHourChange}
              onMinutesChange={this.handleChange}
              onSecondsChange={this.handleChange}
              ampm={ampm}
            />
          </View>
        </ViewContainerComponent>
      </Fragment>
    );
  }
}

const styles = {
  viewContainer: {
    minHeight: 300,
    position: 'relative',
  },
};

export default withStyles(styles)(withUtils()(DateTimePicker));
