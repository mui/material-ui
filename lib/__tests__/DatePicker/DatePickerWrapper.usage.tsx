import * as React from 'react'
import { Fragment, Component } from 'react';
import DatePickerWrapper  from '../../src/DatePicker/DatePickerWrapper';

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
        <DatePickerWrapper
          keyboard
          clearable
          value={selectedDate}
          onChange={this.handleChange}
          animateYearScrolling={false}
        />
      </Fragment>
    );
  }
}