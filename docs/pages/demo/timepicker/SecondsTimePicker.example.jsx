import React, { Fragment, useState } from 'react';
import { TimePicker } from '@material-ui/pickers';

function SecondsTimePicker() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Fragment>
      <TimePicker
        seconds
        format="hh:mm:ss a"
        label="With seconds"
        value={selectedDate}
        onChange={handleDateChange}
      />

      <TimePicker
        seconds
        ampm={false}
        format="HH:mm:ss"
        label="24 hours"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </Fragment>
  );
}

export default SecondsTimePicker;
