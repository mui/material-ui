import React, { useState } from 'react';
import { TimePicker } from '@material-ui/pickers';

const StaticTimePicker = () => {
  const [date, handleDateChange] = useState(new Date());

  return (
    <>
      <TimePicker
        autoOk
        variant="static"
        openTo="hours"
        value={date}
        onChange={date => handleDateChange(date)}
      />

      <TimePicker
        autoOk
        ampm={false}
        variant="static"
        orientation="landscape"
        openTo="minutes"
        value={date}
        onChange={date => handleDateChange(date)}
      />
    </>
  );
};

export default StaticTimePicker;
