import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui';

import YearSelection from '../DatePicker/YearSelection';
import Calendar from '../DatePicker/Calendar';
import HourView from '../TimePicker/HourView';
import MinutesView from '../TimePicker/MinutesView';
import DateTimePickerTabs from './DateTimePickerTabs';
import DatetimePickerHeader from './DateTimePickerHeader';

import * as viewType from '../constants/date-picker-view';

class DateTimePicker extends Component {
  static propTypes = {
    date: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  state = {
    openView: viewType.DATE,
    meridiemMode: 'am',
  }

  setMeridiemMode = mode => () => {
    this.setState({ meridiemMode: mode });
  }

  handleViewChange = view => () => {
    this.setState({ openView: view });
  }

  handleChange = (time) => {
    this.props.onChange(time);
  }

  handleTabChange = (openView) => {
    this.setState({ openView });
  }

  render() {
    const { openView, meridiemMode } = this.state;
    const { date, classes } = this.props;

    return (
      <div>
        <DatetimePickerHeader
          date={date}
          openView={openView}
          meridiemMode={meridiemMode}
          setMeridiemMode={this.setMeridiemMode}
          onOpenViewChange={this.handleViewChange}
        />

        <DateTimePickerTabs
          view={openView}
          onChange={this.handleTabChange}
        />

        {
          openView === viewType.YEAR &&
            <YearSelection date={date} />
        } {
          openView === viewType.DATE &&
            <Calendar date={date} />
        } {
          openView === viewType.HOUR &&
            <HourView date={date} />
        } {
          openView === viewType.MINUTES &&
            <MinutesView date={date} />
        }
      </div>
    );
  }
}

const styles = () => ({

});

export default withStyles(styles)(DateTimePicker);
