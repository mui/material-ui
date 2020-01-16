import React, { Fragment, useState } from 'react';
import { TimePicker, MobileTimePicker, DesktopTimePicker } from '@material-ui/pickers';

function TimePickers() {
  const [selectedDate, handleDateChange] = useState(new Date('2018-01-01T00:00:00.000Z'));

  return (
    <Fragment>
      <MobileTimePicker
        ampmInClock
        label="For mobile"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
      />

      <DesktopTimePicker
        clearable
        ampm={false}
        label="For desktop"
        value={selectedDate}
        onChange={handleDateChange}
      />

      {/* Alternative way to show am/pm */}
      <TimePicker
        ampm
        ampmInClock
        showTodayButton
        todayLabel="now"
        label="Responsive, with step = 5"
        value={selectedDate}
        minutesStep={5}
        onChange={handleDateChange}
      />
    </Fragment>
  );
}

export default TimePickers;
