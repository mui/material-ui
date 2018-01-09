import * as React from 'react'
import { Fragment, Component } from 'react';
import TimePickerWrapper  from '../../src/TimePicker/TimePickerWrapper';

// FIXME: src vs exported component names a source of confusion
// FIXME https://github.com/dmtrKovalenko/material-ui-pickers/issues/169

// initially from the docs site
export default class BasicUsage extends Component<{}, {selectedDate: Date}> {
  state = {
    selectedDate: new Date(),
  }

  handleChange = (date: Date) => {
    this.setState({ selectedDate: date });
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