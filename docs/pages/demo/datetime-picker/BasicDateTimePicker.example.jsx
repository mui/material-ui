import React, { Fragment, useState } from 'react';
import { TextField } from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
function BasicDateTimePicker() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Fragment>
      <DateTimePicker
        renderInput={props => <TextField variant="outlined" {...props} />}
        label="DateTimePicker"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </Fragment>
  );
}

export default BasicDateTimePicker;
