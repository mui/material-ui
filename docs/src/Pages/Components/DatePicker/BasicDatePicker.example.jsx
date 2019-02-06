import React, { Fragment, PureComponent } from 'react';
import { DatePicker } from 'material-ui-pickers';

export default class BasicDatePicker extends PureComponent {
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
          <DatePicker
            label="Basic example"
            value={selectedDate}
            onChange={this.handleDateChange}
            animateYearScrolling
          />
        </div>

        <div className="picker">
          <DatePicker
            autoOk
            label="Clearable"
            clearable
            disableFuture
            value={selectedDate}
            onChange={this.handleDateChange}
          />
        </div>

        <div className="picker">
          <DatePicker
            label="Date of birth"
            value={selectedDate}
            disableFuture
            openTo="year"
            views={['year', 'month', 'day']}
            onChange={this.handleDateChange}
          />
        </div>
      </Fragment>
    );
  }
}
