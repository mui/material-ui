import React, { Fragment, PureComponent } from 'react';
import { DateTimePicker } from 'material-ui-pickers';

export default class BasicDateTimePicker extends PureComponent {
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
          <DateTimePicker
            value={selectedDate}
            onChange={this.handleDateChange}
            label="DateTimePicker"
          />
        </div>

        <div className="picker">
          <DateTimePicker
            autoOk
            ampm={false}
            disableFuture
            value={selectedDate}
            onChange={this.handleDateChange}
            label="24h clock"
          />
        </div>

        <div className="picker">
          <DateTimePicker
            value={selectedDate}
            disablePast
            onChange={this.handleDateChange}
            label="With Today Button"
            showTodayButton
          />
        </div>
      </Fragment>
    );
  }
}
