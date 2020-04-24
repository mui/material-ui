import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
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
        renderInput={props => <TextField {...props} />}
      />

      <StaticTimePicker
        ampm
        orientation="landscape"
        openTo="minutes"
        value={date}
        onChange={date => handleDateChange(date)}
        renderInput={props => <TextField {...props} />}
      />
    </>
  );
};

export default StaticTimePickerExample;
