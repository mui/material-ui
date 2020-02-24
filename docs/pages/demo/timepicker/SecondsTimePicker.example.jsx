import React, { Fragment, useState } from 'react';
import { TimePicker } from '@material-ui/pickers';

function SecondsTimePicker() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Fragment>
      <TimePicker
        ampm={false}
        openTo="hours"
        views={['hours', 'minutes', 'seconds']}
        inputFormat="HH:mm:ss"
        label="With seconds"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
      />

      <TimePicker
        ampmInClock
        openTo="minutes"
        views={['minutes', 'seconds']}
        inputFormat="mm:ss"
        label="Minutes and seconds"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
      />
    </Fragment>
  );
}

export default SecondsTimePicker;
