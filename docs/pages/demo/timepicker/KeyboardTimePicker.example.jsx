import React, { useState } from 'react';
import { KeyboardTimePicker } from '@material-ui/pickers';

function KeyboardTimePickerExample() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <KeyboardTimePicker
      label="Masked timepicker"
      placeholder="08:00 AM"
      mask="__:__ _M"
      value={selectedDate}
      onChange={date => handleDateChange(date)}
    />
  );
}

export default KeyboardTimePickerExample;
