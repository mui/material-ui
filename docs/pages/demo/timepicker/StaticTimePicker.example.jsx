import React, { useState } from 'react';
import { StaticTimePicker } from '@material-ui/pickers';

const StaticTimePickerExample = () => {
  const [date, handleDateChange] = useState(new Date());

  return (
    <>
      <StaticTimePicker
        autoOk
        openTo="hours"
        value={date}
        onChange={date => handleDateChange(date)}
      />

      <StaticTimePicker
        ampm
        orientation="landscape"
        openTo="minutes"
        value={date}
        onChange={date => handleDateChange(date)}
      />
    </>
  );
};

export default StaticTimePickerExample;
