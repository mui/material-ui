import React, { Fragment, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { TimePicker } from '@material-ui/pickers';

function BasicTimePicker() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Fragment>
      <TimePicker
        renderInput={(props) => <TextField {...props} />}
        label="12 hours"
        value={selectedDate}
        onChange={(date) => handleDateChange(date)}
      />

      <TimePicker
        renderInput={(props) => <TextField {...props} />}
        ampm={false} // This is not needed if you are using localization
        label="24 hours"
        value={selectedDate}
        onChange={(date) => handleDateChange(date)}
      />
    </Fragment>
  );
}

export default BasicTimePicker;
