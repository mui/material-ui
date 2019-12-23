import React, { Fragment, useState } from 'react';
import { TimePicker } from '@material-ui/pickers';

function BasicTimePicker() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Fragment>
      <TimePicker autoOk label="12 hours" value={selectedDate} onChange={handleDateChange} />

      <TimePicker
        clearable
        ampm={false}
        label="24 hours"
        value={selectedDate}
        onChange={handleDateChange}
      />

      {/* Alternative way to show am/pm */}
      <TimePicker
        showTodayButton
        ampmInClock
        todayLabel="now"
        label="Step = 5"
        value={selectedDate}
        minutesStep={5}
        onChange={handleDateChange}
      />
    </Fragment>
  );
}

export default BasicTimePicker;
