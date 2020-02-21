import React, { Fragment, useState } from 'react';
import { TimePicker } from '@material-ui/pickers';

function TimeValidation() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Fragment>
      <TimePicker
        value={selectedDate}
        onChange={date => handleDateChange(date)}
        minTime={new Date(0, 0, 0, 8)}
        maxTime={new Date(0, 0, 0, 18, 45)}
      />

      <TimePicker
        ampm={false} // This is not needed if you are using localization
        label="24 hours"
        minTime={new Date(0, 0, 0, 8)}
        maxTime={new Date(0, 0, 0, 18, 45)}
        value={selectedDate}
        onChange={date => handleDateChange(date)}
      />
    </Fragment>
  );
}

export default TimeValidation;
