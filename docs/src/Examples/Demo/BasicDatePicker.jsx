import React, { Fragment, PureComponent } from 'react';
import { DatePicker } from 'material-ui-pickers';
import { FormControl } from 'material-ui';

export default class BasicDatePicker extends PureComponent {
  state = {
    selectedDate: new Date(),
  }

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  }

  render() {
    const { selectedDate } = this.state;

    return (
      <Fragment>
        <div className="picker">
          <FormControl>
            <DatePicker
              label="Basic example"
              value={selectedDate}
              onChange={this.handleDateChange}
              animateYearScrolling={false}
            />
          </FormControl>

        </div>

        <div className="picker">
          <DatePicker
            label="Clearable"
            clearable
            disableFuture
            maxDateMessage="Date must be less than today"
            value={selectedDate}
            onChange={this.handleDateChange}
            animateYearScrolling={false}
          />
        </div>
      </Fragment>
    );
  }
}
