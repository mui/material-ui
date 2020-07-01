import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { DatePicker } from '@material-ui/pickers';

function BasicDatePicker() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <DatePicker
      label="Basic example"
      value={selectedDate}
      onChange={date => handleDateChange(date)}
      renderInput={props => <TextField {...props} />}
    />
  );
}

export default BasicDatePicker;
