import * as React from 'react'
import { Fragment, Component } from 'react';
import TimePickerWrapper  from '../../src/TimePicker';
import { Moment } from 'moment'
import { utilsToUse } from '../test-utils';
import MuiUtilsProvider from '../../src/utils/MuiPickersUtilsProvider'

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
      <MuiUtilsProvider utils={utilsToUse}>
        <TimePickerWrapper
          keyboard
          mask={[/\d/, /\d/, ':', /\d/, /\d/, ' ', /a|p/i, 'M']}
          placeholder="08:00 AM"
          value={selectedDate}
          onChange={this.handleChange}
          DialogProps={{
            contentEditable: true
          }}
        />
      </MuiUtilsProvider>
    );
  }
}
