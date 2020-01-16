import React, { Fragment, useState } from 'react';
import { TimePicker } from '@material-ui/pickers';

function BasicTimePicker() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Fragment>
      <TimePicker
        ampm
        mask="__:__ _M"
        label="12 hours"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
      />

      <TimePicker
        mask="__:__"
        label="24 hours"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
      />
    </Fragment>
  );
}

export default BasicTimePicker;
