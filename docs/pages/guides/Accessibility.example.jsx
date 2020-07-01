import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { DatePicker } from '@material-ui/pickers';

function BasicDatePicker() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <DatePicker
      renderInput={props => <TextField {...props} />}
      disableMaskedInput
      label="Accessible"
      value={selectedDate}
      onChange={date => handleDateChange(date)}
    />
  );
}

export default BasicDatePicker;
