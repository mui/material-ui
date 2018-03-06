import React, { Fragment, Component } from 'react';
import { DatePicker } from 'material-ui-pickers';

export default class BasicUsage extends Component {
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
            keyboard
            clearable
            label="Uncontrolled input"
            value={selectedDate}
            onChange={this.handleDateChange}
            animateYearScrolling={false}
          />
        </div>

        <div className="picker">
          <DatePicker
            label="Masked input"
            keyboard
            format="MMM DD"
            placeholder="Jan 01"
            mask={[ /[a-zA-z]/, /[a-zA-z]/, /[a-zA-z]/, ' ', /\d/, /\d/]}
            value={selectedDate}
            onChange={this.handleDateChange}
            animateYearScrolling={false}
          />
        </div>
      </Fragment>
    );
  }
}
