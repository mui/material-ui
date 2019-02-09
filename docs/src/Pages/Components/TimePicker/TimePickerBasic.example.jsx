import React, { Fragment, PureComponent } from 'react';
import { TimePicker } from 'material-ui-pickers';

export default class BasicUsage extends PureComponent {
  state = {
    selectedDate: new Date(),
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  render() {
    const { selectedDate } = this.state;

    return (
      <Fragment>
        <div className="picker">
          <TimePicker
            autoOk
            label="12 hours"
            value={selectedDate}
            onChange={this.handleDateChange}
          />
        </div>

        <div className="picker">
          <TimePicker
            clearable
            ampm={false}
            label="24 hours"
            value={selectedDate}
            onChange={this.handleDateChange}
          />
        </div>

        <div className="picker">
          <TimePicker
            showTodayButton
            todayLabel="now"
            label="Step = 5"
            value={selectedDate}
            minutesStep={5}
            onChange={this.handleDateChange}
          />
        </div>
      </Fragment>
    );
  }
}
