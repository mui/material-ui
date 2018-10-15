// tslint:disable max-classes-per-file
import { Icon, IconButton } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as classNames from 'classnames';
import * as moment from 'moment';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { DayComponent } from '../../DatePicker/components/Calendar';
import DateTimePickerWrapper from '../../DateTimePicker';
import MuiUtilsProvider from '../../utils/MuiPickersUtilsProvider';
import { utilsToUse } from '../test-utils';

export default class BasicUsage extends React.Component {
  public state = {
    selectedDate: new Date(),
  };

  public handleChange = (date: Date) => {
    this.setState({ selectedDate: date });
  };

  public render() {
    const { selectedDate } = this.state;

    return (
      <MuiUtilsProvider utils={utilsToUse}>
        <DateTimePickerWrapper
          value={null}
          onChange={this.handleChange}
          leftArrowIcon={<Icon> keyboard_arrow_left </Icon>}
          rightArrowIcon={<Icon> keyboard_arrow_right </Icon>}
        />

        <DateTimePickerWrapper
          error
          autoOk
          ampm={false}
          showTabs={false}
          autoSubmit={false}
          disableFuture
          value={selectedDate}
          onChange={this.handleChange}
          helperText="Required"
          leftArrowIcon={<Icon> add_alarm </Icon>}
          rightArrowIcon={<Icon> snooze </Icon>}
          initialFocusedDate={new Date()}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <Icon>add_alarm</Icon>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </MuiUtilsProvider>
    );
  }
}

class CustomElements extends React.Component<{ classes: any }> {
  public static propTypes: any = {
    classes: PropTypes.object.isRequired,
  };
  public state = {
    selectedDate: moment(),
  };

  public handleDateChange = (date: moment.Moment) => {
    this.setState({ selectedDate: date });
  };

  public renderCustomDayForDateTime = (
    day: moment.Moment,
    selectedDate: moment.Moment,
    dayInCurrentMonth: boolean,
    dayComponent: DayComponent
  ) => {
    const { classes } = this.props;

    const dayClassName = classNames({
      [classes.customDayHighlight]: day.isSame(selectedDate, 'day'),
    });

    return (
      <div className={classes.dayWrapper}>
        {dayComponent}
        <div className={dayClassName} />
      </div>
    );
  };

  public render() {
    const { selectedDate } = this.state;

    return (
      <MuiUtilsProvider utils={utilsToUse}>
        <DateTimePickerWrapper
          autoSubmit={false}
          value={selectedDate}
          onChange={this.handleDateChange}
          renderDay={this.renderCustomDayForDateTime}
        />
      </MuiUtilsProvider>
    );
  }
}
