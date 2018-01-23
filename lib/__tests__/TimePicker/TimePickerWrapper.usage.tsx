import * as React from 'react'
import { Fragment, Component } from 'react';
import TimePickerWrapper  from '../../src/TimePicker/TimePickerWrapper';
import { Moment } from 'moment'

// initially from the docs site
export default class BasicUsage extends Component<{}, {selectedDate: Date}> {
  state = {
    selectedDate: new Date(),
  }

  handleChange = (date: Moment | Date) => {
    this.setState({ selectedDate: (date as Date) });
  }

  render() {
    const { selectedDate } = this.state;

    return (
      <Fragment>
        <TimePickerWrapper
          keyboard
          mask={[/\d/, /\d/, ':', /\d/, /\d/, ' ', /a|p/i, 'M']}
          placeholder="08:00 AM"
          value={selectedDate}
          onChange={this.handleChange}
        />
      </Fragment>
    );
  }
}