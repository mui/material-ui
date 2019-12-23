import React, { Fragment, useState } from 'react';
import { TimePicker, KeyboardTimePicker } from '@material-ui/pickers';

function InlineTimePickerDemo() {
  const [selectedDate, handleDateChange] = useState('2018-01-01T00:00:00.000Z');

  return (
    <Fragment>
      <TimePicker
        variant="inline"
        label="Inline mode"
        disableToolbar
        ampmInClock
        value={selectedDate}
        onChange={date => handleDateChange(date)}
      />

      <KeyboardTimePicker
        ampm={false}
        variant="inline"
        label="With keyboard"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
      />
    </Fragment>
  );
}

export default InlineTimePickerDemo;
