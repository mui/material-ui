import React, { Fragment, PureComponent } from 'react';
import { DatePicker } from 'material-ui-pickers';

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
          <DatePicker
            onOpen={() => console.log('open')}
            onClose={() => console.log('close')}
            label="Basic example"
            value={selectedDate}
            onChange={this.handleDateChange}
            animateYearScrolling={false}
          />
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
